import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editProject } from '../../redux/project';
import { useModal } from "../../context/Modal";
import './EditProjectModal.css'

export default function EditProjectModal({projectId}) {
    const project = useSelector((state) => state.projectState.projects[projectId])
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('Grey');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const editedProject = {
            name,
            description,
            color
        }

        const response = await dispatch(editProject({editedProject, projectId}))
        console.log('this is the response', response)

        if (response && !response.errors) {
            closeModal();
        }

        if (response && response.errors) {
            setErrors(response.errors)
        }
    }

    useEffect(() => {
        if (project) {
            setName(project.name || '')
            setDescription(project.description || '')
            setColor(project.color || 'Grey')
        }
    }, [project])


    return (
        <div>
            <h1>Edit Project</h1>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input id='name' 
                    type='text' 
                    value={name} 
                    onChange={(e) => {setName(e.target.value)}} 
                />
                <div className='edit-project-errors-container'>
                    <p className="edit-project-errors">{submitted && errors.name}</p>
                </div>
                <p>Description</p>
                <input id='description' 
                    type='text' 
                    value={description} 
                    onChange={(e) => {setDescription(e.target.value)}} 
                />
                <div className='edit-project-errors-container'>
                    <p className="edit-project-errors">{submitted && errors.description}</p>
                </div>
                <p>Color</p>
                <select name='Color' value={color} onChange={(e) => {setColor(e.target.value)}} >
                    <option value='Grey'>Grey</option>
                    <option value='Pink'>Pink</option>
                    <option value='Blue'>Blue</option>
                    <option value='Purple'>Purple</option>
                </select> 
                <button type='button' onClick={() => closeModal()}>Cancel</button>
                <button type='submit'>Save</button>      
            </form>
        </div>
    )
}