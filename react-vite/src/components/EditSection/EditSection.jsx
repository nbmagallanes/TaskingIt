import { useState, useEffect } from "react"
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
    const projectId = urlProjectId ? urlProjectId : section?.project_id
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const [name, setName] = useState(section?.name || '')
    const [newProject, setNewProject] = useState(projectId)
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (Object.values(errors).length) return

        const editedSection = {
            project_id: newProject,
            name
        }

        const response = await dispatch(editSection({editedSection, projectId, sectionId}))

        if (response && !response.errors) {
            closeModal();
        }

        // if (response && response.errors) {
        //     setErrors(response.errors)
        // }
    }

    useEffect(() => {
        const newErrors = {}
        if (!name.length) newErrors.name = 'Name is required'
        else if (name.length < 3) newErrors.name = 'Name must be 3 characters or more'
        else if (name.length > 50) newErrors.name = 'Name must be 50 characters or less'

        setErrors(newErrors)
    }, [name])

    return (
        <div className="edit-section-container">
            <form onSubmit={handleSubmit} className="create-section-form">
                <h1 className="create-section-form-title">Edit Section</h1>
                <div className="edit-section-input">
                    <label>
                        Name
                        <input id='name' 
                            type='text' 
                            value={name} 
                            placeholder="Name this section"
                            onChange={(e) => {setName(e.target.value)}} 
                        />
                    </label>
                    <div className="edit-section-errors-container">
                        <p className="edit-section-errors">{submitted && errors.name}</p>
                    </div>
                    <label>
                        Project
                        <select name='Project' value={newProject} onChange={(e) => {setNewProject(e.target.value)}} >
                            {projects.map(project => (
                                <option value={project.id} key={project.id}>{project.name}</option>
                            ))}
                        </select> 
                    </label>
                </div>
                <div className="create-section-buttons">
                    <button type='submit'>Save</button>    
                    <button type='button' onClick={() => closeModal()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}