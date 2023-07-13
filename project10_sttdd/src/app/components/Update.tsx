import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ModDev } from "../models/ModDev";
import { ARRAY_DEVS } from "../utilities/doms/DomModDevs";
import defaultImage from "../../assets/tmod.png";
import { useForm } from "../utilities/hooks/useForm";
import { Mod } from "../models/Mod";
import { MOD_ARRAY } from "../mocks/mod-mock";
import { ToBase64 } from "../utilities/functions/ToBase64";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  let { modCode } = useParams();

  const selectedMod = MOD_ARRAY.find((mod) => {
    return mod.code === Number(modCode);
  });

  console.log(selectedMod);
  type formHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [smallImage, setSmallImage] = useState(defaultImage);
  const [devArray] = useState<ModDev[]>(ARRAY_DEVS);
  const [modArray] = useState<Mod[]>(MOD_ARRAY);
  const [imageBase64, setImageBase64] = useState<string>("");
  const nav = useNavigate();

  const updateMod = () => {
    const limit = modArray.length;
    for (let index = 0; index < limit; index++) {
      const compare = modArray[index].code;
      if (compare === selectedMod?.code) {
        modArray[index] = new Mod(
          code,
          downloads,
          name,
          team,
          state,
          imageBase64,
          imageName
        );
      }
    }
  };

  const sendForm = (fh: formHtml) => {
    fh.preventDefault();
    const form = fh.currentTarget;
    if (form.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
      setInProcess(true);
    } else {
      updateMod();

      setInProcess(false);
      nav("/manage");
    }
  };

  let {
    code,
    downloads,
    name,
    team,
    state,
    image,
    imageName,
    doubleLink,
    object,
  } = useForm<Mod>(
    new Mod(
      selectedMod ? selectedMod.code : 0,
      selectedMod ? selectedMod.downloads : 0,
      selectedMod ? selectedMod.name : "",
      selectedMod ? selectedMod.team : 1,
      selectedMod ? selectedMod.state : false,
      selectedMod ? selectedMod.image : "",
      ""
    )
  );

  useEffect(() => {
    setImageBase64(image);
    setSmallImage(image);
  }, [image]);

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
                <Form.Control
                  size="sm"
                  required
                  type="text"
                  name="name"
                  value={name}
                  onChange={doubleLink}
                ></Form.Control>
              </Form.Group>
            </div>

            <div className="mb-3">
              <Form.Group controlId="team">
                <Form.Label>
                  <span className="delete">*</span>Dev Team
                </Form.Label>
                <Form.Select
                  size="sm"
                  required
                  name="team"
                  value={team}
                  onChange={doubleLink}
                >
                  <option value="">Select a dev team</option>
                  {devArray.map((devTeam: ModDev) => (
                    <option key={devTeam.code} value={devTeam.code}>
                      {String(
                        devTeam.code +
                          ". " +
                          devTeam.program +
                          ", " +
                          devTeam.music +
                          ", " +
                          devTeam.sprite
                      )}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group controlId="imageName">
              <Form.Label>
                <span className="delete">*</span>Mod Icon: {selectedMod?.imageName}
              </Form.Label>
              <Form.Control
                size="sm"
                type="file"
                name="imageName"
                value={imageName}
                onChange={loadImage}
              ></Form.Control>
            </Form.Group>
            <div className="mb-3">
              <div className="mb-3">
                <div className="d-flex justify-content-center">
                  <img
                    src={smallImage}
                    alt="Nothing"
                    className="An-Image-That-Is-Not-Bad"
                  />
                </div>
              </div>
              <Button type="submit" className="btn btn-primary">
                Update
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
