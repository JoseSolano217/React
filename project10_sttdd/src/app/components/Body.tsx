import { useState } from "react";
import { MOD_ARRAY } from "../mocks/mod-mock";
import { Mod } from "../models/Mod";
import { Modl } from "./mods/Modl";

export const Body = () => {
  const [arrayEquip] = useState<Mod[]>(MOD_ARRAY);
  const [modlShow, setModlShow] = useState<boolean>(false);
  const [modObj, setModObj] = useState<Mod>(new Mod(0, 0, "", 1, false, "", ""));
  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-dark table-hover caption-top">
          <caption>List of mods</caption>
          <thead>
            <tr>
              <th scope="col">Icon</th>
              <th scope="col">Mod name</th>
              <th scope="col">Dev team</th>
            </tr>
          </thead>
          <tbody>
            {arrayEquip.map((theMod: Mod, index: number) => (
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
                <td>
                  <span
                    style={{
                      textDecoration: theMod.state ? "" : "line-through",
                    }}
                  >
                    {theMod.name}
                  </span>
                </td>
                <td>{theMod.team}</td>
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
