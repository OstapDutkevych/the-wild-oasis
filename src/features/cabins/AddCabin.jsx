import Button from '@ui/Button.jsx';
import Modal from '@ui/Modal.jsx';
import CreateCabinForm from '@features/cabins/CreateCabinForm.jsx';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
