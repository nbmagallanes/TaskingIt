import DeleteSection from '../DeleteSection/DeleteSection'
import EditSection from '../Edit Section/EditSection'
import OpenModalButton from '../OpenModalButton'
import './Section.css'

export default function Section({section}) {
   
    return (
        <div>
            <div>
                <h3>{section.name}</h3>
                <OpenModalButton 
                    buttonText='Delete Section'
                    modalComponent={<DeleteSection sectionId={section.id}/>}
                />
                <OpenModalButton 
                    buttonText='Edit Section'
                    modalComponent={<EditSection sectionId={section.id}/>}
                />
            </div>
            {section.tasks ? (
                section.tasks.map(task => (
                    <div key={task.id}>
                        <p>{task.title}</p>
                    </div>
                ))
            ): null }

        </div>
    )
}