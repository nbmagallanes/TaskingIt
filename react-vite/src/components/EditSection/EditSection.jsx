import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editSection } from "../../redux/section"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
// import { editTask } from "../../redux/task"
import './EditSection.css'

export default function EditSection({sectionId}) {
    const projectsObj = useSelector((state) => state.projectState.projects)
    const projects = Object.values(projectsObj)
    const section = useSelector((state) => state.sectionState.sections[sectionId])
    // const tasksObj = useSelector((state) => state.taskState.tasks)
    // const tasks = Object.values(tasksObj).filter(task => task.section_id === sectionId)
    const { urlProjectId } = useParams()
    const projectId = urlProjectId ? urlProjectId : section.project_id
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const [name, setName] = useState(section?.name || '')
    const [newProject, setNewProject] = useState(projectId)
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // const convertTime = (timeStr) => {
    //     const [time, abbreviation] = timeStr.split(' ');
    //     const [hours, minutes] = time.split(':')
        
    //     if (abbreviation == 'PM' && hours !== '12') return `${parseInt(hours) + 12}:${minutes}`
    //     else if (abbreviation == 'AM' && hours == '12') return `00:${minutes}`
    //     else return `${hours}:${minutes}`
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const editedSection = {
            project_id: newProject,
            name
        }

        const response = await dispatch(editSection({editedSection, projectId, sectionId}))

        if (response && !response.errors) {

            // tasks.forEach(async (task) => {
            //     const refactoredTask = Object.keys(task).reduce((acc, key) => {
            //         acc[key] = task[key] === null ? '' : task[key];

            //         if (key === 'due_time' && task[key]) acc[key] = convertTime(task[key])

            //         return acc
            //     }, {})

            //     const updatedTask = {...refactoredTask, project_id: newProject}
            //     const taskRes = await dispatch(editTask({editedTask: updatedTask, taskId: parseInt(task.id)}))
            //     if (taskRes.errors) return task.errors
            // })

            closeModal();
        }

        if (response && response.errors) {
            setErrors(response.errors)
        }
    }

    // useEffect(() => {
    //     dispatch(getSection({projectId, sectionId}))
    //     setName(section.name || '')
    // }, [dispatch, section.name])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input id='name' 
                    type='text' 
                    value={name} 
                    placeholder="Name this section"
                    onChange={(e) => {setName(e.target.value)}} 
                />
                <div className="edit-section-errors-container">
                    <p className="edit-section-errors">{submitted && errors.name}</p>
                </div>
                <p>Project</p>
                <select name='Project' value={newProject} onChange={(e) => {setNewProject(e.target.value)}} >
                    {projects.map(project => (
                        <option value={project.id} key={project.id}>{project.name}</option>
                    ))}
                </select> 
                <button type='submit'>Save</button>    
                <button type='button' onClick={() => closeModal()}>Cancel</button>
            </form>
        </div>
    )
}