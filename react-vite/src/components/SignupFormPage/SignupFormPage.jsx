import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import guyCheckList from '../../../images/guyCheckList.jpg';
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({});

  // if (sessionUser) return <Navigate to={`/${sessionUser.id}/today`} replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true) //
    // console.log(errors, firstName, lastName)

    if (Object.values(errors).length) return //

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        first_name: firstName,
        last_name: lastName,
        email,
        username,
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

  useEffect(() => {
    const newErrors = {}

    if (!firstName.length) newErrors.firstName = 'First name is required'
    else if (firstName.length < 2) newErrors.firstName  = 'First name must be at least 2 characters'

    if (!lastName.length) newErrors.lastName  = 'Last Name is required'
    else if (lastName.length < 2) newErrors.lastName = 'Last name must be at least 2 characters'

    if (!email.length) newErrors.email = 'Email is required'
    else if (email.length < 6) newErrors.email = 'Email must be at least 6 characters'

    if (!username.length) newErrors.username = 'Username is required'
    else if (username.length < 6) newErrors.username = 'Username must be at least 6 characters'

    if (!password.length) newErrors.password = 'Password is required'
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters'

    // if (password !== confirmPassword) newErrors.confirmPassword = 'Confirm Password field must be the same as the Password field'

    setErrors(newErrors)
  }, [firstName, lastName, email, password, username])

  useEffect(() => {
    if (sessionUser) {
      navigate(`/${sessionUser.id}/today`);
    }
  }, [sessionUser, navigate]);

  return (
    <div className="signup-page-container">
      <div className="signup-page-subcontainer">
        <div className="signup-navbar">
          <NavLink to="/" className="signup-logo">TaskingIt</NavLink>
        </div>
        <div className="signup-content">
          <div className="signup-form-content">
            <h1>Sign Up</h1>
            <div className="signup-errors-container">
              {errors.server && <p>{errors.server}</p>}
            </div>
            <form onSubmit={handleSubmit} className="signup-form">
              <div>
                <div className="signup-input-container">
                  <label>
                    First Name
                    <input
                      type="text"
                      value={firstName}
                      placeholder="Enter your first name..."
                      onChange={(e) => setFirstName(e.target.value)}
                      maxLength={40}
                      required
                    />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {submitted && errors.firstName && <p>{errors.firstName}</p>}
                </div>
              </div>
              <div>
                <div className="signup-input-container">
                  <label>
                    Last Name
                    <input
                      type="text"
                      value={lastName}
                      placeholder="Enter your last name..."
                      onChange={(e) => setLastName(e.target.value)}
                      maxLength={40}
                      required
                    />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {submitted && errors.lastName && <p>{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <div className="signup-input-container">
                  <label>
                    Email
                    <input
                      type="email"
                      value={email}
                      placeholder="Enter your email..."
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {submitted && errors.email && <p>{errors.email}</p>}
                </div>
              </div>
              <div>
                <div className="signup-input-container">
                  <label>
                    Username
                    <input
                      type="text"
                      value={username}
                      placeholder="Enter your username..."
                      onChange={(e) => setUsername(e.target.value)}
                      maxLength={20}
                      required
                    />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {submitted && errors.username && <p>{errors.username}</p>}
                </div>
              </div>
              <div>
                <div className="signup-input-container">
                  <label>
                    Password
                    <input
                      type="password"
                      value={password}
                      placeholder="Enter your password..."
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {submitted && errors.password && <p>{errors.password}</p>}
                </div>
              </div>
              <div>
                <div className="signup-input-container">
                  <label>
                    Confirm Password
                    <input
                      type="password"
                      value={confirmPassword}
                      placeholder="Confirm your password..."
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <div className="signup-errors-container">
                  {submitted && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
              </div>
              <button className="signup-button" type="submit">Sign Up</button>
            </form>
          </div>
          <div className="signup-image-container">
            <img src={guyCheckList} className="signup-image"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
