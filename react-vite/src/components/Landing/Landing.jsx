import './Landing.css'
// import checklistImage from '../../../images/checklist.jpg';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import gradient from '../../../images/background-gradient.png';
import landing from '../../../images/landing.png';
// import { useEffect } from 'react';

export default function Landing() {
    const sessionUser = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (sessionUser) {
    //       navigate(`/${sessionUser.id}/today`);
    //     }
    // }, [sessionUser, navigate]);

    if (sessionUser) {
        navigate(`/${sessionUser.id}/today`);
    }

    return (
        <div className="landing-container">
            <div className='landing-subcontainer'>
                <div className="landing-left-side">
                    <h1>Master your day, one Task at a Time</h1>
                    <h3>With TaskingIt you can plan your life, work, and everything in between. Join today and find out why everyone is on TaskingIt!</h3>
                    <NavLink className="landing-link" to="/signup">Join us!</NavLink>
                </div>
                <div className="landing-right-side">
                    <img src={landing} className="landing-image"/>
                </div>
            </div>
        </div>
    )
}