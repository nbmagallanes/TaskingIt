import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import girlCheckList from '../../../images/girlCheckList.jpg';
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // if (sessionUser) return <Navigate to="/${}" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } 
    // else {
    //   navigate("/");
    // }
    console.log(errors)
  };

  useEffect(() => {
    if (sessionUser) {
      navigate(`/${sessionUser.id}/today`);
    }
  }, [sessionUser, navigate]);


  return (
    <div className="login-page-container">
      <div className="login-page-subcontainer">
        <div>
          <NavLink to="/" className='signup-logo'>TaskingIt</NavLink>
        </div>
        <div className="signup-content">
          <div className="login-form-content">
            <h1>Log In</h1>
            <div className="signup-errors-container">
              {errors.length > 0 &&
                errors.map((message) => <p key={message}>{message}</p>)}
            </div>
            <form onSubmit={handleSubmit} className="signup-form">
              <div>
                <div className="signup-input-container">
                  <label>
                    Email
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {errors.email && <p>{errors.email}</p>}
                </div>
              </div>
              <div>
                <div className="signup-input-container">
                  <label>
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {errors.password && <p>{errors.password}</p>}
                </div>
              </div>
              <button type="submit" className="signup-button">Log In</button>
            </form>
          </div>
          <div className="signup-image-container">
            <img src={girlCheckList} className="signup-image"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
