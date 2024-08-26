import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <div>
        <OpenModalMenuItem
          itemText="Log In"
          // onItemClick={closeMenu}
          modalComponent={<LoginFormModal />}
        />
      </div>
      <div>
        <OpenModalMenuItem
          itemText="Sign Up"
          // onItemClick={closeMenu}
          modalComponent={<SignupFormModal />}
        />
      </div>
    </ul>
  );
}

export default Navigation;
