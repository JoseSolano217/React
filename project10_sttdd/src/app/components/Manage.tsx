import { useState } from "react";
import { MOD_ARRAY } from "../mocks/mod-mock";
import { ARRAY_DEVS } from "../utilities/doms/DomModDevs";
import { Mod } from "../models/Mod";
import { ModDev } from "../models/ModDev";
import { Modl } from "./mods/Modl";
import { Button, Modal } from "react-bootstrap";
import { Update } from "./Update";
import { Link } from "react-router-dom";

export const Manage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [arrayEquip] = useState<Mod[]>(MOD_ARRAY);
  const [arrayDevs] = useState<ModDev[]>(ARRAY_DEVS);
  const [modlShow, setModlShow] = useState<boolean>(false);
  const [modObj, setModObj] = useState<Mod>(
    new Mod(0, 0, "", 1, false, "", "")
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
          arrayDevs[index].program +
          ", " +
          arrayDevs[index].music +
          ", " +
          arrayDevs[index].sprite
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
              <th scope="col">Mod name</th>
              <th scope="col">Dev team</th>
              <th scope="col">Downloads</th>
              <th scope="col">Icon name</th>
              <th scope="col">Mod ID</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {arrayEquip.map((theMod: Mod, index: number) => (
              <tr key={theMod.code}>
                <td>
                  <span
                    style={{
                      textDecoration: theMod.state ? "" : "line-through",
                    }}
                  >
                    {theMod.name}
                  </span>
                </td>
                <td>{createRow(theMod.team)}</td>
                <td>{theMod.downloads}</td>
                <td>{theMod.imageName}</td>
                <td>{theMod.code}</td>
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
