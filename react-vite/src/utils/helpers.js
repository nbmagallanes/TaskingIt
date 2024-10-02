import { store } from "../main"

export const mapSectionsToProjects = (projectsArr, sectionsArr) => {
    console.log(projectsArr, sectionsArr)
    const mappedProjects = [];

    for (let project of projectsArr) {
        const sections = []
        for (let section of sectionsArr) {
            if (section.project_id === project.id) {
                sections.push(section)
            }
        }

        mappedProjects.push({...project, sections})
    }
    console.log('finalll',mappedProjects)

    return mappedProjects;
}