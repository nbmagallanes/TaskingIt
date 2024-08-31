import { useState } from "react";
import { useModal } from "../../context/Modal";
import { addSection } from "../../redux/section";
import { useDispatch } from "react-redux";
import './CreateSection.css'

export default function CreateSection({projectId}) {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const newSection = {
            project_id: projectId,
            name
        }

        const response = await dispatch(addSection(newSection))

        if (response && !response.errors) {
            closeModal();
        }

        if (response && response.errors) {
            setErrors(response.errors)
        }
    }
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
                <div className="create-section-errors-container">
                    <p className="create-section-errors">{submitted && errors.name}</p>
                </div>
                <button type='submit'>Add section</button>    
                <button type='button' onClick={() => closeModal()}>Cancel</button>
            </form>
        </div>
    )
}