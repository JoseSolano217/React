import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToBase64 } from "../../utilidades/funciones/ToBase64";
import { useForm } from "../../utilidades/hooks/useForm";
import { useNavigate } from "react-router-dom";
import { CamisaMarca } from "../../modelos/camisamarca";
import { ARREGLO_PELICULA_GENERO } from "../../utilidades/dominios/dommarca";
import { ARREGLO_TALLA } from "../../utilidades/dominios/domtalla";
import { CAMISA_ARRAY } from "../../mocks/camisa-mock";
import { Camisa } from "../../modelos/camisa";
import { CamisaTalla } from "../../modelos/camisatalla";

export const Crear = () => {
  type formHtml = React.FormEvent<HTMLFormElement>;
  const [inProcess, setInProcess] = useState<boolean>(false);
  const [smallImage, setSmallImage] = useState("../../assets/camisetas/bart.png");
  const [devArray] = useState<CamisaMarca[]>(ARREGLO_PELICULA_GENERO);
  const [tallaArray] = useState<CamisaTalla[]>(ARREGLO_TALLA);
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
      const newCode = CAMISA_ARRAY.length;
      object.codCamisa = newCode;
      object.base64ImagenCamisa = imageBase64;
      CAMISA_ARRAY.push(object);

      setInProcess(false);
      nav("/manage");
    }
  };

  const loadImage = async (e: any) => {
    const theFilesInQuestion = e.target.files;
    const image = theFilesInQuestion[0];
    setSmallImage(URL.createObjectURL(image));
    doubleLink(e);
    const base64 = await ToBase64(image);
    setImageBase64(String(base64));
  };

  let {
    codCamisa,
    marcaCamisa,
    tallaCamisa,
    colorCamisa,
    nombreImagencamisa,
    base64ImagenCamisa,
    doubleLink,
    object,
  } = useForm<Camisa>(new Camisa(0, "", "", "", "", ""));

  return (
    <div className="d-flex justify-content-center" style={{ paddingTop: 20 }}>
      <div className="card" style={{ width: "18rem" }}>
        <Form validated={inProcess} onSubmit={sendForm} noValidate>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "black" }}>
              Crear camisa
            </h5>
            <div className="mb-3">
              <Form.Group controlId="marcaCamisa">
                <Form.Label>
                  <span className="delete">*</span>Marca
                </Form.Label>
                <Form.Select
                  size="sm"
                  required
                  name="marcaCamisa"
                  value={marcaCamisa}
                  onChange={doubleLink}
                >
                  <option value="">Seleccione una marca</option>
                  {devArray.map((devTeam: CamisaMarca) => (
                    <option
                      key={devTeam.codigoMarca}
                      value={devTeam.codigoMarca}
                    >
                      {String(devTeam.codigoMarca + ". " + devTeam.nombreMarca)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className="mb-3">
              <Form.Group controlId="tallaCamisa">
                <Form.Label>
                  <span className="delete">*</span>Talla
                </Form.Label>
                <Form.Select
                  size="sm"
                  required
                  name="tallaCamisa"
                  value={tallaCamisa}
                  onChange={doubleLink}
                >
                  <option value="">Seleccione una talla</option>
                  {tallaArray.map((devTeam: CamisaTalla) => (
                    <option
                      key={devTeam.codigoTalla}
                      value={devTeam.codigoTalla}
                    >
                      {String(devTeam.codigoTalla + ". " + devTeam.nombreTalla)}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group controlId="base64ImagenCamisa">
              <Form.Label>
                <span className="delete">*</span>Imagen Camisa
              </Form.Label>
              <Form.Control
                size="sm"
                required
                type="file"
                name="base64ImagenCamisa"
                value={base64ImagenCamisa}
                onChange={loadImage}
              ></Form.Control>
            </Form.Group>
            <div className="mb-3">
            <Form.Group controlId="colorCamisa">
              <Form.Label>
                <span className="delete">*</span>Color
              </Form.Label>
              <Form.Control size="sm" required type="text" name="colorCamisa" value={colorCamisa} onChange={doubleLink}></Form.Control>
            </Form.Group>
          </div>
            <div className="mb-3">
              <div className="mb-3">
                <div className="d-flex justify-content-center">
                  <img
                    src={smallImage}
                    alt="Nada"
                    className="An-Image-That-Is-Not-Bad"
                  />
                </div>
              </div>
              <Button type="submit" className="btn btn-primary">
                Crear!
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
