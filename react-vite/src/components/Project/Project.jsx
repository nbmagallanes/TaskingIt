import { useParams } from 'react-router-dom'
import './Project.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../redux/project';

export default function Project() {
    const project = useSelector((state) => state.projectState.project)
    const dispatch = useDispatch();
    const { projectId } = useParams();

    useEffect(() => {
        dispatch(getProject(projectId))
    }, [projectId])

    return (
        <div className='project-container'>
            <h1>{project.name}</h1>
            <h3>{project.description}</h3>
            <div>
                Container for tasks without section
            </div>
            <div className='project-section-container'>
                Container for sections and tasks
            </div>
        </div>
    )
}