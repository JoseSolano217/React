import { useState } from "react";
import { Camisa } from "../../modelos/camisa";
import { CAMISA_ARRAY } from "../../mocks/camisa-mock";
import { ARREGLO_TALLA } from "../../utilidades/dominios/domtalla";
import { ARREGLO_PELICULA_GENERO } from "../../utilidades/dominios/dommarca";
import { Modl } from "../contenedores/Modl";
import { CamisaTalla } from "../../modelos/camisatalla";
import { CamisaMarca } from "../../modelos/camisamarca";

export const Listar = () => {
  const [arrayEquip] = useState<CamisaTalla[]>(ARREGLO_TALLA);
  const [arrayDevs] = useState<CamisaMarca[]>(ARREGLO_PELICULA_GENERO);
  const [arrayCamisa] = useState<Camisa[]>(CAMISA_ARRAY);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [camObj, setCamObj] = useState<Camisa>(
    new Camisa(0, "", "", "", "", "")
  );

  const obtenerMarca = (dev: string) => {
    for (let index = 0; index < arrayDevs.length; index++) {
      if (dev === String(arrayDevs[index].codigoMarca)) {
        return(arrayDevs[index].nombreMarca);
      }
    };
    return("Oh the missery"); 
  }

  const obtenerTalla = (dev: string) => {
    for (let index = 0; index < arrayEquip.length; index++) {
      if (dev === String(arrayEquip[index].codigoTalla)) {
        return(arrayEquip[index].nombreTalla);
      }
    };
    return("Oh the missery"); 
  }

  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-dark table-hover caption-top">
          <caption>Lista de camisas</caption>
          <thead>
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Marca</th>
              <th scope="col">Talla</th>
            </tr>
          </thead>
          <tbody>
            {arrayCamisa.map((laCamisa: Camisa, index: number) => (
              <tr key={laCamisa.codCamisa}>
                <td width={"15%"}>
                  {laCamisa.base64ImagenCamisa !== "" ? (
                    <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalShow(true);
                        setCamObj(laCamisa);
                      }}
                    >
                      <img
                        src={laCamisa.base64ImagenCamisa}
                        alt="Meaningful text"
                        width={"100%"}
                      ></img>
                    </a>
                  ) : (
                    <div>Meaningful text</div>
                  )}
                </td>
                <td>
                  <span>
                    {obtenerMarca(laCamisa.marcaCamisa)}
                  </span>
                </td>
                <td>{obtenerTalla(laCamisa.tallaCamisa)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modl
          show={modalShow}
          onHide={() => setModalShow(false)}
          obj={camObj}
        />
      </div>
    </div>
  );
};
