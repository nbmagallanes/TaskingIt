import { useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { addTask } from "../../redux/task";
// import React from "react";

export default function CreateTask({sectionId, date}) {
    console.log(sectionId, date)
    const projectsObj = useSelector(state => state.projectState.projects)
    const projects = Object.values(projectsObj)
    const { projectId } = useParams();
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [newProjectId, setNewProjectId] = useState(projectId ? projectId : projects[0].id)
    const [newSectionId, setNewSectionId] = useState(sectionId || '')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('4');
    const [dueDate, setDueDate] = useState(date || '');
    const [dueTime, setDueTime] = useState('');
    const [duration, setDuration] = useState('');
    const [repeatType, setRepeatType] = useState('')
    const [repeatStart, setRepeatStart] = useState('');
    const [repeatEnd, setRepeatEnd] = useState('');

    const handleProjectSectionChange = (e) => {
        const [selectedProjectId, selectedSectionId] = e.target.value.split('-');
        setNewProjectId(selectedProjectId);
        setNewSectionId(selectedSectionId || '')
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = {
            project_id: newProjectId,
            section_id: newSectionId,
            title,
            description: description,
            priority: +priority,
            due_date: dueDate,
            due_time: dueTime,
            duration,
            repeat: repeatType ? true : false,
            repeat_type: repeatType,
            repeat_start: repeatStart,
            repeat_end: repeatEnd
        }

        const response = await dispatch(addTask(newTask))
        console.log(response)

        if (response) {
            setNewProjectId(projectId);
            setNewSectionId('');
            setTitle('')
            setDescription('');
            closeModal();
            setPriority('4');
            setDueDate('');
            setDueTime('');
            setDuration('');
            setRepeatType('')
            setRepeatStart('');
            setRepeatEnd('');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Title</p>
                <input id='title'
                type='text'
                value={title}
                placeholder="Title"
                onChange={(e) => {setTitle(e.target.value)}}
                />
                <p>Description</p>
                <input id='description'
                type='text'
                value={description}
                placeholder="Description"
                onChange={(e) => {setDescription(e.target.value)}}
                />
                <p>Project</p>
                {/* <select name='projects' value={newProjectId} onChange={(e) => {setNewProjectId(e.target.value)}}>
                    {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                </select> */}
                <select 
                    name='projects' 
                    value={newSectionId ? `${newProjectId}-${newSectionId}` : newProjectId} 
                    onChange={handleProjectSectionChange}
                >
                    {projects.map(project => (
                        <Fragment key={project.id}>
                            <option value={project.id}>{project.name}</option>
                            {project.sections && project.sections.map(section => (
                                <option key={section.id} value={`${project.id}-${section.id}`}>&emsp;{section.name}</option>
                            ))}
                        </Fragment>
                    ))}
                </select>
                <p>Priority</p>
                <select name='priority' value={priority} onChange={(e) => {setPriority(e.target.value)}}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>
                <p>Due Date</p>
                <input id='dueDate'
                type='date'
                value={dueDate}
                onChange={(e) => {setDueDate(e.target.value)}}
                />
                <p>Due Time</p>
                <input id='dueTime'
                type='time'
                value={dueTime}
                onChange={(e) => {setDueTime(e.target.value)}}
                />
                <p>Duration</p>
                <input id='duration'
                type='text'
                value={duration}
                placeholder="HH:MM"
                onChange={(e) => {setDuration(e.target.value)}}
                />
                <p>Repeat</p>
                <select name='repeatType' value={repeatType} onChange={(e) => {setRepeatType(e.target.value)}}>
                    <option value='' disabled>None</option>
                    <option value='Daily'>Daily</option>
                    <option value='Weekly'>Weekly</option>
                </select>
                <p>From</p>
                <input id='repeatStart'
                type='date'
                value={repeatStart}
                onChange={(e) => {setRepeatStart(e.target.value)}}
                />
                <p>To</p>
                <input id='repeatEnd'
                type='date'
                value={repeatEnd}
                onChange={(e) => {setRepeatEnd(e.target.value)}}
                />
                <button type='button' onClick={() => closeModal()}>Cancel</button>
                <button type='submit'>Add Task</button>    
            </form>
        </div>
    )
}