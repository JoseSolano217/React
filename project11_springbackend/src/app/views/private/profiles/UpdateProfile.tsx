import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import Profile from "../../../models/Profile";
import ApiBack from "../../../utils/doms/ApiBack";
import PrivateService from "../../../services/PrivateService";
import { useForm } from "../../../utils/hooks/useForm";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";

export const UpdateProfile = () => {
  let { code } = useParams();
  type htmlForm = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [allReady, setAllReady] = useState<boolean>(false);
  let finishedLoading = allReady !== undefined;
  let { profilename, state, doubleLink, object } = useForm<Profile>(
    new Profile("", "", 0)
  );

  const getProfile = async () => {
    const loadProfileUrl = ApiBack.PUBLIC_PROFILE + ApiBack.READ_ONE + "/" + code;
    const obtainedProfile = await PrivateService.GETs(loadProfileUrl);
    object._id = obtainedProfile._id;
    object.profilename = obtainedProfile.profilename;
    object.state = obtainedProfile.state;
    if (obtainedProfile) {
      setAllReady(true);
    }
  };

  const sendForm = async (fh: htmlForm) => {
    fh.preventDefault();
    setInProcess(true);
    const form = fh.currentTarget;
    form.classList.add("was-validated");

    if (form.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const updateUrl = ApiBack.PUBLIC_PROFILE + ApiBack.UPDATE + "/" + object._id;
      const result = await PrivateService.PUTs(
        updateUrl,
        object
      );

      if (result.new) {
        setInProcess(false);
        ToastifyMessage("success", "Successfully updated profile", 6000);
      } else {
        ToastifyMessage(
          "error",
          "Impossible to update, most likely something to do with the database",
          6000
        );
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <main id="main" className="main">
      {/* Navegación estilo breadcrumb: Inicio */}
      <div className="pagetitle">
        <h1>Profiles</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Start</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home/adminprofile">Profile admin</Link>
            </li>
            <li className="breadcrumb-item active">Update</li>
          </ol>
        </nav>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Edit form</h5>
            {finishedLoading ? (
              <Form
                noValidate
                validated={inProcess}
                onSubmit={sendForm}
              >
                <Form.Group as={Row} className="mb-3" controlId="profilename">
                  <Form.Label column sm={2}>
                    Profile name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      required
                      type="text"
                      name="profilename"
                      className="form-control"
                      value={profilename}
                      onChange={doubleLink}
                    />
                    <Form.Control.Feedback type="invalid">
                      Profile name is mandatory
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="state">
                  <Form.Label column sm={2}>
                    Profile state
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select
                      required
                      name="state"
                      value={state}
                      onChange={doubleLink}
                    >
                      <option value={1}>Active</option>
                      <option value={2}>Inactive</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Select profile state
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit" className="btn btn-sm">
                      Update profile
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Loading editing info</div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};
