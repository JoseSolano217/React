import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

import Dimention from "../../../models/Dimention";
import ApiBack from "../../../utils/doms/ApiBack";
import PrivateService from "../../../services/PrivateService";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";

export const AdminDimention = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [dimentionArray, setDimentionArray] = useState<Dimention[]>([]);
  const [obj, setObj] = useState<Dimention>(new Dimention(""));

  const getDimentions = async () => {
    const result = await PrivateService.GETs(
      ApiBack.PUBLIC_PROFILE + ApiBack.READ
    );
    setDimentionArray(result);
    return result;
  };

  const deleteDimention = async (code: string) => {
    const deleteUrl = ApiBack.PUBLIC_PROFILE + ApiBack.DELETE + "/" + code;
    const result = await PrivateService.DELETEs(deleteUrl);
    console.log(result);
    if (typeof result.id === "undefined") {
      ToastifyMessage(
        "error",
        "Can't delete dimention.",
        7000
      );
    } else {
      ToastifyMessage("success", "Dimention successfuly deleted", 7000);
    }
    getDimentions();
  };

  useEffect(() => {
    getDimentions();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Dimentions</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Start</a>
            </li>
            <li className="breadcrumb-item active">
              Dimention admin
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
                  <th style={{ width: "40%" }}>Dimention name</th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {dimentionArray.map((myDimention, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{myDimention.dimType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
