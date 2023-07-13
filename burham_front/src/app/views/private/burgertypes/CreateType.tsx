import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import { useState } from "react";
import Type from "../../../models/Type";
import PrivateService from "../../../services/PrivateService";
import ApiBack from "../../../utils/doms/ApiBack";
import { useForm } from "../../../utils/hooks/useForm";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";

export const CreateType = () => {
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  let { typeName, doubleLink, object } =
    useForm<Type>(new Type(""));

  const cleanBox = (form: HTMLFormElement) => {
    form.reset();
    object.typeName = "";
    form.typename.value = "";
    form.state.value = "";
    form.classList.remove("was-validated");
  };

  const sendForm = async (fh: formaHtml) => {
    fh.preventDefault();
    setInProcess(true);
    const form = fh.currentTarget;
    form.classList.add("was-validated");

    if (form.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const result = await 
      PrivateService.POSTs( ApiBack.PUBLIC_PROFILE + ApiBack.CREATE, object );
      if (result.id) {
        setInProcess(false);
        ToastifyMessage("info", "Type created successfully", 7000);
      } else {
        ToastifyMessage("error", "Type created...NOT", 7000);
      }
      console.log(object);
      cleanBox(form);
    }
  };

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Types</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Start</a>
            </li>
            <li className="breadcrumb-item active">Create type</li>
          </ol>
        </nav>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Creation form</h5>

            <Form noValidate validated={inProcess} onSubmit={sendForm}>
              <Form.Group as={Row} className="mb-3" controlId="typename">
                <Form.Label column sm={2}>
                  Type name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    required
                    type="text"
                    name="typename"
                    className="form-control"
                    value={typeName}
                    onChange={doubleLink}
                  />
                  <Form.Control.Feedback type="invalid">
                    Type name is mandatory
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit">Create Type</Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};