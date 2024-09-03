import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks } from "../../redux/task";
import OpenModalButton from "../OpenModalButton";
import CreateTask from "../CreateTask/CreateTask";
import ListViewTask from "../ListViewTask/ListViewTask";
import { FiPlus } from "react-icons/fi";
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

  const dispatch = useDispatch();

  const convertTime = (timeStr) => {
    const [time, abbreviation] = timeStr.split(' ');
    const [hours, minutes] = time.split(':')
    
    if (abbreviation == 'PM' && hours !== '12') return `${parseInt(hours) + 12}:${minutes}`
    else if (abbreviation == 'AM' && hours == '12') return `00:${minutes}`
    else return `${hours}:${minutes}`
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.due_time ? new Date(`1970-01-01T${convertTime(a.due_time)}`).getTime() : new Date('1970-01-01T23:59:59').getTime();
    const timeB = b.due_time ? new Date(`1970-01-01T${convertTime(b.due_time)}`).getTime() : new Date('1970-01-01T23:59:59').getTime();
    
    return timeA - timeB;
  });

  useEffect(() => {
    dispatch(getUserTasks())

  }, [dispatch])

  return (
    <div className="today-container">
      <h1 className="today-title">Today</h1>
      {tasks ? ( 
        <div className="today-tasks-container">
          {sortedTasks.map(task => (
            <ListViewTask key={task.id} task={task} projectView={false}/>
          ))}
          <OpenModalButton 
            buttonText={
                <span className='add-task-button-span'>
                    <FiPlus className='add-task-button-icon' />
                    Add Task
                </span>
            }
            modalComponent={<CreateTask date={formatedToday}/>}
            className='add-task-button'
          />
        </div>
      ) : null}
    </div>
  );
}