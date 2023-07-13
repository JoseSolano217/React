import { useState } from "react";
import { COKE_ARRAY } from "../mocks/coke-mocks";
import { ARRAY_TYPES } from "../utilities/doms/DomCokeTypes";
import { Coke } from "../models/Coke";
import { CokeType } from "../models/CokeType";
import { Modl } from "./mods/Modl";
import { Button, Modal } from "react-bootstrap";
import { Update } from "./Update";
import { Link } from "react-router-dom";

export const Manage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [arrayEquip] = useState<Coke[]>(COKE_ARRAY);
  const [arrayDevs] = useState<CokeType[]>(ARRAY_TYPES);
  const [modlShow, setModlShow] = useState<boolean>(false);
  const [modObj, setModObj] = useState<Coke>(
    new Coke(0,"", 0, "", "")
  );

  const deleteMod = (code: number) => {
    const limit = arrayEquip.length;
    for (let index = 0; index < limit; index++) {
      if (arrayEquip[index] != undefined) {
        const compare = arrayEquip[index].code;
        if (compare === code) {
          arrayEquip.splice(index, 1);
        }
      }
    }
  };

  const createRow = (dev: number) => {
    const limit = arrayEquip.length;
    for (let index = 0; index < limit; index++) {
      if (dev == arrayDevs[index].code) {
        return (
          arrayDevs[index].type
        );
      }
    }
    return "Oh the missery";
  };

  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-dark table-hover caption-top">
          <caption>List of mods</caption>
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Manage</th>
            </tr>
          </thead>
          <tbody>
            {arrayEquip.map((theMod: Coke, index: number) => (
              <tr key={theMod.code}>
                <td width={"15%"}>
                  {theMod.image !== "" ? (
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setModlShow(true);
                      setModObj(theMod);
                    }}
                  >
                    <img
                      src={theMod.image}
                      alt="Meaningful text"
                      width={"100%"}
                    ></img>
                  </a>) : (<div>No bitches</div>)}
                </td>
                <td>{theMod.name}</td>
                <td>{createRow(theMod.type)}</td>
                <td>
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setShow(true);
                      setModObj(theMod);
                    }}
                  >
                    <i className="fa-solid fa-trash icon-red"></i>{" "}
                  </a>
                  <Link to={`/update/${theMod.code}`}>
                    <i className="fa-solid fa-edit"></i>{" "}
                  </Link>
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
            <Modal.Title>Delete {modObj.name}</Modal.Title>
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
                deleteMod(modObj.code);
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
