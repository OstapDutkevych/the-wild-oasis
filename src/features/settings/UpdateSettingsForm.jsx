import Form from '../../ui/Form.jsx';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from '@features/settings/useSettings.js';
import Spinner from '@ui/Spinner.jsx';
import { useUpdateSetting } from '@features/settings/useUpdateSetting.js';

function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    min_booking_length,
    max_booking_length,
    max_guests_per_booking,
    breakfast_price,
  } = settings ?? {};

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    e.preventDefault();
    const { value } = e.target;

    if (!value) return;

    console.log(value);
    console.log(settings[field]);
    if (Number(settings[field]) === Number(value)) return;

    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={min_booking_length}
          onBlur={(e) => handleUpdate(e, 'min_booking_length')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          defaultValue={max_booking_length}
          onBlur={(e) => handleUpdate(e, 'max_booking_length')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          defaultValue={max_guests_per_booking}
          onBlur={(e) => handleUpdate(e, 'max_guests_per_booking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          defaultValue={breakfast_price}
          onBlur={(e) => handleUpdate(e, 'breakfast_price')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
