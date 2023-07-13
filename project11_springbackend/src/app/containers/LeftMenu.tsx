import { Link } from "react-router-dom";
import { adminOptions, guestOptions } from "../utils/doms/SystemOptions";
import Logo from "../../assets/images/tmod.png";

export const LeftMenu = () => {
  const profileName:string = "Admin";

  let options: any[] = [];

  switch (profileName) {
    case "Admin":
      options = adminOptions;
      break;
    case "Guest":
      options = guestOptions;
      break;
    default:
      console.log("No menu");
      break;
  }
  options = adminOptions;
  return (
    <aside id="sidebar" className="sidebar">
      <Link
        to="/home/welcum"
        className="d-flex align-items-center pb-3 mb-3 link-dark border-bottom"
      >
        <img src={Logo} alt="noLogo" className="bi pe-none me-2" width={"45%"}/>
        <div>
          <span className="fs-5 fw-semibold">{profileName}</span>
        </div>
      </Link>

      <ul className="sidebar-nav" id="sidebar-nav">
        {options.map((option, index) =>
          option.sons.length ? (
            <li className="nav-item" key={"li" + index}>
              <a
                className="nav-link collapsed"
                data-bs-target={"#menu" + index}
                data-bs-toggle="collapse"
                href="/#"
              >
                <i className={option.icon}></i>
                <span>{option.name}</span>
                <i className="bi bi-chevron-down ms-auto"></i>
              </a>
              <ul
                id={"menu" + index}
                className="nav-content collapse "
                data-bs-parent="#sidebar-nav"
              >
                {option.sons.map((subMenu: any, otherIndex: number) => (
                  <li key={"sub" + otherIndex}>
                    <Link to={subMenu.route}>
                      <i className={subMenu.icon}></i>
                      <span>{subMenu.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li className="nav-item" key={index}>
              <Link to={option.route} className="nav-link collapsed">
                <i className={option.icon}></i>
                <span>{option.name}</span>
              </Link>
            </li>
          )
        )}
      </ul>
    </aside>
  );
};
