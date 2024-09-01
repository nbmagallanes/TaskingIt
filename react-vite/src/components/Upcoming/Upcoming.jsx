import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserTasks } from '../../redux/task'
import './Upcoming.css'
import CreateTask from '../CreateTask/CreateTask'
import OpenModalButton from '../OpenModalButton'

export default function Upcoming() {
    const tasksObj = useSelector(state => state.taskState.tasks)
    const tasks = Object.values(tasksObj)
    const projectsObj = useSelector(state => state.projectState.projects)
    const projects = Object.values(projectsObj)
    const dispatch = useDispatch();

    const newDateToday = new Date()
    const upcomingData = []

    for (let i = 0; i < 7; i++) {
        const date = new Date(newDateToday)
        date.setDate(newDateToday.getDate() + i)

        const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        const formatedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}` // For task due_time

        upcomingData.push({
            id: i,
            displayDate: new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                weekday: 'long',
            }).format(date).split(', '),
            formattedDate: formatedDate,
            tasks: tasks.length ? (tasks.filter(task => {
                // console.log(new Date(task.due_date), new Date(formatedDate), new Date(task.due_date) > new Date(formatedDate))
                if (task.due_date === formatedDate || 
                    (task.repeat && task.repeat_end && task.repeat_start && (new Date(task.repeat_start) <= new Date(formatedDate)) && (new Date(task.repeat_end) >= new Date(formatedDate))) || 
                    (task.repeat && !task.repeat_end && task.repeat_start && (new Date(task.repeat_start) <= new Date(formatedDate)))) {
                        return true
                    }
                return false
            })) : []
        })
    }

    const getTaskProject = (projectId, sectionId) => {
        if (projectId && sectionId) {
          const project = projects.find(project => project.id === projectId)
          const section = project?.sections.find(section => section.id === sectionId)
          return `# ${project?.name} / ${section?.name}`
        } else {
          const project = projects.find(project => project.id === projectId)
          return `# ${project?.name}`
        }
    }

    useEffect(() => {
        if (!tasks.length) {
            dispatch(getUserTasks())
        }
    }, [tasks.length])

    return (
        <div className='upcoming-page-container'>
            <div className='upcoming-top-container'>
                <h1 className='upcoming-title'>Upcoming</h1>
                <p>Date placeholder</p>
            </div>
            <div className='upcoming-middle-container'></div>
            <div className='upcoming-bottom-container'>
                {upcomingData && ( upcomingData.map(data => (
                    <div key={data.id} className='upcoming-date-task-container'>
                        <p>{`${data.displayDate[1]} • ${data.id === 0 ? 'Today' : (data.id === 1 ? 'Tomorrow' : data.displayDate[0])}`}</p>
                        <div className='upcoming-tasks-container'>
                            {data.tasks ? (
                                data.tasks.map( task => (
                                    <div key={task.id} className='upcoming-task'>
                                        <div className='upcoming-task-button-container'>
                                            <button className='upcoming-task-button'></button>
                                        </div>
                                        <div className='upcoming-task-info'>
                                            <p>{task.title}</p>
                                            <p>{task.due_time}</p>
                                            <p>{getTaskProject(task.project_id, task.section_id)}</p>
                                        </div>
                                    </div>
                                ))
                            ) : null }
                            <OpenModalButton
                                buttonText= 'Add Task'
                                modalComponent={<CreateTask date={data.formattedDate}/>}
                            />
                        </div>
                    </div>
                )))}
            </div>
        </div>
    )
}