import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserAuthenticationReducer";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Swal from "sweetalert2";

function Register() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (username.length === 0) {
      errors.username = "Username is required.";
    } else if (username.length > 25) {
      errors.username = "Username must be no more than 25 characters.";
    } else if (!/^[A-Z]/.test(username)) {
      errors.username = "Username must start with a capital letter.";
    }

    if (age < 18 || age > 90) {
      errors.age = "Age must be between 18 and 90.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (password.length < 6 || password.length > 20) {
      errors.password = "Password must be between 6 and 20 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const register = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = {
        id: Date.now(),
        username,
        age,
        email,
        password,
      };

      dispatch(addUser(user));

      Swal.fire({
        title: "Registration Successful!",
        text: "You have successfully registered.",
        icon: "success",
        confirmButtonText: "Login",
      }).then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please correct the highlighted errors.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={register}>
        <h1 className="register-heading">Register</h1>
        <h2 className="register-sub-heading">Welcome to our Clothing Shopping App</h2>

        <div>
          <input
            className="register-inputs"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <div className="register-error">{errors.username}</div>}
        </div>

        <div>
          <input
            className="register-inputs"
            type="number"
            name="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="18"
            max="90"
            required
          />
          {errors.age && <div className="register-error">{errors.age}</div>}
        </div>

        <div>
          <input
            className="register-inputs"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div className="register-error">{errors.email}</div>}
        </div>

        <div>
          <input
            className="register-inputs"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <div className="register-error">{errors.password}</div>}
        </div>

        <div>
          <button className="register-btn" type="submit">
            Register
          </button>
        </div>

        <p className="register-text">
          Already have an account? Then{" "}
          <span className="register-click" onClick={goToLogin}>
            click here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
