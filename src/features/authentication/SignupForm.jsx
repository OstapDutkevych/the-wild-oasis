import Button from '../../ui/Button.jsx';
import Form from '../../ui/Form.jsx';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useForm } from 'react-hook-form';
import { useSignup } from '@features/authentication/useSignup.js';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm();
  const { errors } = formState;

  function onSubmit({ full_name, email, password }) {
    signup(
      { full_name, email, password },
      {
        onSettled: reset,
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.full_name?.message}>
        <Input
          type="text"
          id="full_name"
          disabled={isPending}
          {...register('full_name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email password',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.password_confirm?.message}
      >
        <Input
          type="password"
          id="password_confirm"
          disabled={isPending}
          {...register('password_confirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password ||
              'Password need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
