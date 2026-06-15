import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '@services/apiBookings.js';
import { useSearchParams } from 'react-router';
import { PAGE_SIZE } from '@utils/constants.js';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' };

  //SORT
  const sortByRaw = searchParams.get('sortBy') || 'start_date-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction, method: 'order' };

  //PAGINATION
  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  //QUERY
  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  console.log(bookings);

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isPending, error, bookings, count };
}
