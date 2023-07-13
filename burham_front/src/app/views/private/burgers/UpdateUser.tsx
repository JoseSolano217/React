import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { ToastContainer } from "react-toastify";

import Profile from "../../../models/Profile";
import User from "../../../models/User";
import ApiBack from "../../../utils/doms/ApiBack";
import noPhoto from "../../../../assets/images/tmod.png";
import PrivateService from "../../../services/PrivateService";
import { useForm } from "../../../utils/hooks/useForm";
import { ToastifyMessage } from "../../../utils/functions/ToastifyMessage";
import { ConvertToBase64 } from "../../../utils/functions/ConvertToBase64";

export const UpdateUser = () => {
  let { code } = useParams();
  const [avatarBase64, setAvatarBase64] = useState<string>("");
  const [miniImage, setMiniImage] = useState(noPhoto);
  const [tempImageName, setTempImageName] = useState<string>("");

  const [allReady, setAllReady] = useState<boolean>(false);
  let finishedLoading = allReady !== false;

  type formaHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [profileArray, setProfileArray] = useState<Profile[]>([]);

  let { username, email, userstate, imageName, userAvatar, profileCode, doubleLink, object,
  } = useForm<User>( new User("", "", "", "", new Date(), 0, "", "", new Profile("", "", 1)) );
  
  const getOneUser = async () => {
    const loadUserUrl = ApiBack.PRIVATE_USER + ApiBack.READ_ONE + "/" + code;
    const user = await PrivateService.GETs(loadUserUrl);
    if (user) {
      object.username = user.username;
      object.email = user.email;
      object.userstate = user.userstate;
      object.userAvatar = user.userAvatar;
      object.profileCode = user.profileCode;

      if (user) {
        setAvatarBase64(user.userAvatar);
        setMiniImage(user.userAvatar);
        setTempImageName(user.imageName);
        setAllReady(true);
      }
    }
  };
  
  const getProfiles = async () => {
    const result = await PrivateService.GETs( ApiBack.PUBLIC_PROFILE + ApiBack.READ );
    setProfileArray(result);
  };
  
  const showImage = async (e: any) => {
    const files = e.target.files;
    const image = files[0];
    setMiniImage(URL.createObjectURL(image));
    doubleLink(e);
    const base64 = await ConvertToBase64(image);
    setAvatarBase64(String(base64));
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
      object.userAvatar = avatarBase64;

      const urlActualizar = ApiBack.PRIVATE_USER + ApiBack.UPDATE + "/" + code;
      const objectActualizar = new User( object._id, object.username, object.email, "", new Date(), object.userstate,
        imageName !== "" ? imageName : tempImageName, object.userAvatar, object.profileCode );
      const result = await PrivateService.PUTs( urlActualizar, objectActualizar );

      if (result.nuevo) {
        setInProcess(false);
        ToastifyMessage("success", "User updated correctly", 7000);
      } else {
        ToastifyMessage( "error", "User updated...NOT. Chech the email", 7000 );
      }
    }
  };

  useEffect(() => {
    getProfiles();
    getOneUser();
  }, []);
    return (
      <main id="main" className="main">
      <div className="pagetitle">
        <h1>Users</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home">Start</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/home/admuser">User admin</Link>
            </li>
            <li className="breadcrumb-item active">Update</li>
          </ol>
        </nav>
      </div>
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Update form</h5>

            {finishedLoading ? (
              <Form
                noValidate
                validated={inProcess}
                onSubmit={sendForm}
              >
                <Form.Group as={Row} className="mb-3" controlId="username">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>Full name:</small>
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
                      User's full name
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
                      <small>User state:</small>
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
                      Select the starting state of the user
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="profileCode">
                  <Form.Label column sm={3}>
                    <span className="text-success">
                      <small>User profile:</small>
                    </span>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Select
                      size="sm"
                      required
                      name="profileCode"
                      value={profileCode._id}
                      onChange={doubleLink}
                    >
                      <option value="">Select profile</option>
                      {profileArray.map((miPer, indice) => (
                        <option key={indice} value={miPer._id}>
                          {miPer.profilename}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Select the user's profile
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="imageName"
                >
                  <Form.Label column sm={3}>
                    <div>
                      <span className="text-success">Current photo: </span>
                      <span>
                        <small>{tempImageName}</small>
                      </span>
                    </div>
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      size="sm"
                      accept="image/png, image/jpeg"
                      type="file"
                      name="imageName"
                      className="form-control"
                      value={imageName}
                      onChange={showImage}
                    />
                    <Form.Control.Feedback type="invalid">
                      Must select an avatar
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>

                <div className="mb-3 row">
                  <div className="col-sm-3"></div>
                  <div className="d-flex justify-content-center col-sm-9">
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = noPhoto;
                      }}
                      src={miniImage}
                      alt="Profile"
                      className="maximoTamanoCreacion"
                    />
                  </div>
                </div>

                <Form.Group as={Row} className="mb-3">
                  <Col sm={{ span: 9, offset: 3 }}>
                    <Button type="submit" className="btn btn-primary">
                      UpdateUser
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            ) : (
              <div>Loading profile info</div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
    );
  };