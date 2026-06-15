import { useState } from 'react';
import styled from 'styled-components';
import ButtonGroup from '../../ui/ButtonGroup.jsx';
import Button from '../../ui/Button.jsx';
import Checkbox from '@ui/Checkbox.jsx';
import { formatCurrency } from '@utils/helpers.js';
import { useCheckin } from '@features/check-in-out/useCheckin.js';

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-bottom: 2.4rem;
`;

function CheckinControls({ booking, settings, moveBack }) {
  // Safe to use here because data is guaranteed to exist!
  const [confirmPaid, setConfirmPaid] = useState(booking.is_paid);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { checkin, isCheckingIn } = useCheckin();

  const {
    id: bookingId,
    guests,
    total_price: totalPrice,
    number_guests: numGuests,
    has_breakfast: hasBreakfast,
    number_nights: numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfast_price * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extras_price: optionalBreakfastPrice,
          total_price: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for{' '}
            {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          I confirm that <strong>{guests.full_name}</strong> has paid
          total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinControls;
