import { useDispatch, useSelector } from 'react-redux'
import { removeProject } from '../../redux/project';
import { useModal } from '../../context/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import './DeleteProject'

export default function DeleteProject({projectId}) {
    const project = useSelector((state) => state.projectState.projects[projectId])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();
    const { userId } = useParams();

    const handleDeleteProject = async (e) => {
        e.preventDefault();
        closeModal();
        await dispatch(removeProject(projectId))
        navigate(`/${userId}/inbox`)
    }

    return (
        <div>
            <h1>Delete?</h1>
            <p>
                This will permanently delete &quot;{project.name}&quot; and all its tasks.
                This can&apos;t be undone.
            </p>
            <button onClick={() => closeModal()}>Cancel</button>
            <button onClick={(e) => handleDeleteProject(e)}>Delete</button>
        </div>
    )
}