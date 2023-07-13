import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "../../utils/hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import CreateUser from "../../models/CreateUser";
import encrypt from "js-sha512";
import UserLogin from "../../services/UserLogin";
import ApiBack from "../../utils/doms/ApiBack";

export const Login = () => {
  const myNavigation = useNavigate();
  type formHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  let { email, password, doubleLink, object } = useForm<CreateUser>(
    new CreateUser("", "", "")
  );

  const clearBox = (myForm: HTMLFormElement) => {
    myForm.reset();
    object.email = "";
    object.password = "";

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
      const urlLogin = ApiBack.URL + ApiBack.PUBLIC_USER + ApiBack.LOGIN;
      const response = await UserLogin.consume(
        urlLogin,
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
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">NiceAdmin</span>
                    </a>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your email and password to login
                        </p>
                      </div>

                      <Form
                        className="row g-3"
                        noValidate
                        validated={inProcess}
                        onSubmit={processForm}
                      >

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
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Crear usuario
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            <Link to="/">Login</Link>
                          </p>
                        </div>
                      </Form>
                    </div>
                  </div>

                  <div className="credits"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
