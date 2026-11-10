import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginerr, setloginerr] = useState("");

  const navigate = useNavigate();

 

  const handleLogin = (e) => {
    e.preventDefault();
    setloginerr("");

    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    const admin = admins.find((user) => user.username === username.trim());

    if (!admin) {
      setloginerr("Username is Incorrect");
      return;
    }

    if (admin.password !== password) {
      setloginerr("Password is Incorrect");
      return;
    }

    // Clear previous user's session
    localStorage.removeItem("admin");

    // Set current logged-in user
    localStorage.setItem("admin", admin.username);
    localStorage.setItem("islogin", "true");

    alert("Login Successfully");
    navigate("/Dashboard");
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h1>Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {loginerr === "Username is Incorrect" && <span>{loginerr}</span>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loginerr === "Password is Incorrect" && <span>{loginerr}</span>}

        <button type="submit">Login</button>

        <p className="register-text">
          Don't have an account?
          <span className="register-link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
