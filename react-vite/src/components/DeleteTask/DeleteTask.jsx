import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { removeTask } from "../../redux/task";

export default function DeleteTask({task}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDeleteTask = async (e) => {
        e.preventDefault();
        closeModal();
        await dispatch(removeTask(task.id))
    }
    return (
        <div>
            <p>Are you sure you want to delete {task.title}?</p>
            <div className="create-task-buttons">
                <button type='button' onClick={() => closeModal()}>Cancel</button>
                <button type='submit' onClick={handleDeleteTask}>Delete</button>  
            </div>
        </div>
    )
}