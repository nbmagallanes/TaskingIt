import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks } from "../../redux/task";
import OpenModalButton from "../OpenModalButton";
import EditTask from "../EditTask/EditTask";
import CreateTask from "../CreateTask/CreateTask";
import DeleteTask from "../DeleteTask/DeleteTask"
import { FiEdit3, FiTrash } from "react-icons/fi";
import './TodayPage.css'


export default function TodayPage() {
  const newDateToday = new Date()
  // const displayDate = new Intl.DateTimeFormat('en-US', {
  //   month: 'short',
  //   day: 'numeric',
  //   weekday: 'long',
  //   year: 'numeric'
  // }).format(newDateToday).split(', ') // gives ['day', 'month date']
  const [year, month, day] = [newDateToday.getFullYear(), newDateToday.getMonth() + 1, newDateToday.getDate()]
  const formatedToday = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}` // For task due_time

  const tasksObj = useSelector(state => state.taskState.tasks)
  const tasks = Object.values(tasksObj).filter(task => task.due_date === formatedToday)
  const projectsObj = useSelector(state => state.projectState.projects)
  const projects = Object.values(projectsObj)
  const dispatch = useDispatch();

  const getTaskProject = (projectId, sectionId) => {
    if (projectId && sectionId) {
      const project = projects.find(project => project.id === projectId)
      const section = project?.sections.find(section => section.id === sectionId)
      return `${project?.name} / ${section?.name} #`
    } else {
      const project = projects.find(project => project.id === projectId)
      return `${project?.name} #`
    }
  }

  useEffect(() => {
    dispatch(getUserTasks())

  }, [dispatch])

  return (
    <div className="today-container">
      <h1 className="today-title">Today</h1>
      {tasks ? ( 
        <div className="today-tasks-container">
          {tasks.map(task => (
            <div key={task.id} className="today-task">
              <div className="today-task-button-container">
                <button className="today-task-button"></button>
              </div>
              <div className="today-task-info">
                <div className="today-task-top">
                  <p className="today-task-title" style={{fontSize:"14px", padding:"2px 0px"}}>{task.title}</p>
                  <div className="today-task-option-buttons" style={{display: 'flex', gap:'5px'}}>
                    <OpenModalButton
                        buttonText={ <FiEdit3 style={{ padding: '2px 4px 0px 4px', strokeWidth: 1 }} /> }
                        modalComponent={<EditTask taskId={task.id}/>}
                    />
                    <OpenModalButton
                        buttonText={ <FiTrash style={{ padding: '2px 4px 0px 4px', strokeWidth: 1 }} /> }
                        modalComponent={<DeleteTask task={task}/>}
                    />
                  </div>
                </div>
                <div className="today-task-info-bottom" style={task.due_time ? {justifyContent: 'space-between'} : {justifyContent: 'flex-end'}}>
                  {task.due_time ? <p className="today-task-due-time">{task.due_time}</p> : null}
                  <p className="today-task-project">{getTaskProject(task.project_id, task.section_id)}</p>
                </div>
              </div>
            </div>
          ))}
          <OpenModalButton
              buttonText= 'Add Task'
              modalComponent={<CreateTask date={formatedToday}/>}
          />
        </div>
      ) : null}
    </div>
  );
}