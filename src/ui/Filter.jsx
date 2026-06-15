import styled, { css } from 'styled-components';
import { useSearchParams } from 'react-router';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currFilter =
    searchParams.get(filterField) || options.at(0).value;

  function handleSetSearchParams(value) {
    // 1. Set the new filter value
    searchParams.set(filterField, value);

    // 2. Reset the page to 1 if the page param exists
    if (searchParams.get('page')) {
      searchParams.set('page', 1);
    }

    // 3. Commit the changes to the URL
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((item) => (
        <FilterButton
          $active={item.value === currFilter}
          disabled={item.value === currFilter}
          onClick={() => handleSetSearchParams(item.value)}
          key={item.value}
        >
          {item.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
