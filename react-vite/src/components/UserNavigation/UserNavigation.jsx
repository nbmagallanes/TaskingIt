// import { NavLink } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import ProjectOptionsButton from "./ProjectOptionsButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProjects } from "../../redux/project";
import OpenModalButton from '../OpenModalButton'
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";
import CreateTask from '../CreateTask/CreateTask'
import { GoInbox } from "react-icons/go";
import { MdOutlineCalendarToday, MdOutlineCalendarMonth } from "react-icons/md";
import { HiHashtag } from "react-icons/hi2";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "./UserNavigation.css";

function UserNavigation() {
  const user = useSelector((state) => state.session.user);
  const projectsObj = useSelector((state) => state.projectState.projects)
  const projects = Object.values(projectsObj)
  const [openMenu, setOpenMenu] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenMenu = (projectId) => {
    setOpenMenu(openMenu === projectId ? null : projectId);
  };

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
  }, [user.id])
  
  return (
    <div className="usernav-container">
        <div>
            <div className="profile-dropdown-container">
                <ProfileButton />
            </div>
            <div className="usernav-tab add-task" style={{padding: '3px 7px', margin: '4px 0px'}}>
                <OpenModalButton
                    buttonText={
                        <span style={{ display: 'flex', alignItems: 'center', color: '#7B66A7', fontWeight: '600', gap: '10px'}}>
                            <BsFillPlusCircleFill style={{ fontSize: '24px', color: '#A492CC' }} />
                            Add Task
                        </span>
                    }
                    modalComponent={<CreateTask />}
                />
            </div>
            <NavLink to={`/${user?.id}/inbox`} className="usernav-tab inbox">
                <GoInbox style={{ fontSize: '18px' }}/>
                <p>Inbox</p>
            </NavLink>
            <NavLink to={`/${user?.id}/today`} className="usernav-tab today">
                <MdOutlineCalendarToday style={{ fontSize: '18px' }}/>
                <p>Today</p>
            </NavLink>
            <NavLink to={`/${user?.id}/upcoming`} className="usernav-tab upcoming">
                <MdOutlineCalendarMonth style={{ fontSize: '20px' }}/>
                <p>Upcoming</p>
            </NavLink>
        </div>
        <div className="usernav-project-container">
            <div className="usernav-tab my-projects-container">
                <NavLink className="my-projects" style={{gap: '0px'}}>
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
                        <div key={project.id} className="usernav-tab single-project-container" style={{gap: '0px'}}>
                            <NavLink to={`/${user?.id}/projects/${project.id}`} className="usernav-tab-project">
                                <HiHashtag style={{color:`${project.color}`, fontSize: '16px'}}/>
                                {project.name}
                            </NavLink>
                            <div className="tooltip tooltip-list">
                                <ProjectOptionsButton projectId={project.id} 
                                    isOpen={openMenu === project.id}
                                    onToggleMenu={() => handleOpenMenu(project.id)}
                                />
                                <p className="tooltiptext tooltiptext-list">More project actions</p>
                            </div>
                        </div>

                    ): null
                ))}
            </div>
        </div>
    </div>
  );
}

export default UserNavigation;
