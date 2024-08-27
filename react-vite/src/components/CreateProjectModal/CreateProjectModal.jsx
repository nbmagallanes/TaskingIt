import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProject } from '../../redux/project';
import { useModal } from "../../context/Modal";
import './CreateProjectModal.css'
import { useNavigate } from 'react-router-dom';

export default function CreateProjectModal() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('Grey');
    // const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProject = {
            name,
            description,
            color
        }

        const response = await dispatch(addProject(newProject))
        console.log(response)

        if (response) {
            setName('');
            setDescription('');
            setColor('');
            closeModal();
            navigate(`/${response.user_id}/projects/${response.id}`)
        }
    }


    return (
        <div>
            <h1>Add Project</h1>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input id='name' 
                    type='text' 
                    value={name} 
                    onChange={(e) => {setName(e.target.value)}} 
                />
                <p>Description</p>
                <input id='description' 
                    type='text' 
                    value={description} 
                    onChange={(e) => {setDescription(e.target.value)}} 
                />
                <p>Color</p>
                <select name='Color' value={color} onChange={(e) => {setColor(e.target.value)}} >
                    <option value='Grey'>Grey</option>
                    <option value='Pink'>Pink</option>
                    <option value='Blue'>Blue</option>
                    <option value='Purple'>Purple</option>
                </select> 
                <button type='button' onClick={() => closeModal()}>Cancel</button>
                <button type='submit'>Add</button>      
            </form>
        </div>
    )
}