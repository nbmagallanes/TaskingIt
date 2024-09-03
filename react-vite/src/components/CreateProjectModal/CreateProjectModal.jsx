import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/project';
import { useModal } from "../../context/Modal";
import './CreateProjectModal.css'
import { useNavigate } from 'react-router-dom';

export default function CreateProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('Grey');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (Object.values(errors).length) return

        const newProject = {
            name,
            description,
            color
        }

        const response = await dispatch(addProject(newProject))

        if (response && !response.errors) {
            setName('');
            setDescription('');
            setColor('');
            closeModal();
            navigate(`/${response.user_id}/projects/${response.id}`)
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
        if (!description.length) newErrors.description = 'Description is required'
        else if (description.length > 200) newErrors.description = 'Description must be 200 characters or less'

        setErrors(newErrors)
    }, [name, description])

    return (
        <div className='edit-section-container'>
            <form onSubmit={handleSubmit} className='create-section-form'>
                <h1 className='create-section-form-title'>Add Project</h1>
                <div className='edit-section-input'>
                    <label>
                        Name*
                        <input id='name' 
                            type='text' 
                            value={name} 
                            onChange={(e) => {setName(e.target.value)}} 
                        />
                    </label>
                    <div className='create-project-errors-container'>
                        <p className="create-project-errors">{submitted && errors.name}</p>
                    </div>
                    <label>
                        Description*
                        <input id='description' 
                            type='text' 
                            value={description} 
                            onChange={(e) => {setDescription(e.target.value)}}
                        />
                    </label>
                    <div className='create-project-errors-container'>
                        <p className="create-project-errors">{submitted && errors.description}</p>
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
                    <button type='submit'>Add</button>      
                </div>
            </form>
        </div>
    )
}