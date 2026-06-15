import BookingDataBox from '../bookings/BookingDataBox.jsx';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonText from '../../ui/ButtonText.jsx';
import Spinner from '@ui/Spinner.jsx';

import { useMoveBack } from '@hooks/useMoveBack.js';
import { useBooking } from '@features/bookings/useBooking.js';
import { useSettings } from '@features/settings/useSettings.js';
import CheckinControls from './CheckinControls.jsx';

function CheckinBooking() {
  const { booking, isPending } = useBooking();
  const { settings, isPending: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  if (isPending || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* Render the interactive section only after data is ready */}
      <CheckinControls
        booking={booking}
        settings={settings}
        moveBack={moveBack}
      />
    </>
  );
}

export default CheckinBooking;
