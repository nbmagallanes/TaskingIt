import { useParams } from 'react-router-dom'
import './Project.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProject } from '../../redux/project';
import { getProjectSections } from '../../redux/section';
import Section from '../Section/Section';
import OpenModalButton from '../OpenModalButton';
import CreateSection from '../CreateSection/CreateSection';

export default function Project() {
    const project = useSelector((state) => state.projectState.project)
    const sectionsObj = useSelector((state) => state.sectionState.sections)
    const sections = Object.values(sectionsObj)
    // console.log('checking sectionnsss', sectionsObj, sections)
    const dispatch = useDispatch();
    const { projectId } = useParams();

    useEffect(() => {
        dispatch(getProject(projectId))
        dispatch(getProjectSections(projectId))
    }, [projectId])

    return (
        <div className='project-container'>
            <h1>{project.name}</h1>
            <h3>{project.description}</h3>
            <OpenModalButton 
                buttonText='Add Section'
                modalComponent={<CreateSection projectId={projectId}/>}
            />
            <div>
                Container for tasks without section
            </div>

            {sections.length ? (
                <div className='project-section-container'>
                    {sections.map(section => (
                        <Section section={section} key={section.id}/>
                    ))}
                </div> 
            ) : null }

        </div>
    )
}