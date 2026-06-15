import styled from 'styled-components';
import { useRecentBookings } from '@features/dashboard/useRecentBookings.js';
import Spinner from '@ui/Spinner.jsx';
import { useRecentStays } from '@features/dashboard/useRecentStays.js';
import Stats from '@features/dashboard/Stats.jsx';
import { useCabins } from '@features/cabins/useCabins.js';
import SalesChart from '@features/dashboard/SalesChart.jsx';
import DurationChart from '@features/dashboard/DurationChart.jsx';
import TodayActivity from '@features/check-in-out/TodayActivity.jsx';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending: isPending1, bookings } = useRecentBookings();
  const {
    isPending: isPending2,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { isPending: isPending3, cabins } = useCabins();

  if (isPending1 || isPending2 || isPending3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
