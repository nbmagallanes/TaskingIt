import { useState } from "react";
import { useModal } from "../../context/Modal";
import { addSection } from "../../redux/section";
import { useDispatch } from "react-redux";

export default function CreateSection({projectId}) {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newSection = {
            project_id: projectId,
            name
        }

        const response = await dispatch(addSection(newSection))

        if (response) {
            closeModal();
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
                <button type='submit'>Add section</button>    
                <button type='button' onClick={() => closeModal()}>Cancel</button>
            </form>
        </div>
    )
}