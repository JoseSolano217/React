import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

import Type from "../../../models/Type";
import Burger from "../../../models/Burger";
import { ToastContainer } from "react-toastify";
import ApiBack from "../../../utils/doms/ApiBack";
import PrivateService from "../../../services/PrivateService";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";
import { getLocalDate, getHour } from "../../../utils/functions/FormatDate";
import Dimention from "../../../models/Dimention";

export const AdminBurger = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [burgerObject, setBurgerObject] = useState<Burger>(new Burger("", new Type(""), new Dimention(""), 0));
  const [burgerArray, setBurgerArray] = useState<Burger[]>([]);
  
  const deleteBurger = async (code: string) => {
    const deleteUrl = ApiBack.PRIVATE_USER + ApiBack.DELETE + "/" + code;
    const result = await PrivateService.DELETEs(deleteUrl);
    console.log(result);
    if (typeof result.eliminado === "undefined") {
      ToastifyMessage("error", "Can't delete burger.", 7000);
    } else {
      ToastifyMessage( "success", "Burger with type " + burgerObject.type.typeName + " has been deleted", 7000 );
    }
    getBurgers();
  };
  
  const getBurgers = async () => {
    const result = await PrivateService.GETs(
      ApiBack.PRIVATE_USER + ApiBack.READ
    );
    setBurgerArray(result);
  };
  
  useEffect(() => {
    getBurgers();
  }, []);
  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Burgers</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">
              Burgers admin
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
                  <th style={{ width: "40%" }}>Burger</th>
                  <th style={{ width: "16%" }}>Dimention</th>
                  <th style={{ width: "20%" }}>Value</th>
                  <th className="text-center" style={{ width: "10%" }}>
                    State
                  </th>
                  <th style={{ width: "6%" }}> </th>
                </tr>
              </thead>
              <tbody>
                {burgerArray.map((myBurger, index) => (
                  <tr key={index}>
                    <td className="text-center align-middle">
                      <small>{index + 1}</small>{" "}
                    </td>
                    <td>
                      {myBurger.type.typeName}
                      <br />
                      <small className="text-muted">
                        {myBurger.dimention.dimType}
                      </small>
                    </td>
                    <td>
                      {myBurger.dimention.dimType}
                    </td>
                    <td className="align-middle">
                      {myBurger.value}
                    </td>
                    <td className="text-center align-middle">
                      <Link to={"/home/detailburgers/" + myBurger._id}>
                        <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                      </Link>{" "}
                      <a
                        href="/#"
                        onClick={(e) => {
                          e.preventDefault();
                          setShow(true);
                          setBurgerObject(myBurger);
                        }}
                      >
                        <i
                          className="fa-solid fa-trash-can fa-sm"
                          style={{ color: "#990000" }}
                        ></i>
                      </a>{" "}
                      <Link to={"/home/updateburgers/" + myBurger._id}>
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};