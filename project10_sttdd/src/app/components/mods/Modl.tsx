import Modal from 'react-bootstrap/Modal';
import { MOD_ARRAY } from '../../mocks/mod-mock';

export const Modl = (props: any) => {
  const modCode = Number(props.obj.code);
  const thisMod = MOD_ARRAY.find((theMod) => {
    return theMod.code === modCode;
  })
  return (
    <>
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            {thisMod?.name} mod
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={thisMod?.image} alt="Meaningful text"/>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}