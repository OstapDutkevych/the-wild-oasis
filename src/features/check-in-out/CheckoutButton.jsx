import Button from '../../ui/Button.jsx';
import { useCheckout } from '@features/check-in-out/useCheckout.js';
import SpinnerMini from '@ui/SpinnerMini.jsx';

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      {isCheckingOut ? <SpinnerMini /> : 'Check out'}
    </Button>
  );
}

export default CheckoutButton;
