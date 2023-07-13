import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import User from "../../../models/User";
import ApiBack from "../../../utils/doms/ApiBack";
import PrivateService from "../../../services/PrivateService";
import { getLocalDate, getHour } from "../../../utils/functions/FormatDate";

export const ListUser = () => {
  const [userArray, setUserArray] = useState<User[]>([]);

  const getUsers = async () => {
    const resultado = await PrivateService.GETs(
      ApiBack.PUBLIC_USER + ApiBack.READ
    );
    setUserArray(resultado);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Users</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Start</a>
            </li>
            <li className="breadcrumb-item active">User list</li>
          </ol>
        </nav>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "8%" }}> Nro </th>
                  <th style={{ width: "40%" }}>User</th>
                  <th style={{ width: "16%" }}>Creation</th>
                  <th style={{ width: "20%" }}>Profile</th>
                  <th className="text-center" style={{ width: "10%" }}>
                    State
                  </th>
                  <th style={{ width: "6%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {userArray.map((user, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">
                      <small>{index + 1}</small>{" "}
                    </td>
                    <td>
                      {user.username}
                      <br />
                      <small className="text-muted">
                        {user.email}
                      </small>
                    </td>
                    <td>
                      {getLocalDate(user.creationDate)}
                      <br />
                      <small className="text-muted">
                        {getHour(user.creationDate)}
                      </small>
                    </td>
                    <td className="align-middle">
                      {user.profileCode.profilename}
                    </td>
                    <td
                      className={
                        user.userstate === 1
                          ? "text-center align-middle text-success"
                          : "text-center align-middle text-danger"
                      }
                    >
                      <small>
                        {user.userstate === 1 ? "Activo" : "Inactivo"}{" "}
                      </small>
                    </td>
                    <td className="text-center align-middle">
                      <Link to={"/home/detailusers/"+user._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
