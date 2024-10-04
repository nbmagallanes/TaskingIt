// import { getUserProjects } from "./project"
import { editTask } from '../redux/task'

const LOAD_USER_SECTIONS = 'section/getUserSections'
const LOAD_PROJECT_SECTIONS = 'section/getProjectSections'
const LOAD_SECTION = 'section/getSection'
const CREATE_SECTION = 'section/createSection'
const UPDATE_SECTION = 'section/updateSection'
const DELETE_SECTION = 'section/deleteSection'

// Gets sections by userId

export const loadUserSections = (sections) => ({
    type: LOAD_USER_SECTIONS,
    sections
})

const loadProjectSections = (sections) => ({
    type: LOAD_PROJECT_SECTIONS,
    sections
})

const loadSection = (section) => ({
    type: LOAD_SECTION,
    section
})

const createSection = (section) => ({
    type: CREATE_SECTION,
    section
})

const updateSection = (section) => ({
    type: UPDATE_SECTION,
    section
})

const deleteSection = (sectionId) => ({
    type: DELETE_SECTION,
    sectionId
})

export const getProjectSections = (projectId) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/sections`)

    if (response.ok) {
        const sections = await response.json()
        dispatch(loadProjectSections(sections))
        // return sections
    } else {
        const error = await response.json()
        return error
    }
};

export const getSection = ({projectId, sectionId}) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/sections/${sectionId}`)

    if (response.ok) {
        const resSection = await response.json()
        dispatch(loadSection(resSection))
        // return section
    } else {
        const error = await response.json()
        return error
    }
};

export const addSection = (section) => async (dispatch) => {
    const response = await fetch(`/api/projects/${section.project_id}/sections/new`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(section),
    })

    if (response.ok) {
        const resSection = await response.json()
        dispatch(createSection(resSection))
        return resSection
    } else {
        const error = await response.json()
        return error
    }
};

export const editSection = ({editedSection, projectId, sectionId}) => async (dispatch, getState) => {
    const response = await fetch(`/api/projects/${projectId}/sections/${sectionId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(editedSection),
    })

    if (response.ok) {
        const resSection = await response.json()
        await dispatch(updateSection(resSection))
        
        if (resSection.project_id !== projectId) {
            // await dispatch(getProjectSections(projectId))

            const state = getState()
            const tasks = Object.values(state.taskState.tasks).filter(task => task.section_id === sectionId)

            tasks.forEach( async (task) => {
                const refactoredTask = Object.keys(task).reduce((acc, key) => {
                    acc[key] = task[key] === null ? '' : task[key];

                    if (key === 'due_time' && task[key]) {

                        const [time, abbreviation] = task[key].split(' ');
                        const [hours, minutes] = time.split(':')
                        
                        if (abbreviation == 'PM' && hours !== '12') acc[key] = `${parseInt(hours) + 12}:${minutes}`
                        else if (abbreviation == 'AM' && hours == '12') acc[key] = `00:${minutes}`
                        else acc[key] = `${hours}:${minutes}`
                    }

                    return acc
                }, {})

                const updatedTask = {...refactoredTask, project_id: resSection.project_id}
                const taskRes = await dispatch(editTask({editedTask: updatedTask, taskId: parseInt(task.id)}))
                if (!taskRes.ok) return taskRes
            })
        }
         // When sections is updated, 
         // it updates the project state to fetch section names
        // dispatch(getUserProjects(resSection.user_id))
        
        return resSection
    } else {
        const error = await response.json()
        return error
    }
};

export const removeSection = ({projectId, sectionId}) => async (dispatch) => {
    const response = await fetch(`/api/projects/${projectId}/sections/${sectionId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(deleteSection(sectionId));
    } else {
        const error = await response.json()
        return error
    }
};

const initialState = { section: {}, sections: {} }

const sectionsReducer = (state=initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_USER_SECTIONS: {
            newState = {...state, sections: {}}
            action.sections.forEach(section => {newState.sections[section.id] = section})
            return newState
        }
        case LOAD_PROJECT_SECTIONS: {
            newState = {...state, sections:{}}
            action.sections.forEach(section => {newState.sections[section.id] = section})
            return newState
        }
        case LOAD_SECTION: {
            newState = {...state, section: action.section}
            return newState
        }
        case CREATE_SECTION: {
            const newSection = action.section;
            newState = {...state, sections: {...state.sections, [newSection.id]: newSection}}
            return newState 
        }
        case UPDATE_SECTION: {
            const updatedSection = action.section;
            newState = {...state, sections: {...state.sections, [updatedSection.id]: updatedSection}}
            return newState
        }
        case DELETE_SECTION: {
            newState = {...state, sections: {...state.sections}}
            delete newState.sections[action.sectionId]
            return newState
        }
        default:
            return state
    }

}

export default sectionsReducer;