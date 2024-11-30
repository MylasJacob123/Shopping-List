import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/UserAuthenticationReducer";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.userAuthentication.currentUser
  );

  const validateLoginForm = () => {
    const errors = {};

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (password.length < 6 || password.length > 20) {
      errors.password = "Password must be between 6 and 20 characters.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const login = (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    if (currentUser) {
      alert("Login Successful");
      navigate("/add");
    }
  }, [currentUser, navigate]);

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <form className="login-form">
        <h1 className="login-heading">Login</h1>
        <h2 className="login-sub-heading">WELCOME BACK USER!</h2>
        <div>
          <input
            className="login-inputs"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="login-error">{errors.email}</p>}
        </div>
        <div>
          <input
            className="login-inputs"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="login-error">{errors.password}</p>}
        </div>
        <div>
          <button className="login-btn" onClick={login}>
            LOGIN
          </button>
          <div>
            <p className="login-text">
              Not registered yet? Then{" "}
              <span className="click" onClick={goToRegister}>
                click here
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;