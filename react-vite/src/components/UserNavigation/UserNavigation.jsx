// import { NavLink } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProjects } from "../../redux/project";
import "./UserNavigation.css";
import OpenModalButton from '../OpenModalButton'
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";
import EditProjectModal from "../EditProjectModal/EditProjectModal";
import DeleteProject from "../DeleteProject/DeleteProject";

function UserNavigation() {
  const user = useSelector((state) => state.session.user);
  const projectsObj = useSelector((state) => state.projectState.projects)
  const projects = Object.values(projectsObj)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddProject = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    if (user) {
        dispatch(getUserProjects(user.id))
    } else {
        navigate('/')
    }
  }, [user])
  
  return (
    <div className="usernav-container">
        <div className="usernav-tab">
            <ProfileButton />
        </div>
        <div className="usernav-tab add-task">
            <p>+</p>
            <p>Add task</p>
        </div>
        <NavLink to={`/${user?.id}/inbox`} className="usernav-tab inbox">
            <p>icon</p>
            <p>Inbox</p>
        </NavLink>
        <NavLink to={`/${user?.id}/today`} className="usernav-tab today">
            <p>icon</p>
            <p>Today</p>
        </NavLink>
        <NavLink to={`/${user?.id}/upcoming`} className="usernav-tab upcoming">
            <p>icon</p>
            <p>Upcoming</p>
        </NavLink>
        <div className="usernav-project-container">
            <div className="usernav-tab my-projects-container">
                <NavLink to={`/${user?.id}/projects`} className="my-projects">
                    My Projects
                </NavLink>
                <div className="tooltip">
                    <OpenModalButton
                        buttonText='+'
                        modalComponent={<CreateProjectModal />}
                        onClick={handleAddProject}
                        className='usernav-add-project'
                    />
                    <p className="tooltiptext">Add a project</p>
                </div>
            </div>
            <div className="usernav-project-list">
                {projects.map( project => (
                    project.name !== 'Inbox' ? (
                        <div key={project.id} className="usernav-tab single-project-container">
                            <NavLink to={`/${user?.id}/projects/${project.id}`} className="my-projects">{project.name}</NavLink>
                            <div className="tooltip tooltip-list">
                                <OpenModalButton
                                    buttonText='...'
                                    modalComponent={<EditProjectModal projectId={project.id}/>}
                                    onClick={handleAddProject}
                                    className='usernav-add-project' //need to change
                                />
                                <p className="tooltiptext tooltiptext-list">More project actions</p>
                            </div>
                            <OpenModalButton
                                buttonText='d'
                                modalComponent={<DeleteProject projectId={project.id}/>}
                                onClick={handleAddProject}
                                className='usernav-add-project' //need to change
                            />
                        </div>

                    ): null
                ))}
            </div>
        </div>
    </div>
  );
}

export default UserNavigation;
