import Select from '@ui/Select.jsx';
import { useSearchParams } from 'react-router';

function SortBy({ field = 'sortBy', options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get(field) || 'name-asc';

  function handleChange(e) {
    searchParams.set(field, e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={sortBy}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
