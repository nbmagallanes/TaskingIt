import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../redux/project';
import { getProjectSections } from '../../redux/section';
import Section from '../Section/Section';
import OpenModalButton from '../OpenModalButton';
import CreateSection from '../CreateSection/CreateSection';
import { getProjectTasks } from '../../redux/task';
import CreateTask from '../CreateTask/CreateTask';
import ListViewTask from '../ListViewTask/ListViewTask';
import { FiPlus } from "react-icons/fi";
import './Project.css'

export default function Project() {
    const project = useSelector((state) => state.projectState.project)
    const sectionsObj = useSelector((state) => state.sectionState.sections)
    const sections = Object.values(sectionsObj)
    const tasks = useSelector((state) => state.taskState.tasks)
    const unsectionTasks = Object.values(tasks).filter(task => task.section_id === null )
    const [openMenu, setOpenMenu] = useState(null);
    const dispatch = useDispatch();
    const { projectId } = useParams();
    const lastSectonId = sections[sections.length - 1]?.id

    useEffect(() => {
        dispatch(getProject(projectId))
        dispatch(getProjectSections(projectId))
        dispatch(getProjectTasks(projectId))
    }, [projectId])

    return (
        <div className='project-container'>
            <h1 className='project-page-title'>{project.name}</h1>
            {unsectionTasks ? (
                <div className='project-unsectioned-task-container'>
                    {unsectionTasks.map(task => (
                        <ListViewTask key={task.id} task={task} projectView={true}/>
                    ))}
                </div>
            ) : null }
            <OpenModalButton 
                buttonText={
                    <span className='add-task-button-span'>
                        <FiPlus className='add-task-button-icon' />
                        Add Task
                    </span>
                }
                modalComponent={<CreateTask/>}
                className='add-task-button'
            />
            <div className='project-add-section-disabled'></div>
            {sections.length ? (
                <div className='project-section-container'>
                    {sections.map(section => (
                        <div key={section.id}>
                            <Section 
                                key={section.id} 
                                section={section} 
                                projectView={true} 
                                openMenu={openMenu}
                                setOpenMenu={setOpenMenu}/>
                            <OpenModalButton 
                                buttonText={
                                    <span className='add-task-button-span'>
                                        <FiPlus className='add-task-button-icon' />
                                        Add Task
                                    </span>
                                }
                                modalComponent={<CreateTask/>}
                                className='add-task-button'
                            />
                            {lastSectonId === section.id ? (
                                <div className='project-add-section-active'>
                                    <OpenModalButton 
                                        buttonText='Add Section'
                                        modalComponent={<CreateSection projectId={projectId}/>}
                                    />
                                </div>
                            ) : <div className='project-add-section-disabled'></div>}
                        </div>
                    ))}
                </div> 
            ) : null }
        </div>
    )
}