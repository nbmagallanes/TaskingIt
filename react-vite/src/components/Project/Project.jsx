import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { getProject } from '../../redux/project';
// import { getProjectSections } from '../../redux/section';
import Section from '../Section/Section';
import OpenModalButton from '../OpenModalButton';
import CreateSection from '../CreateSection/CreateSection';
// import { getProjectTasks } from '../../redux/task';
import CreateTask from '../CreateTask/CreateTask';
import ListViewTask from '../ListViewTask/ListViewTask';
import { FiPlus } from "react-icons/fi";
import './Project.css'

export default function Project() {
    const { projectId } = useParams();
    const project = useSelector((state) => state.projectState.projects[projectId])
    const sectionsObj = useSelector((state) => state.sectionState.sections)
    const sections = Object.values(sectionsObj).filter(section => section.project_id === +projectId)
    const tasks = useSelector((state) => state.taskState.tasks)
    const unsectionedTasks = Object.values(tasks).filter(task => task.section_id === null && task.project_id === +projectId)

    const [openMenu, setOpenMenu] = useState(null);
    // const dispatch = useDispatch();
    const lastSectonId = sections[sections.length - 1]?.id

    // useEffect(() => {
    //     dispatch(getProject(projectId))
    //     dispatch(getProjectSections(projectId))
    //     dispatch(getProjectTasks(projectId))
    // }, [projectId])

    useEffect(() => {
        if (project.id !== +projectId)
            return <div>Loading...</div>
    }, [projectId])

    return (
        <div className='project-container'>
            <h1 className='project-page-title'>{project.name}</h1>
            {unsectionedTasks ? (
                <div className='project-unsectioned-task-container'>
                    {unsectionedTasks.map(task => (
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
            {sections.length ? <div className='project-add-section-disabled'></div> : null}
            {sections.length ? (
                <div className='project-section-container'>
                    {sections.map(section => (
                        <div key={section.id}>
                            <Section 
                                key={section.id} 
                                section={section} 
                                projectView={true} 
                                openMenu={openMenu}
                                setOpenMenu={setOpenMenu}
                            />
                            {/* <OpenModalButton 
                                buttonText={
                                    <span className='add-task-button-span'>
                                        <FiPlus className='add-task-button-icon' />
                                        Add Task
                                    </span>
                                }
                                modalComponent={<CreateTask/>}
                                className='add-task-button'
                            /> */}
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
            ) : (
                <div className='project-add-section-active'>
                    <OpenModalButton 
                        buttonText='Add Section'
                        modalComponent={<CreateSection projectId={projectId}/>}
                    />
                </div>
            )}
        </div>
    )
}