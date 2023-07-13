import { Link } from "react-router-dom";

export const Cabecera = () => {
    return (
<header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <img src={"../../assets/tmod.png"} alt="lol" width={"10%"} />

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/catalogue" className="nav-link px-2 text-white">
                Catalogo
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link to="/create" className="nav-link px-2 text-white">
                      Crear camisa nueva
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage"
                      className="dropdown-item px-2 text-white"
                    >
                      Manejar camisas
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
    );
}