import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ModDev } from "../models/ModDev";
import { ARRAY_DEVS } from "../utilities/doms/DomModDevs";
import defaultImage from "../../assets/tmod.png";
import { useForm } from "../utilities/hooks/useForm";
import { Mod } from "../models/Mod";
import { MOD_ARRAY } from "../mocks/mod-mock";
import { ToBase64 } from "../utilities/functions/ToBase64";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  type formHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [smallImage, setSmallImage] = useState(defaultImage);
  const [devArray] = useState<ModDev[]>(ARRAY_DEVS);
  const [imageBase64, setImageBase64] = useState<string>("");
  const nav = useNavigate();

  const sendForm = (fh: formHtml) => {
    fh.preventDefault();
    const form = fh.currentTarget;
    if (form.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
      setInProcess(true);
    } else {
      const newCode = MOD_ARRAY.length;
      object.code = newCode;
      object.image = imageBase64;
      MOD_ARRAY.push(object);

      setInProcess(false);
      nav("/manage")
    }
  }

  let {name, team, image, doubleLink, object} = useForm<Mod>(new Mod(0, 0, "", 1, false, "", ""))

  const loadImage = async (e: any) => {
    const theFilesInQuestion = e.target.files;
    const image = theFilesInQuestion[0];
    setSmallImage(URL.createObjectURL(image));
    doubleLink(e);
    const base64 = await ToBase64(image);
    setImageBase64(String(base64));
  };

  return (
    <div className="d-flex justify-content-center" style={{ paddingTop: 20 }}>
      <div className="card" style={{ width: "18rem" }}>
      <Form validated={inProcess} onSubmit={sendForm} noValidate>
        <div className="card-body">
          <h5 className="card-title" style={{ color: "black" }}>
            Create a mod
          </h5>
          <div className="mb-3">
            <Form.Group controlId="name">
              <Form.Label>
                <span className="delete">*</span>Mod Name
              </Form.Label>
              <Form.Control size="sm" required type="text" name="name" value={name} onChange={doubleLink}></Form.Control>
            </Form.Group>
          </div>

          <div className="mb-3">
            <Form.Group controlId="team">
              <Form.Label>
                <span className="delete">*</span>Dev Team
              </Form.Label>
              <Form.Select size="sm" required name="team" value={team} onChange={doubleLink}>
                <option value="">Select a dev team</option>
                {devArray.map((devTeam: ModDev) => (
                  <option key={devTeam.code} value={devTeam.code}>
                  {String(devTeam.code + ". " + devTeam.program + ", " + devTeam.music + ", " + devTeam.sprite)}
                </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group controlId="image">
              <Form.Label>
                <span className="delete">*</span>Mod Icon
              </Form.Label>
              <Form.Control size="sm" required type="file" name="image" value={image} onChange={loadImage}></Form.Control>
            </Form.Group>
          <div className="mb-3">
            
          <div className="mb-3">
            <div className="d-flex justify-content-center">
              <img src={smallImage} alt="Nothing" className="An-Image-That-Is-Not-Bad"/>
            </div>
          </div>
          <Button type="submit" className="btn btn-primary">Create!</Button>
          </div>
        </div>
        </Form>
      </div>
    </div>
  );
};
