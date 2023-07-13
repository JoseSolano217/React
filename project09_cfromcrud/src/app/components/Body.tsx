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
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div className="col">
              {arrayEquip.map((theMod: Mod, index: number) => (
              <div className="card shadow-sm">
                <svg
                  className="bd-placeholder-img card-img-top"
                  width="100%"
                  height="225"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Placeholder: Thumbnail"
                  preserveAspectRatio="xMidYMid slice"
                  focusable="false"
                >
                  <title>Placeholder</title>
                  <rect width="100%" height="100%" fill="#55595c"></rect>
                  <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                    Thumbnail
                  </text>
                </svg>

                <div className="card-body">
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
