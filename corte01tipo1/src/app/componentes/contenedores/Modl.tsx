import { Modal } from "react-bootstrap";
import { CAMISA_ARRAY } from "../../mocks/camisa-mock";

export const Modl = (props: any) => {
  const camCode = Number(props.obj.codCamisa);
  const miCamisa = CAMISA_ARRAY.find((laCamisa) => {
    return laCamisa.codCamisa === camCode;
  });
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
            {miCamisa?.nombreImagencamisa}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={miCamisa?.nombreImagencamisa} alt="Meaningful text" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
