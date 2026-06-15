import styled from 'styled-components';
import { formatCurrency } from '@utils/helpers.js';
import { useState } from 'react';
import CreateCabinForm from '@features/cabins/CreateCabinForm.jsx';
import { useDeleteCabin } from '@features/cabins/useDeleteCabin.js';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from '@features/cabins/useCreateCabin.js';
import Modal from '@ui/Modal.jsx';
import Button from '@ui/Button.jsx';
import ConfirmDelete from '@ui/ConfirmDelete.jsx';
import Table from '@ui/Table.jsx';

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//
//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  transition: opacity 0.3s;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
`;

const ImgPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  width: inherit;
  background: var(--color-grey-300);
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const {
    id: cabin_id,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
  } = cabin;

  function handleDuplicateCabin() {
    console.log(cabin);
    const { id: _id, created_at: _created_at, ...newCabin } = cabin;
    createCabin({ ...newCabin, name: `Copy of ${cabin.name}` });
  }

  return (
    <Table.Row>
      {/*<Img src={image} />*/}
      <div style={{ position: 'relative', width: '6.4rem' }}>
        {!imgLoaded && <ImgPlaceholder />}
        <Img
          src={image}
          $loaded={imgLoaded}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <Cabin>{name}</Cabin>
      <div>Fits up to {max_capacity}</div>
      <Price>{formatCurrency(regular_price)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button disabled={isCreating} onClick={handleDuplicateCabin}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <Button size="small">
              <HiPencil />
            </Button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <Button size="small" variation="danger">
              <HiTrash />
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabins"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabin_id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
