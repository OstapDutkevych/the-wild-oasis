import styled from 'styled-components';

import BookingDataBox from './BookingDataBox.jsx';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag.jsx';
import ButtonGroup from '../../ui/ButtonGroup.jsx';
import Button from '../../ui/Button.jsx';
import ButtonText from '../../ui/ButtonText.jsx';

import { useMoveBack } from '@hooks/useMoveBack.js';
import { useBooking } from '@features/bookings/useBooking.js';
import Spinner from '@ui/Spinner.jsx';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '@features/check-in-out/useCheckout.js';
import { useDeleteBooking } from '@features/bookings/useDeleteBooking.js';
import Modal from '@ui/Modal.jsx';
import ConfirmDelete from '@ui/ConfirmDelete.jsx';
import Empty from '@ui/Empty.jsx';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isPending } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>
            {status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={`booking #${bookingId}`}
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: moveBack,
                })
              }
            />
          </Modal.Window>
        </Modal>

        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
