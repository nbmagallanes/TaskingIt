const LOAD_USER_PROJECTS = 'project/getUserProjects'
const LOAD_PROJECT = 'project/getProject'
const CREATE_PROJECT = 'project/createProject'
const UPDATE_PROJECT = 'project/updateProject'
const DELETE_PROJECT = 'project/deleteProject'

// Gets projects by userId
const loadUserProjects = (projects) => ({
    type: LOAD_USER_PROJECTS,
    projects
})

const loadProject = (project) => ({
    type: LOAD_PROJECT,
    project
})

const createProject = (project) => ({
    type: CREATE_PROJECT,
    project
})

const updateProject = (project) => ({
    type: UPDATE_PROJECT,
    project
})

const deleteProject = (projectId) => ({
    type: DELETE_PROJECT,
    projectId
})

export const getUserProjects = (userId) => async (dispatch) => {
    const response = await fetch(`/api/projects/user/${userId}`)

    if (response.ok) {
        const projects = await response.json()
        dispatch(loadUserProjects(projects))
        // return projects
    } else {
        const error = await response.json()
        return error
    }
};

export const getProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`)

    if (response.ok) {
        const project = await response.json()
        dispatch(loadProject(project))
        // return project
    } else {
        const error = await response.json()
        return error
    }
};

export const addProject = (project) => async (dispatch) => {
    const response = await fetch(`/api/projects/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
    })

    if (response.ok) {
        const resProject = await response.json()
        dispatch(createProject(resProject))
        return resProject
    } else {
        const error = await response.json()
        return error
    }
};

export const editProject = ({editedProject, projectId}) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProject),
    })

    if (response.ok) {
        const resProject = await response.json()
        dispatch(updateProject(resProject))
        return resProject
    } else {
        const error = await response.json()
        return error
    }
};

export const removeProject = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteProject(projectId));
    } else {
        const error = await response.json()
        return error
    }
};

const initialState = { project: {}, projects: {} }

const projectsReducer = (state=initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_USER_PROJECTS: {
            newState = {...state, projects: {}}
            action.projects.forEach(project => {newState.projects[project.id] = project})
            return newState
        }
        case LOAD_PROJECT: {
            newState = {...state, project: action.project}
            return newState
        }
        case CREATE_PROJECT: {
            const newProject = action.project;
            newState = {...state, projects: {...state.projects, [newProject.id]: newProject}}
            return newState 
        }
        case UPDATE_PROJECT: {
            const updatedProject = action.project;
            const currProject = state.project && state.project.id === updatedProject.id ? updatedProject : state.project;
            newState = {...state, project: currProject, projects: {...state.projects, [updatedProject.id]: updatedProject}}
            return newState
        }
        case DELETE_PROJECT: {
            newState = {...state}
            delete newState.projects[action.projectId]
            return newState
        }
        default:
            return state
    }

}

export default projectsReducer;