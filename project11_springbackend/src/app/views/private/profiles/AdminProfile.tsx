import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

import Profile from "../../../models/Profile";
import ApiBack from "../../../utils/doms/ApiBack";
import PrivateService from "../../../services/PrivateService";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";

export const AdminProfile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [profileArray, setProfileArray] = useState<Profile[]>([]);
  const [obj, setObj] = useState<Profile>(new Profile("", "", 0));

  const getProfiles = async () => {
    const result = await PrivateService.GETs(
      ApiBack.PUBLIC_PROFILE + ApiBack.READ
    );
    setProfileArray(result);
    return result;
  };

  const deleteProfile = async (code: string) => {
    const deleteUrl = ApiBack.PUBLIC_PROFILE + ApiBack.DELETE + "/" + code;
    const result = await PrivateService.DELETEs(deleteUrl);
    console.log(result);
    if (typeof result.id === "undefined") {
      ToastifyMessage(
        "error",
        "Can't delete profile. It may be related to users.",
        7000
      );
    } else {
      ToastifyMessage("success", "Profile successfuly deleted", 7000);
    }
    getProfiles();
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Profiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Start</a>
            </li>
            <li className="breadcrumb-item active">
              Profile admin
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
                  <th style={{ width: "25%" }}>Order</th>
                  <th style={{ width: "40%" }}>Profile name</th>
                  <th style={{ width: "15%" }}>State</th>
                  <th className="text-center" style={{ width: "10%" }}>
                    Users
                  </th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {profileArray.map((myProfile, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{myProfile.profilename}</td>
                    <td>
                      {myProfile.state === 1 ? "Active" : "Inactive"}
                    </td>
                    <td className="text-center">{myProfile.userQuantity}</td>
                    <td className="text-center">
                      {myProfile.userQuantity === 0 ? (
                        <a
                          href="/#"
                          onClick={(e) => {
                            e.preventDefault();
                            setShow(true);
                            setObj(myProfile);
                          }}
                        >
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ color: "#990000" }}
                          ></i>
                        </a>
                      ) : (
                        <i
                          className="fa-solid fa-trash-can"
                          style={{ color: "#908989" }}
                          onClick={() => {
                            deleteProfile(myProfile._id);
                          }}
                        ></i>
                      )}{" "}
                      <Link to={"/home/update/" + myProfile._id}>
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
                <strong>{obj.profilename}</strong>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    deleteProfile(obj._id);
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
