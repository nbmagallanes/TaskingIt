import { useSelector } from 'react-redux'
import DeleteSection from '../DeleteSection/DeleteSection'
import EditSection from '../EditSection/EditSection'
import OpenModalButton from '../OpenModalButton'
import CreateTask from '../CreateTask/CreateTask'
import EditTask from '../EditTask/EditTask'
import DeleteTask from '../DeleteTask/DeleteTask'
import './Section.css'

export default function Section({section}) {
    const tasksObj = useSelector(state => state.taskState.tasks)
    const tasks = Object.values(tasksObj).filter(task => task.section_id === section.id)
   
    return (
        <div>
            <div>
                <h3>{section.name}</h3>
                <OpenModalButton 
                    buttonText='Delete Section'
                    modalComponent={<DeleteSection sectionId={section.id}/>}
                />
                <OpenModalButton 
                    buttonText='Edit Section'
                    modalComponent={<EditSection sectionId={section.id}/>}
                />
                <OpenModalButton 
                    buttonText='Add Task'
                    modalComponent={<CreateTask sectionId={section.id}/>}
                />
            </div>
            {tasks.length ? (
                <div className='section-task-container'>
                    {tasks.map(task => (
                        <div key={task.id} className='section-single-task'>
                            <p>{task.title}</p>
                            <div>
                                <OpenModalButton 
                                    buttonText='Edit Task'
                                    modalComponent={<EditTask taskId={task.id}/>}
                                />
                                <OpenModalButton 
                                    buttonText='Delete Task'
                                    modalComponent={<DeleteTask task={task}/>}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ): null }
        </div>
    )
}