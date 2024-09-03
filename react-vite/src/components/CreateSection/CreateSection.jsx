import { useEffect, useState } from "react";
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

        if (Object.values(errors).length) return

        const newSection = {
            project_id: projectId,
            name
        }

        const response = await dispatch(addSection(newSection))

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
        <div className="create-section-container">
            <form onSubmit={handleSubmit} className="create-section-form">
                <h1 className="create-section-form-title">Create Section</h1>
                <div className="create-section-input">
                    <label>
                        Name
                        <input id='name' 
                            type='text' 
                            value={name} 
                            placeholder="Enter a name for this section..."
                            onChange={(e) => {setName(e.target.value)}} 
                        />
                    </label>
                    <div className="create-section-errors-container">
                        <p className="create-section-errors">{submitted && errors.name}</p>
                    </div>
                </div>
                <div className="create-section-buttons">
                    <button type='submit'>Add section</button>    
                    <button type='button' onClick={() => closeModal()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}