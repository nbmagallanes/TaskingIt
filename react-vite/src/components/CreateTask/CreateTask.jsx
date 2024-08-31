import { useState, Fragment } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { addTask } from "../../redux/task";
import './CreateTask.css'
// import React from "react";

export default function CreateTask({sectionId, date}) {
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
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleProjectSectionChange = (e) => {
        const [selectedProjectId, selectedSectionId] = e.target.value.split('-');
        setNewProjectId(selectedProjectId);
        setNewSectionId(selectedSectionId || '')
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const newTask = {
            project_id: newProjectId,
            section_id: newSectionId,
            title,
            description: description,
            priority: +priority,
            due_date: repeatType ? '' : dueDate,
            due_time: dueTime,
            duration: dueTime ? duration : '',
            repeat: repeatType ? true : false,
            repeat_type: repeatType,
            repeat_start: repeatType ? repeatStart : '',
            repeat_end: repeatType ? repeatEnd : ''
        }

        const response = await dispatch(addTask(newTask))

        if (response && !response.errors) {
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

        if (response && response.errors) {
            setErrors(response.errors)
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
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.title}</p>
                </div>
                <p>Description</p>
                <textarea id='description'
                type='text'
                value={description}
                placeholder="Description"
                onChange={(e) => {setDescription(e.target.value)}}
                />
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.description}</p>
                </div>
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
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.projects}</p>
                </div>
                <p>Priority</p>
                <select name='priority' value={priority} onChange={(e) => {setPriority(e.target.value)}}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                </select>
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.priority}</p>
                </div>
                <p>Due Date</p>
                <input id='dueDate'
                type='date'
                value={repeatType ? '' : dueDate}
                disabled={repeatType ? true : false}
                onChange={(e) => {setDueDate(e.target.value)}}
                />
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.dueDate}</p>
                </div>
                <p>Due Time</p>
                <input id='dueTime'
                type='time'
                value={dueTime}
                onChange={(e) => {setDueTime(e.target.value)}}
                />
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.dueTime}</p>
                </div>
                <p>Duration</p>
                <input id='duration'
                type='text'
                value={dueTime ? duration : ''}
                placeholder="HH:MM"
                disabled={dueTime ? false : true}
                onChange={(e) => {setDuration(e.target.value)}}
                />
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.duration}</p>
                </div>
                <p>Repeat</p>
                <select name='repeatType' value={repeatType} onChange={(e) => {setRepeatType(e.target.value)}}>
                    <option value=''>None</option>
                    <option value='Daily'>Daily</option>
                    <option value='Weekly'>Weekly</option>
                </select>
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.repeatType}</p>
                </div>
                <p>From</p>
                <input id='repeatStart'
                type='date'
                value={repeatType ? repeatStart : ''}
                disabled={repeatType ? false : true}
                onChange={(e) => {setRepeatStart(e.target.value)}}
                />
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.repeatStart}</p>
                </div>
                <p>To</p>
                <input id='repeatEnd'
                type='date'
                value={repeatType ? repeatEnd : ''}
                disabled={repeatType ? false : true}
                onChange={(e) => {setRepeatEnd(e.target.value)}}
                />
                <div className='create-task-errors-container'>
                    <p className="create-task-errors">{submitted && errors.repeatEnd}</p>
                </div>
                <button type='button' onClick={() => closeModal()}>Cancel</button>
                <button type='submit'>Add Task</button>    
            </form>
        </div>
    )
}