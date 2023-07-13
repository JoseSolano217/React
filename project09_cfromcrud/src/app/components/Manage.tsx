import { useState } from "react";
import { MOD_ARRAY } from "../mocks/mod-mock";
import { ARRAY_DEVS } from "../utilities/doms/DomModDevs";
import { Mod } from "../models/Mod";
import { ModDev } from "../models/ModDev";
import { Modl } from "./mods/Modl";

export const Manage = () => {
    const [arrayEquip] = useState<Mod[]>(MOD_ARRAY);
    const [arrayDevs] = useState<ModDev[]>(ARRAY_DEVS);
    const [modlShow, setModlShow] = useState<boolean>(false);
    const [modObj] = useState<Mod>(new Mod(0, 0, "", 1, false, "", ""));

    const createRow = (dev: number) => {
      for (let index = 0; index < arrayDevs.length; index++) {
        if (dev == arrayDevs[index].code) {
          return(arrayDevs[index].program + ", " + arrayDevs[index].music + ", " + arrayDevs[index].sprite);
        }
      };
      return("Oh the missery"); 
    }

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
                <td>{theMod.code}</td>
                <td>
                  <i className="fa-solid fa-trash icon-red"></i>{" "}
                  <i className="fa-solid fa-edit"></i>{" "}
                  <i className="fa-solid fa-rotate"></i>
                </td>
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
    )
}