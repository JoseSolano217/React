import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer } from "react-toastify";

import Type from "../../../models/Type";
import ApiBack from "../../../utils/doms/ApiBack";
import PrivateService from "../../../services/PrivateService";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";

export const AdminType = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [typeArray, setTypeArray] = useState<Type[]>([]);
  const [obj, setObj] = useState<Type>(new Type(""));

  const getTypes = async () => {
    const result = await PrivateService.GETs(
      ApiBack.PUBLIC_PROFILE + ApiBack.READ
    );
    setTypeArray(result);
    return result;
  };

  const deleteType = async (code: string) => {
    const deleteUrl = ApiBack.PUBLIC_PROFILE + ApiBack.DELETE + "/" + code;
    const result = await PrivateService.DELETEs(deleteUrl);
    console.log(result);
    if (typeof result.id === "undefined") {
      ToastifyMessage(
        "error",
        "Can't delete type.",
        7000
      );
    } else {
      ToastifyMessage("success", "Type successfuly deleted", 7000);
    }
    getTypes();
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Types</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Start</a>
            </li>
            <li className="breadcrumb-item active">
              Type admin
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
                  <th style={{ width: "40%" }}>Type name</th>
                  <th style={{ width: "10%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {typeArray.map((myType, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{myType.typeName}</td>
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
