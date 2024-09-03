import { useSelector } from 'react-redux'
// import { useState } from 'react'
import ListViewTask from '../ListViewTask/ListViewTask'
import SectionOptionsButton from "./SectionOptionsButton"

import './Section.css'

export default function Section({section, projectView, openMenu, setOpenMenu}) {
    const tasksObj = useSelector(state => state.taskState.tasks)
    const tasks = Object.values(tasksObj).filter(task => task.section_id === section.id)
   
    const handleOpenMenu = (sectionId) => {
        console.log('inside handleee', sectionId, openMenu)
        setOpenMenu(openMenu === sectionId ? null : sectionId);
    };

    return (
        <div className='section-tasks-list-container'>
            <div className='section-container'>
                <h3 className="section-title">{section.name}</h3>
                <div className="section-tooltip section-tooltip-list">
                    <SectionOptionsButton sectionId={section.id} 
                        isOpen={openMenu === section.id}
                        onToggleMenu={() => handleOpenMenu(section.id)}
                    />
                    <p className="section-tooltiptext section-tooltiptext-list">More section actions</p>
                </div>
            </div>
            {tasks.length ? (
                <div className='section-tasks-container'>
                    {tasks.map(task => (
                        <ListViewTask key={task.id} task={task} projectView={projectView}/>
                    ))}
                </div>
            ): null }
        </div>
    )
}