import { Link } from "react-router-dom";
import logo from "../../assets/tmod.png";

export const MainHeader = () => {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <img src={logo} alt="lol" width={"10%"} />
          <a className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/art" className="nav-link px-2 text-white">
                Mod Art
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
                  tModBrowser
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link
                      to="/login"
                      className="dropdown-item px-2 text-secondary"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/sign-up"
                      className="dropdown-item px-2 text-white"
                    >
                      Sign-up
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/pricin"
                      className="dropdown-item px-2 text-white"
                    >
                      Mods
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href="/faq" className="nav-link px-2 text-white">
                FAMs
              </a>
            </li>
            <li>
              <a href="/about" className="nav-link px-2 text-white">
                How to morb
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
