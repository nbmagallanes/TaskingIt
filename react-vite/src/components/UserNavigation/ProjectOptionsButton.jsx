import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditProjectModal from "../EditProjectModal/EditProjectModal";
import DeleteProject from "../DeleteProject/DeleteProject";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

function ProjectOptionsButton({projectId, isOpen, onToggleMenu}) {
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  useEffect(() => {
    if (!isOpen) return;
    
    const closeMenu = (e) => {
        if (ulRef.current && !ulRef.current.contains(e.target)) {
            onToggleMenu();
        }
    };
    
    document.addEventListener("click", closeMenu);
    
    return () => document.removeEventListener("click", closeMenu);
}, [isOpen, onToggleMenu]);

  return (
    <>
      <button className='project-options-button' onClick={(e) => { e.stopPropagation(); onToggleMenu(); }}>
        ...
      </button>
      {isOpen && (
        <div className={"project-options-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <OpenModalButton
                    buttonText={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', padding:'10px 0px'}}>
                            <FiEdit3 style={{ fontSize: '20px' }} />
                            Edit
                        </span>
                    }
                    modalComponent={<EditProjectModal projectId={projectId}/>}
                    onButtonClick={onToggleMenu}
                />
                <OpenModalButton
                    buttonText={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', padding:'10px 0px'}}>
                            <MdDeleteOutline style={{ fontSize: '20px', color: 'red' }} />
                            Delete
                        </span>
                    }
                    modalComponent={<DeleteProject projectId={projectId}/>}
                    onButtonClick={onToggleMenu}
                />
            </>
          ) : null
          }
        </div>
      )}
    </>
  );
}

export default ProjectOptionsButton;
