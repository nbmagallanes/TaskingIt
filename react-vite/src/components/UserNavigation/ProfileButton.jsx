import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/')
  };

  return (
    <>
      <button onClick={toggleMenu}>
        {/* <FaUserCircle style={{fontSize: "30px"}}/> */}
        <p style={{color:"white", fontSize:'16px'}}>{user.first_name[0]}</p>
      </button>
      <h3 style={{fontSize:'16px', fontWeight: '600'}}>{user.first_name}</h3>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li className="create-task-buttons">
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : null
          }
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
