import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { removeSection } from "../../redux/section";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";

export default function DeleteSection({sectionId}) {
    const section = useSelector((state) => state.sectionState.sections[sectionId])
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const { urlProjectId } = useParams();
    const projectId = urlProjectId ? urlProjectId : section.project_id

    const handleDeleteSection = async (e) => {
        e.preventDefault();
        closeModal();
        await dispatch(removeSection({projectId, sectionId}))
    }

    return (
        <div>
            <h1> Delete section </h1>
            <p>Are you sure you want to delete {section.name} with its tasks?</p>
            <div className="create-task-buttons">
                <button onClick={() => closeModal()}>Cancel</button>
                <button onClick={handleDeleteSection}>Delete</button>
            </div>
        </div>
    )
}