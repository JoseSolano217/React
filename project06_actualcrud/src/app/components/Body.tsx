import { useState } from "react";
import { MOD_ARRAY } from "../mocks/mod-mock";
import { Mod } from "../models/Mod";

export const Body = () => {
  const [arrayEquip, setArrayEquip] = useState<Mod[]>(MOD_ARRAY);
  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-dark table-hover caption-top">
          <caption>List of mods</caption>
          <thead>
            <tr>
              <th scope="col">Number of downloads</th>
              <th scope="col">Mod name</th>
              <th scope="col">Dev team</th>
              <th scope="col">Tags</th>
            </tr>
          </thead>
          <tbody>
            {arrayEquip.map((theMod: Mod, index: number) => (
              <tr>
                <th>{theMod.downloads}</th>
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
                <td>
                  <i className="fa-solid fa-trash"></i>{" "}
                  <i className="fa-solid fa-edit"></i>{" "}
                  <i className="fa-solid fa-rotate"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
