import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useParams } from "react-router-dom";
import { addTask } from "../../redux/task";
import './CreateTask.css'
import { mapSectionsToProjects } from "../../utils/helpers";
// import React from "react";

export default function CreateTask({sectionId, date}) {
    const projectsObj = useSelector(state => state.projectState.projects)
    const projects = Object.values(projectsObj)
    const sectionsObj = useSelector(state => state.sectionState.sections)
    const sections = Object.values(sectionsObj)
    const { projectId } = useParams();
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const projectSection = mapSectionsToProjects(projects, sections)

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

    const newDateToday = new Date()

    const [year, month, day] = [newDateToday.getFullYear(), newDateToday.getMonth() + 1, newDateToday.getDate()]
    const formatedToday = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}` // For task due_time

    const validateDuration = (duration) => {
        if (!duration.length) return true

        const splitTime = duration.split(':')

        if (splitTime.length !== 2) return false

        const hours = splitTime[0]
        const minutes = splitTime[1]

        if (hours.length !== 2 || minutes.length !== 2 || isNaN(hours) || isNaN(minutes)) return false
        if (parseInt(hours) < 0 || parseInt(hours) > 23 || parseInt(minutes) < 0 || parseInt(minutes) > 59) return false

        return true
    }

    const handleProjectSectionChange = (e) => {
        const [selectedProjectId, selectedSectionId] = e.target.value.split('-');
        setNewProjectId(selectedProjectId);
        setNewSectionId(selectedSectionId || '')
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (Object.values(errors).length) return

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

    }

    useEffect(() => {
        const newErrors = {}

        if (!title.length) newErrors.title = 'Title is required'
        else if (title.length < 2) newErrors.title = 'Title must be 2 characters or more'
        else if (title.length > 150) newErrors.title = 'Title must be 150 characters or less'
        if (description.length && description.length > 300) newErrors.description = 'Description must be 300 characters or less'
        if (!validateDuration(duration)) newErrors.duration = 'Duration format must be in HH:MM'
        if (duration.length && !repeatType.length && (!dueDate || !dueTime)) newErrors.duration = 'Due time and due date must be set'
        if (duration.length && repeatType.length && !dueTime) newErrors.duration = 'Due time must be set'
        if (repeatType.length && !repeatStart) newErrors.repeatStart = 'Start date is required'
        if (repeatEnd && repeatStart && (new Date(repeatEnd) < new Date(repeatStart))) newErrors.repeatEnd = 'Start date must be before end date'

        setErrors(newErrors)
    }, [title, description, duration, repeatType, dueDate, dueTime, repeatEnd, repeatStart])

    return (
        <div className="create-task-container">
            <h1 className="create-task-title">Create Task</h1>
            <form onSubmit={handleSubmit} className="create-task-form">
                <div className="create-task-right-container">
                    <div className="create-task-main-container">
                        <div className="create-task-input-container">
                            <div>
                                <label>
                                    Title*
                                    <input id='title'
                                    type='text'
                                    value={title}
                                    placeholder="Enter your title..."
                                    onChange={(e) => {setTitle(e.target.value)}}
                                    />
                                </label>
                            </div>
                            <div className='create-task-errors-container'>
                                <p className="create-task-errors">{submitted && errors.title}</p>
                            </div>
                        </div>
                        
                        <div>
                            <div className="create-task-input-container">
                                <label>
                                    Description
                                    <textarea id='description'
                                    type='text'
                                    value={description}
                                    placeholder="Enter a description..."
                                    onChange={(e) => {setDescription(e.target.value)}}
                                    />
                                </label>
                            </div>
                            <div className='create-task-errors-container'>
                                <p className="create-task-errors">{submitted && errors.description}</p>
                            </div>
                        </div>
                    
                    </div>
                    <div className="create-task-submain-container">
                        <div className="create-task-input-container">
                            <label>
                                Project
                                <select 
                                    name='projects' 
                                    value={newSectionId ? `${newProjectId}-${newSectionId}` : newProjectId} 
                                    onChange={handleProjectSectionChange}
                                >
                                    {projectSection.map(project => (
                                        <Fragment key={project.id}>
                                            <option value={project.id}>{project.name}</option>
                                            {project.sections && project.sections.map(section => (
                                                <option key={section.id} value={`${project.id}-${section.id}`}>&emsp;{section.name}</option>
                                            ))}
                                        </Fragment>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className='create-task-errors-container'>
                            <p className="create-task-errors">{submitted && errors.projects}</p>
                        </div>

                        <div className="create-task-input-container">
                            <label>
                                Priority
                                <select name='priority' value={priority} onChange={(e) => {setPriority(e.target.value)}}>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select>
                            </label>
                        </div>
                        <div className='create-task-errors-container'>
                            <p className="create-task-errors">{submitted && errors.priority}</p>
                        </div>
                    </div>
                </div>
                <div className="create-task-time-container">
                    <div>
                        <div className="create-task-input-container">
                            <label>
                                Due Date
                                <input id='dueDate'
                                type='date'
                                value={repeatType ? '' : dueDate}
                                disabled={repeatType ? true : false}
                                min={formatedToday}
                                onChange={(e) => {setDueDate(e.target.value)}}
                                />
                            </label>
                        </div>
                        <div className='create-task-errors-container'>
                            <p className="create-task-errors">{submitted && errors.dueDate}</p>
                        </div>
                    
                        <div className="create-task-input-container">
                            <label>
                                Due Time
                                <input id='dueTime'
                                type='time'
                                value={dueTime}
                                onChange={(e) => {setDueTime(e.target.value)}}
                                />
                            </label>
                        </div>
                        <div className='create-task-errors-container'>
                            <p className="create-task-errors">{submitted && errors.dueTime}</p>
                        </div>
                    
                        <div className="create-task-input-container">
                            <label>
                                Duration
                                <input id='duration'
                                type='text'
                                value={dueTime ? duration : ''}
                                placeholder="HH:MM"
                                maxLength='5'
                                disabled={dueTime ? false : true}
                                onChange={(e) => {setDuration(e.target.value)}}
                                />
                            </label>
                        </div>
                        <div className='create-task-errors-container'>
                            <p className="create-task-errors">{submitted && errors.duration}</p>
                        </div>
                
                        <div className="create-task-input-container">
                            <label>
                                Repeat
                                <select name='repeatType' value={repeatType} onChange={(e) => {setRepeatType(e.target.value)}}>
                                    <option value=''>None</option>
                                    <option value='Daily'>Daily</option>
                                    <option value='Weekly'>Weekly</option>
                                </select>
                            </label>
                        </div>
                        <div className='create-task-errors-container'>
                            <p className="create-task-errors">{submitted && errors.repeatType}</p>
                        </div>
                    
                        {repeatType.length ? (
                            <>
                                <div className="create-task-input-container">
                                    <label>
                                        From
                                        <input id='repeatStart'
                                        type='date'
                                        value={repeatType ? repeatStart : ''}
                                        disabled={repeatType ? false : true}
                                        min={formatedToday}
                                        onChange={(e) => {setRepeatStart(e.target.value)}}
                                        />
                                    </label>
                                </div>
                                <div className='create-task-errors-container'>
                                    <p className="create-task-errors">{submitted && errors.repeatStart}</p>
                                </div>
                        
                                <div className="create-task-input-container">
                                    <label>
                                        To
                                        <input id='repeatEnd'
                                        type='date'
                                        value={repeatType ? repeatEnd : ''}
                                        disabled={repeatType ? false : true}
                                        onChange={(e) => {setRepeatEnd(e.target.value)}}
                                        />
                                    </label>
                                </div> 
                                <div className='create-task-errors-container'>
                                    <p className="create-task-errors">{submitted && errors.repeatEnd}</p>
                                </div>
                            </>
                        ) : null}
                    </div>
                    <div className="create-task-buttons">
                        <button type='button' onClick={() => closeModal()}>Cancel</button>
                        <button type='submit'>Add Task</button>    
                    </div>
                </div>
            </form>
        </div>
    )
}