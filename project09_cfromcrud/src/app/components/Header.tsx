import { Link } from "react-router-dom";
import logo from "../../assets/tmod.png";

export const Header = () => {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <img src={logo} alt="lol" width={"10%"} />

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/catalogue" className="nav-link px-2 text-white">
                Catalogue
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
                      Create a Mod
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage"
                      className="dropdown-item px-2 text-white"
                    >
                      Manage mods
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
};
