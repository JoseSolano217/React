import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import Profile from "../../../models/Profile";
import User from "../../../models/User";
import { ToastContainer } from "react-toastify";
import ApiBack from "../../../utils/doms/ApiBack";
import PrivateService from "../../../services/PrivateService";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";
import { getLocalDate, getHour } from "../../../utils/functions/FormatDate";

export const AdminUser = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [userObject, setUserObject] = useState<User>( new User("", "", "", "", new Date(), 1, "", "", new Profile("", "", 1)) );
  const [userArray, setUserArray] = useState<User[]>([]);
  
  const deleteUser = async (code: string) => {
    const deleteUrl = ApiBack.PRIVATE_USER + ApiBack.DELETE + "/" + code;
    const result = await PrivateService.DELETEs(deleteUrl);
    console.log(result);
    if (typeof result.eliminado === "undefined") {
      ToastifyMessage("error", "Can't delete user.", 7000);
    } else {
      ToastifyMessage( "success", "User with email " + userObject.email + " has been deleted", 7000 );
    }
    getUsers();
  };
  
  const getUsers = async () => {
    const result = await PrivateService.GETs(
      ApiBack.PRIVATE_USER + ApiBack.READ
    );
    setUserArray(result);
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
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">
              Users admin
            </li>
          </ol>
        </nav>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "8%" }}>
                    {" "}
                    Nro{" "}
                  </th>
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
                {userArray.map((myUser, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">
                      <small>{index + 1}</small>{" "}
                    </td>
                    <td>
                      {myUser.username}
                      <br />
                      <small className="text-muted">
                        {myUser.email}
                      </small>
                    </td>
                    <td>
                      {getLocalDate(myUser.creationDate)}
                      <br />
                      <small className="text-muted">
                        {getHour(myUser.creationDate)}
                      </small>
                    </td>
                    <td className="align-middle">
                      {myUser.profileCode.profilename}
                    </td>
                    <td
                      className={
                        myUser.userstate === 1
                          ? "text-center align-middle text-success"
                          : "text-center align-middle text-danger"
                      }
                    >
                      <small>
                        {myUser.userstate === 1 ? "Active" : "Inactive"}{" "}
                      </small>
                    </td>
                    <td className="text-center align-middle">
                      <Link to={"/home/detailusers/" + myUser._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setUserObject(myUser);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#990000" }}
                        ></i>
                      </a>{" "}
                      <Link to={"/home/updateusers/" + myUser._id}>
                        <i
                          className="fa-regular fa-pen-to-square"
                          style={{ color: "#006600" }}
                        ></i>
                      </Link>
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
                <Modal.Title>Delete profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Do you wish to delete the profile?
                <br />
                <strong>
                  {userObject.username} - {userObject.email}
                </strong>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    deleteUser(userObject._id);
                    setShow(false);
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};