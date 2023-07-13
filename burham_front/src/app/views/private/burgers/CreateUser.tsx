import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as cypher from "js-sha512";
import { ToastContainer } from "react-toastify";

import Type from "../../../models/Type";
import Burger from "../../../models/Burger";
import ApiBack from "../../../utils/doms/ApiBack";
import noPhoto from "../../../../assets/images/tmod.png";
import PrivateService from "../../../services/PrivateService";
import { useForm } from "../../../utils/hooks/useForm";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";
import { ConvertToBase64 } from "../../../utils/functions/ConvertToBase64";

export const CreateBurger = () => {
  const [allReady, setAllReady] = useState<boolean>(false);
  let finishedLoading = allReady !== false;

  const redirect = useNavigate();
  const [miniImage, setMiniImage] = useState(noPhoto);
  const [avatarBase64, setAvatarBase64] = useState<string>("");

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [typeArray, setTypeArray] = useState<Type[]>([]);

  let { username, email, userstate, password, imageName, userAvatar, typeCode, doubleLink, object,
  } = useForm<Burger>( new Burger("", "", "", "", new Date(), 0, "", "", new Type("", "", 1)) );

  const getTypes = async () => {
    const result = await PrivateService.GETs( ApiBack.PUBLIC_PROFILE + ApiBack.READ );
    setTypeArray(result);
    if (result) { setAllReady(true); }
  };

  const showImage = async (e: any) => {
    const files = e.target.files;
    const image = files[0];
    setMiniImage(URL.createObjectURL(image));
    doubleLink(e);
    const base64 = await ConvertToBase64(image);
    setAvatarBase64(String(base64));
  };

  const clearBoxes = (form: HTMLFormElement) => {
    object._id = "";
    object.password = "";
    form.password.value = "";
    form.rePassword.value = "";
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
      object.userAvatar = userAvatar;
      const cypheredPassword = cypher.sha512(object.password);
      object.password = cypheredPassword;
      object.userAvatar = avatarBase64;
      const result = await PrivateService.POSTs( ApiBack.PRIVATE_USER + ApiBack.CREATE, object );

      if (result.id) {
        setInProcess(false);
        redirect("/home/detailusers/" + result.id);
      } else {
        clearBoxes(form);
        ToastifyMessage( "error", "Can't create user, email may already be registered", 7000 );
      }
    }
  };

  useEffect(() => {
    getTypes();
  }, []);
    return (
      <main id="main" className="main">
      <div className="pagetitle">
        <h1>Burgers</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Inicio</a>
            </li>
            <li className="breadcrumb-item active">Create user</li>
          </ol>
        </nav>
      </div>
      {/* Navegación estilo breadcrumb: Fin */}

      {/* Ejemplo de form: Inicio */}
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Formulario de creación</h5>

            {finishedLoading ? (
              <Form
                noValidate
                validated={inProcess}
                onSubmit={sendForm}
              >
                <Form.Group as={Row} className="mb-3" controlId="username">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Nombre completo:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="username"
                      className="form-control"
                      value={username}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Complete user name
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="email">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Email:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="text"
                      name="email"
                      className="form-control"
                      pattern="[a-z0-9+_.-]+@[a-z]+\.[a-z]{2,3}"
                      value={email}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Invalid email
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="userstate">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Estado usuario:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="userstate"
                      value={userstate}
                      onChange={doubleLink}
                    >
                      <option value="">Select the state</option>
                      <option value={1}>Active</option>
                      <option value={2}>Inactive</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Select the user state
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="typeCode">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Burger type:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="typeCode"
                      value={typeCode._id}
                      onChange={doubleLink}
                    >
                      <option value="">Select the type</option>
                      {typeArray.map((type, index) => (
                        <option key={index} value={type._id}>
                          {type.typename}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Select the user type
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="password">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Password:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="password"
                      name="password"
                      minLength={4}
                      className="form-control"
                      value={password}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Minimum length is 4 characters
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="rePassword"
                >
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Confirm password:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      required
                      type="password"
                      name="rePassword"
                      minLength={4}
                      className="form-control"
                      pattern={password}
                    />
                    <Form.Control.Feedback type="invalid">
                      Passwords aren't the same
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="imageName"
                >
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Seleccione foto:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      accept="image/png, image/jpeg"
                      required
                      type="file"
                      name="imageName"
                      className="form-control"
                      value={imageName}
                      onChange={showImage}
                    />
                    <Form.Control.Feedback type="invalid">
                      Select an avatar (Mandatory)
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <div className="mb-3 row">
                  <div className="col-sm-3"></div>
                  <div className="d-flex justify-content-center col-sm-9">
                    <img
                      src={miniImage}
                      alt="no photo"
                      className="maximoTamanoCreacion"
                    />
                  </div>
                </div>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-primary">
                      Create user
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Loading type info</div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
    );
  };