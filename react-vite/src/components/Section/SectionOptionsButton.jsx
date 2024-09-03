import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditSection from "../EditSection/EditSection"
import DeleteSection from "../DeleteSection/DeleteSection"
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { PiDotsThreeOutlineThin } from "react-icons/pi";

function SectionOptionsButton({sectionId, isOpen, onToggleMenu}) {
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
      <button className='section-options-button' onClick={(e) => { e.stopPropagation(); onToggleMenu(); }}>
        <PiDotsThreeOutlineThin />
      </button>
      {isOpen && (
        <div className={"section-options-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <OpenModalButton
                    buttonText={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', padding:'10px 0px'}}>
                            <FiEdit3 style={{ fontSize: '20px' }} />
                            Edit
                        </span>
                    }
                    modalComponent={<EditSection sectionId={sectionId}/>}
                    onButtonClick={onToggleMenu}
                />
                <OpenModalButton
                    buttonText={
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', padding:'10px 0px'}}>
                            <MdDeleteOutline style={{ fontSize: '20px', color: 'red' }} />
                            Delete
                        </span>
                    }
                    modalComponent={<DeleteSection sectionId={sectionId}/>}
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

export default SectionOptionsButton;
