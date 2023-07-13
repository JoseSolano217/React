import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import User from "../../../models/User";
import ApiBack from "../../../utils/doms/ApiBack";
import noFoto from "../../../../assets/images/tmod.png";
import PrivateService from "../../../services/PrivateService";
import { getLocalDate, getHour } from "../../../utils/functions/FormatDate";

export const DetailUser = () => {
  let { code } = useParams();
  const regresar = useNavigate();
  const [allReady, setAllReady] = useState<boolean>(false);
  let finishedLoading = allReady !== undefined;
  const [userObject, setUserObject] = useState<User>();

  useEffect(() => {
    const getOneUser = async () => {
      const urlLoadOneUser = ApiBack.PRIVATE_USER + ApiBack.READ_ONE + "/" + code;
      const obtainedUser = await PrivateService.GETs(urlLoadOneUser);
      if (obtainedUser) {
        setUserObject(obtainedUser);
        setAllReady(true);
      }
    };
    getOneUser();
  }, [code]);

    return (
      <main id="main" className="main">
      {finishedLoading ? (
        <div className="d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">User Info</div>
              <div className="card-body">
                <h5 className="card-title">
                  Name: {userObject?.username}
                </h5>
                <p className="card-text">
                  Email: {userObject?.email}
                  <br />
                  Perfil: {userObject?.profileCode.profilename}
                  <br />
                  Creation date:{" "}
                  {getLocalDate(String(userObject?.creationDate))}
                  <br />
                  Creation hour:{" "}
                  {getHour(String(userObject?.creationDate))}
                  <br />
                  State:
                  <span
                    className={
                      userObject?.userstate === 1
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {userObject?.userstate === 1 ? "Activo" : "Inactivo"}
                  </span>
                  <br />
                  Nombre avatar: {userObject?.imageName}
                  <br />
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = noFoto;
                    }}
                    src={userObject?.userAvatar}
                    alt="Profile"
                    className="maximoTamanoCreacion"
                  />
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => regresar(-1)}
                  className="btn btn-info btn-sm"
                >
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>User loading in process</div>
      )}
    </main>
    );
  };