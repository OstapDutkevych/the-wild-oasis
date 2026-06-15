import Spinner from '@ui/Spinner.jsx';
import CabinRow from '@features/cabins/CabinRow.jsx';
import { useCabins } from '@features/cabins/useCabins.js';
import Table from '@ui/Table.jsx';
import Menus from '@ui/Menus.jsx';
import { useSearchParams } from 'react-router';

const filterFns = {
  all: () => true,
  'with-discount': (cabin) => cabin.discount > 0,
  'no-discount': (cabin) => cabin.discount === 0,
};

function CabinTable() {
  const { isPending, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  //FILTER
  const currFilter = searchParams.get('discount') || 'all';

  let filteredCabins = cabins?.filter(
    filterFns[currFilter] ?? filterFns.all,
  );

  //SORT
  const currSortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = currSortBy.split('-');

  const modifier = direction === 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins?.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
        {/*{cabins.map((cabin) => (*/}
        {/*  <CabinRow cabin={cabin} key={cabin.id} />*/}
        {/*))}*/}
      </Table>
    </Menus>
  );
}

export default CabinTable;
