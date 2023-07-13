import { useState } from "react";
import { Camisa } from "../../modelos/camisa";
import { CAMISA_ARRAY } from "../../mocks/camisa-mock";
import { ARREGLO_TALLA } from "../../utilidades/dominios/domtalla";
import { ARREGLO_PELICULA_GENERO } from "../../utilidades/dominios/dommarca";
import { Modl } from "../contenedores/Modl";
import { CamisaTalla } from "../../modelos/camisatalla";
import { CamisaMarca } from "../../modelos/camisamarca";
import { Button, Modal } from "react-bootstrap";

export const Admin = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [arrayEquip] = useState<CamisaTalla[]>(ARREGLO_TALLA);
  const [arrayDevs] = useState<CamisaMarca[]>(ARREGLO_PELICULA_GENERO);
  const [arrayCamisa] = useState<Camisa[]>(CAMISA_ARRAY);

  const [modalShow, setModalShow] = useState<boolean>(false);
  const [camObj, setCamObj] = useState<Camisa>(
    new Camisa(0, "", "", "", "", "")
  );

  const deleteCamisa = (code: number) => {
    const limit = arrayCamisa.length;
    for (let index = 0; index < limit; index++) {
      if (arrayCamisa[index] != undefined) {
        const compare = arrayCamisa[index].codCamisa;
        if (compare === code) {
          arrayCamisa.splice(index, 1);
        }
      }
    }
  };

  const obtenerMarca = (dev: string) => {
    for (let index = 0; index < arrayDevs.length; index++) {
      if (dev === String(arrayDevs[index].codigoMarca)) {
        return(arrayDevs[index].nombreMarca);
      }
    };
    return("Oh the missery"); 
  }

  const obtenerTalla = (dev: string) => {
    for (let index = 0; index < arrayEquip.length; index++) {
      if (dev === String(arrayEquip[index].codigoTalla)) {
        return(arrayEquip[index].nombreTalla);
      }
    };
    return("Oh the missery"); 
  }

  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-dark table-hover caption-top">
          <caption>Lista de camisas</caption>
          <thead>
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Marca</th>
              <th scope="col">Talla</th>
              <th scope="col">Color</th>
              <th scope="col">Codigo</th>
            </tr>
          </thead>
          <tbody>
            {arrayCamisa.map((laCamisa: Camisa, index: number) => (
              <tr key={laCamisa.codCamisa}>
                <td width={"15%"}>
                  {laCamisa.base64ImagenCamisa !== "" ? (
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalShow(true);
                        setCamObj(laCamisa);
                      }}
                    >
                      <img
                        src={laCamisa.base64ImagenCamisa}
                        alt="Meaningful text"
                        width={"100%"}
                      ></img>
                    </a>
                  ) : (
                    <div>Meaningful text</div>
                  )}
                </td>
                <td>
                  {obtenerMarca(laCamisa.marcaCamisa)}
                </td>
                <td>{obtenerTalla(laCamisa.tallaCamisa)}</td>
                <td>
                  {laCamisa.colorCamisa}
                </td>
                <td>
                  {laCamisa.codCamisa}
                </td>
                <td>
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShow(true);
                      setCamObj(laCamisa);
                    }}
                  >
                    <i className="fa-solid fa-trash icon-red"></i>{" "}
                  </a>
                  <i className="fa-solid fa-edit"></i>{" "}
                  <i className="fa-solid fa-rotate"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete this?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            People will never be able to download this mod again, ever, are you
            sure?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                e.preventDefault();
                deleteCamisa(camObj.codCamisa);
                setShow(false);
              }}
            >
              Go ahead
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
