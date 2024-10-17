import { useState, useEffect } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../../images/taskingIt-logo.png'
import nameLogo from '../../../images/taskingIt-name.png'
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
  };

  const handleDemoClick = async (e) => {
    e.preventDefault();

    setErrors({});
    return await dispatch(
      thunkLogin({
        email:'demo@aa.io',
        password:'password',
      }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      })
  }

  useEffect(() => {
    if (sessionUser) {
      navigate(`/${sessionUser.id}/today`);
    }
  }, [sessionUser, navigate]);

  return (
    <div className="login-page-container">
      <div className="login-nav-container">
        <NavLink className="nav-logo-container" to="/">
          <img className="nav-logo" src={logo}/>
          <img className="nav-name-logo" src={nameLogo}/>
        </NavLink>
        <NavLink className="signup" to="/signup">Sign Up</NavLink>
      </div>
      <div className="login-form-container">
        <h1>Log In</h1>
        <div className="login-errors-container">
          {errors.length > 0 &&
            errors.map((message) => <p key={message}>{message}</p>)}
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <div className="login-input-container">
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
            <div className="login-errors-container">
              {errors.email && <p>{errors.email}</p>}
            </div>
          </div>
          <div>
            <div className="login-input-container">
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
            <div className="login-errors-container">
              {errors.password && <p>{errors.password}</p>}
            </div>
          </div>
          <button type="submit" className="login-button">Log In</button>
          <button type="button" className="login-button" onClick={handleDemoClick}>Log in as Demo User</button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormPage;
