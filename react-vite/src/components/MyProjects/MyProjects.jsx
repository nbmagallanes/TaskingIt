import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HiHashtag } from "react-icons/hi2";

import './MyProjects.css'
import { useState } from 'react';

export default function MyProjects() {
  const [searchWord, setSearchWord] = useState('');

  const user = useSelector((state) => state.session.user);
  const projectsObj = useSelector((state) => state.projectState.projects)
  const projects = Object.values(projectsObj).filter(project => project.name.toLowerCase().includes(searchWord.toLowerCase()))
  console.log(projects)



  return (
    <div className='my-projects-page-container'>
      <h1 className='my-projects-title'>My Projects</h1>

      <div>
        <input
          className="my-projects-search"
          type="text"
          placeholder="Search projects"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </div>
      <div className='my-projects-divider'></div>
      <div>
        <p className='my-projects-count'>{searchWord.length === 0 ? `${projects.length - 1} projects` : `${projects.length} projects`}</p>
          {projects.map( project => (
              project.name !== 'Inbox' ? (
                  <div key={project.id} className='my-projects-project-list'>
                      <NavLink to={`/${user?.id}/projects/${project.id}`}>
                          <HiHashtag style={{color:`${project.color}`, fontSize: '16px'}}/>
                          {project.name}
                      </NavLink>
                  </div>

              ): null
          ))}
      </div>
    </div>
  );
}