import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editSection } from "../../redux/section"
import { useParams } from "react-router-dom"
import { useModal } from "../../context/Modal"
import './EditSection.css'

export default function EditSection({sectionId}) {
    const projectsObj = useSelector((state) => state.projectState.projects)
    const projects = Object.values(projectsObj)
    const section = useSelector((state) => state.sectionState.sections[sectionId])
    const { projectId } = useParams()
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const [name, setName] = useState(section.name || '')
    const [newProject, setNewProject] = useState(projectId)
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const editedSection = {
            project_id: newProject,
            name
        }

        const response = await dispatch(editSection({editedSection, projectId, sectionId}))

        if (response && !response.errors) {
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