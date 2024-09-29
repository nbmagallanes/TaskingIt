import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editProject } from '../../redux/project';
import { useModal } from "../../context/Modal";
import './EditProjectModal.css'

export default function EditProjectModal({projectId}) {
    const project = useSelector((state) => state.projectState.projects[projectId])
    const [name, setName] = useState('');
    const [color, setColor] = useState('Grey');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (Object.values(errors).length) return

        const editedProject = {
            name,
            color
        }

        const response = await dispatch(editProject({editedProject, projectId}))

        if (response && !response.errors) {
            closeModal();
        }

        // if (response && response.errors) {
        //     setErrors(response.errors)
        // }
    }

    useEffect(() => {
        if (project) {
            setName(project.name || '')
            setColor(project.color || 'Grey')
        }
    }, [project])

    useEffect(() => {
        const newErrors = {}
        if (!name.length) newErrors.name = 'Name is required'
        else if (name.length < 3) newErrors.name = 'Name must be 3 characters or more'
        else if (name.length > 50) newErrors.name = 'Name must be 50 characters or less'

        setErrors(newErrors)
    }, [name])


    return (
        <div className='edit-section-container'>
            <form onSubmit={handleSubmit} className='create-section-form'>
                <h1 className='create-section-form-title'>Edit Project</h1>
                <div className='edit-section-input'>
                    <label>
                        Name
                        <input id='name' 
                            type='text' 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}} 
                        />
                    </label>
                    <div className='edit-project-errors-container'>
                        <p className="edit-project-errors">{submitted && errors.name}</p>
                    </div>
                    <label>
                        Color
                        <select name='Color' value={color} onChange={(e) => {setColor(e.target.value)}} >
                            <option value='Grey'>Grey</option>
                            <option value='Pink'>Pink</option>
                            <option value='Blue'>Blue</option>
                            <option value='Purple'>Purple</option>
                        </select> 
                    </label>
                </div>
                <div className='create-section-buttons'>
                    <button type='button' onClick={() => closeModal()}>Cancel</button>
                    <button type='submit'>Save</button>      
                </div>
            </form>
        </div>
    )
}