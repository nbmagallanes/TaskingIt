// import { NavLink } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import "./UserNavigation.css";

function UserNavigation() {
  const user = useSelector((state) => state.session.user);
  
  return (
    <div className="usernav-container">
        <div>
            <ProfileButton />
        </div>
        <div className="usernav-tab add-task">
            <p>+</p>
            <p>Add task</p>
        </div>
        <NavLink to={`${user.id}/inbox`} className="usernav-tab inbox">
            <p>icon</p>
            <p>Inbox</p>
        </NavLink>
        <NavLink to={`${user.id}/today`} className="usernav-tab today">
            <p>icon</p>
            <p>Today</p>
        </NavLink>
        <NavLink to={`${user.id}/upcoming`} className="usernav-tab upcoming">
            <p>icon</p>
            <p>Upcoming</p>
        </NavLink>
        <NavLink to={`${user.id}/projects`} className="usernav-tab projects">
            <p>My Projects</p>
            <p>+</p>
            <p>arrow</p>
        </NavLink>
    </div>
  );
}

export default UserNavigation;
