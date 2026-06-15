import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin } from '@services/apiCabins.js';
import toast from 'react-hot-toast';

import Form from '@ui/Form.jsx';
import Input from '@ui/Input.jsx';
import Textarea from '@ui/Textarea.jsx';
import Button from '@ui/Button.jsx';
import FileInput from '@ui/FileInput.jsx';
import FormRow from '@ui/FormRow.jsx';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } =
    useForm();

  const { errors } = formState;
  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    console.log(data.image[0]);
    mutate({ ...data, image: data.image[0] });
  }
  function onError() {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.max_capacity?.message}
      >
        <Input
          type="number"
          id="max_capacity"
          disabled={isCreating}
          {...register('max_capacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least one',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regular_price?.message}
      >
        <Input
          type="number"
          id="regular_price"
          disabled={isCreating}
          {...register('regular_price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least one',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <= Number(getValues().regular_price) ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
