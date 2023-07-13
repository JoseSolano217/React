import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "../../utils/hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import CreateUser from "../../models/CreateUser";
import Logo from "../../../assets/images/tmod.png";
import encrypt from "js-sha512";
import UserLogin from "../../services/UserLogin";

export const Signin = () => {
  const myNavigation = useNavigate();
  type formHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  let { username, email, password, doubleLink, object } = useForm<CreateUser>(
    new CreateUser("", "", "")
  );

  const clearBox = (myForm: HTMLFormElement) => {
    myForm.reset();
    object.username = "";
    object.email = "";
    object.password = "";

    myForm.username.value = "";
    myForm.email.value = "";
    myForm.password.value = "";

    myForm.classList.remove("was-validated");
  };

  const processForm = async (fh: formHtml) => {
    fh.preventDefault();
    setInProcess(true);
    const currentForm = fh.currentTarget;
    currentForm.classList.add("was-validated");

    if (currentForm.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const encryptedPassword = encrypt.sha512(object.password);
      object.password = encryptedPassword;
      const response = await UserLogin.consume(
        "http://localhost:3123/api/public/users/create",
        object
      );
      console.log(response);
      if (response.tokenUSTA) {
        localStorage.setItem("tokenUSTA", response.tokenUSTA);
        console.log("No context");
        setInProcess(false);
        myNavigation("/home");
      } else {
        clearBox(currentForm);
      }
    }
  };

  return (
    <div>
      <main>
        <div className="container">
          <section className="section register d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <Link
                      to="/"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src={Logo} alt="" />
                      <span className="d-none d-lg-block">Mintic 2022</span>
                    </Link>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create account
                        </h5>
                        <p className="text-center small">Complete this</p>
                      </div>
                      <Form
                        className="row g-3"
                        noValidate
                        validated={inProcess}
                        onSubmit={processForm}
                      >
                        <div className="col-12">
                          <Form.Group controlId="username">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              name="username"
                              className="form-control"
                              value={username}
                              onChange={doubleLink}
                            />
                            <Form.Control.Feedback type="invalid">
                              Debe digitar el nombre del usuario
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group controlId="email">
                            <Form.Label>Correo electronico</Form.Label>
                            <div className="input-group">
                              <span className="input-group-text">@</span>
                              <Form.Control
                                required
                                type="email"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={doubleLink}
                              />
                              <Form.Control.Feedback type="invalid">
                                Debe ingresar un correo electronico valido
                              </Form.Control.Feedback>
                            </div>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                              required
                              type="password"
                              name="password"
                              className="form-control"
                              minLength={6}
                              value={password}
                              onChange={doubleLink}
                            />
                            <Form.Control.Feedback type="invalid">
                              Contraseña incorrecta
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group controlId="repassword">
                            <Form.Label>Confirmar contraseña</Form.Label>
                            <Form.Control
                              required
                              type="password"
                              name="repassword"
                              className="form-control"
                              pattern={password}
                            />
                            <Form.Control.Feedback type="invalid">
                              La contraseña no coincide
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Crear usuario
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account? &nbsp;
                            <Link to="/">Iniciar sesión</Link>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
