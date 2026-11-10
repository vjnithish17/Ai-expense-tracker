import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerErr, setRegisterErr] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setRegisterErr("");

    // Password match check
    if (password !== confirmPassword) {
      setRegisterErr("Passwords do not match");
      return;
    }

    // Get users from localStorage
    const admins = JSON.parse(localStorage.getItem("admins")) || [];

    // Username already exists
    const userExists = admins.find(
      (user) => user.username === username
    );

    if (userExists) {
      setRegisterErr("Username already exists");
      return;
    }

    // Save new user
    admins.push({
      username,
      password,
    });

    localStorage.setItem("admins", JSON.stringify(admins));

    alert("Registration Successful");
    navigate("/");
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleRegister}>
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {registerErr && <span>{registerErr}</span>}

        <button type="submit">Register</button>

        <p className="register-text">
          Already have an account?
          <span
            className="register-link"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
