import { NavLink } from "react-router-dom";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import logo from '../../../images/taskingIt-logo.png'
import nameLogo from '../../../images/taskingIt-name.png'
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">
      <NavLink className="nav-logo-container" to="/">
        <img className="nav-logo" src={logo}/>
        <img className="nav-name-logo" src={nameLogo}/>
      </NavLink>
      <div className="session-buttons">
        <NavLink className="log-in" to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    </div>

    // <ul>
    //   <li>
    //     <NavLink to="/">Home</NavLink>
    //   </li>

    //   <div>
    //     <OpenModalMenuItem
    //       itemText="Log In"
    //       // onItemClick={closeMenu}
    //       modalComponent={<LoginFormModal />}
    //     />
    //   </div>
    //   <div>
    //     <OpenModalMenuItem
    //       itemText="Sign Up"
    //       // onItemClick={closeMenu}
    //       modalComponent={<SignupFormModal />}
    //     />
    //   </div>
    // </ul>
  );
}

export default Navigation;
