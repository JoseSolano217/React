import { useState } from "react";
import { COKE_ARRAY } from "../mocks/coke-mocks";
import { Coke } from "../models/Coke";
import { Modl } from "./mods/Modl";
import { ARRAY_TYPES } from "../utilities/doms/DomCokeTypes";
import { CokeType } from "../models/CokeType";

export const Body = () => {
  const [arrayEquip] = useState<Coke[]>(COKE_ARRAY);
  const [modlShow, setModlShow] = useState<boolean>(false);
  const [modObj, setModObj] = useState<Coke>(new Coke(0, "", 0, "", ""));
  const [arrayTypes] = useState<CokeType[]>(ARRAY_TYPES);

  const createRow = (dev: number) => {
    const limit = arrayEquip.length;
    for (let index = 0; index < limit; index++) {
      if (dev == arrayTypes[index].code) {
        return (
          arrayTypes[index].type
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
              <th scope="col">Coke</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {arrayEquip.map((theCoke: Coke, index: number) => (
              <tr key={theCoke.code}>
                <td width={"15%"}>
                  {theCoke.image !== "" ? (
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setModlShow(true);
                      setModObj(theCoke);
                    }}
                  >
                    <img
                      src={theCoke.image}
                      alt="Meaningful text"
                      width={"100%"}
                    ></img>
                  </a>) : (<div>No bitches</div>)}
                </td>
                <td>
                  <span>
                    {theCoke.name}
                  </span>
                </td>
                <td>{createRow(theCoke.type)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modl
        show={modlShow}
        onHide={() => setModlShow(false)}
        obj={modObj}
        />
      </div>
    </div>
  );
};
