const LOAD_PROJECT_TASKS = 'task/getProjectTasks'
const LOAD_USER_TASKS = 'task/getUserTasks'
const LOAD_TASK = 'task/getTask'
const CREATE_TASK = 'task/createTask'
const UPDATE_TASK = 'task/updateTask'
const DELETE_TASK = 'task/deleteTask'

// Gets tasks by userId
const loadProjectTasks = (tasks) => ({
    type: LOAD_PROJECT_TASKS,
    tasks
})

export const loadUserTasks = (tasks) => ({
    type: LOAD_USER_TASKS,
    tasks
})

const loadTask = (task) => ({
    type: LOAD_TASK,
    task
})

const createTask = (task) => ({
    type: CREATE_TASK,
    task
})

const updateTask = (task) => ({
    type: UPDATE_TASK,
    task
})

const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    taskId
})

export const getProjectTasks = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/tasks`)

    if (response.ok) {
        const resTasks = await response.json()
        console.log('FROM PROJECT TASKS', resTasks)
        dispatch(loadProjectTasks(resTasks))
        // return tasks
    } else {
        const error = await response.json()
        return error
    }
};

export const getUserTasks = () => async (dispatch) => {
    const response = await fetch(`/api/tasks/current`)

    if (response.ok) {
        const resTasks = await response.json()
        console.log('FROM USER TASKS', resTasks)
        dispatch(loadUserTasks(resTasks))
        // return tasks
    } else {
        const error = await response.json()
        return error
    }
};

export const getTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`)

    if (response.ok) {
        const resTask = await response.json()
        dispatch(loadTask(resTask))
        // return task
    } else {
        const error = await response.json()
        return error
    }
};

export const addTask = (task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    })

    if (response.ok) {
        const resTask = await response.json()
        dispatch(createTask(resTask))
        return resTask
    } else {
        const error = await response.json()
        return error
    }
};

export const editTask = ({editedTask, taskId}) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
    })

    if (response.ok) {
        const resTask = await response.json()
        dispatch(updateTask(resTask))
        return resTask
    } else {
        const error = await response.json()
        return error
    }
};

export const removeTask = (taskId) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteTask(taskId));
    } else {
        const error = await response.json()
        return error
    }
};

const initialState = { task: {}, tasks: {} }

const tasksReducer = (state=initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_PROJECT_TASKS: {
            newState = {...state, tasks: {}}
            action.tasks.forEach(task => {newState.tasks[task.id] = task})
            return newState
        }
        case LOAD_USER_TASKS: {
            console.log('CHECKING STATE', state)
            newState = {...state, tasks: {}}
            action.tasks.forEach(task => {newState.tasks[task.id] = task})
            return newState
        }
        case LOAD_TASK: {
            newState = {...state, task: action.task}
            return newState
        }
        case CREATE_TASK: {
            const newTask = action.task;
            newState = {...state, tasks: {...state.tasks, [newTask.id]: newTask}}
            return newState 
        }
        case UPDATE_TASK: {
            const updatedTask = action.task;
            newState = {...state, tasks: {...state.tasks, [updatedTask.id]: updatedTask}}
            return newState
        }
        case DELETE_TASK: {
            newState = {...state, tasks: {...state.tasks}}
            delete newState.tasks[action.taskId]
            return newState
        }
        default:
            return state
    }

}

export default tasksReducer;