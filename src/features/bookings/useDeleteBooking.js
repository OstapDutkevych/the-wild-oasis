import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBookingById } from '@services/apiBookings.js';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking } =
    useMutation({
      mutationFn: (bookingId) => deleteBookingById(bookingId),
      onSuccess: () => {
        toast.success(`Booking successfully deleted`);
        queryClient.invalidateQueries({
          queryKey: ['bookings'],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return { deleteBooking, isDeletingBooking };
}
