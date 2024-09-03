import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditTask from "../EditTask/EditTask";
import DeleteTask from "../DeleteTask/DeleteTask"
import { FiEdit3, FiTrash } from "react-icons/fi";
import './ListViewTask.css'

export default function ListViewTask({task, projectView}) {
    const projectsObj = useSelector(state => state.projectState.projects)
    const projects = Object.values(projectsObj)

    const getTaskProject = (projectId, sectionId) => {
        if (projectId && sectionId) {
          const project = projects.find(project => project.id === projectId)
          const section = project?.sections.find(section => section.id === sectionId)
          return `${project?.name} / ${section?.name} #`
        } else {
          const project = projects.find(project => project.id === projectId)
          return `${project?.name} #`
        }
    }

    return (
        <div key={task.id} className="list-task">
            <div className="list-task-button-container">
                <button className="list-task-button"></button>
            </div>
            <div className="list-task-info">
            <div className="list-task-top">
                <p className="list-task-title">{task.title}</p>
                <div className="list-task-option-buttons">
                    <OpenModalButton
                        buttonText={ <FiEdit3 style={{ padding: '2px 2px 0px 2px', strokeWidth: 1 }} /> }
                        modalComponent={<EditTask taskId={task.id}/>}
                    />
                    <OpenModalButton
                        buttonText={ <FiTrash style={{ padding: '2px 2px 0px 2px', strokeWidth: 1 }} /> }
                        modalComponent={<DeleteTask task={task}/>}
                    />
                </div>
            </div>
            {task.description ? 
                <div className="list-task-description-container">
                    <p className="list-task-description">{task.description}</p>
                </div> 
            : null}
            <div className="list-task-info-bottom" style={task.due_time ? {justifyContent: 'space-between'} : {justifyContent: 'flex-end'}}>
                {task.due_time ? (task.duration ? <p className="list-task-due-time">{`${task.due_time}-${task.end_time}`}</p> : <p className="list-task-due-time">{task.due_time}</p>)
                : null}
                {projectView ? null : <p className="list-task-project">{getTaskProject(task.project_id, task.section_id)}</p>}
            </div>
            </div>
        </div>
    )
}