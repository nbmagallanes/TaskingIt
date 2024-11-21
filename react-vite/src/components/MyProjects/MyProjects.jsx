import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HiHashtag } from "react-icons/hi2";

import './MyProjects.css'

export default function MyProjects() {
  const user = useSelector((state) => state.session.user);
  const projectsObj = useSelector((state) => state.projectState.projects)
  const projects = Object.values(projectsObj)

    return (
      <>
        <h1>My Projects</h1>

        <div>
          <p>{`${projects.length-1} projects `}</p>
        </div>
        <div>
                {projects.map( project => (
                    project.name !== 'Inbox' ? (
                        <div key={project.id}>
                            <NavLink to={`/${user?.id}/projects/${project.id}`}>
                                <HiHashtag style={{color:`${project.color}`, fontSize: '16px'}}/>
                                {project.name}
                            </NavLink>
                        </div>

                    ): null
                ))}
            </div>
      </>
    );
  }