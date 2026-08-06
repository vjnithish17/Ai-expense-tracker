import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginerr, setloginerr] = useState("");

  const navigate = useNavigate();

  // Get registered users from localStorage
  const admins = JSON.parse(localStorage.getItem("admins")) || [];

  const handleLogin = (e) => {
    e.preventDefault();

    setloginerr("");

    const admin = admins.find((user) => user.username === username);

    if (admin) {
      if (admin.password === password) {
        localStorage.setItem("islogin", "true");
        localStorage.setItem("admin", admin.username);

        alert("Login Successfully");
        navigate("/Dashboard");
      } else {
        setloginerr("Password is Incorrect");
      }
    } else {
      setloginerr("Username is Incorrect");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Admin Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {loginerr === "Username is Incorrect" && (
          <span>{loginerr}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loginerr === "Password is Incorrect" && (
          <span>{loginerr}</span>
        )}

        <button type="submit">Login</button>

        <p className="register-text">
          Don't have an account?
          <span
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
