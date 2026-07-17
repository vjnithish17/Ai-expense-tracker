import { useNavigate } from 'react-router-dom'
import"../css/login.css"
import { useState } from 'react';

const Login = () => {
     // -----------------Login ---------------------------------

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginerr, setloginerr] = useState("");
    const navigate = useNavigate();



  const admins = [
    {
      username: "admin1",
      password: "12345",
    },
    {
      username: "admin2",
      password: "123456",
    },
    {
      username: "admin3",
      password: "1234567",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const admin = admins.find((e) => e.username === username);

    if (admin) {
      if (admin.password === password) {
        localStorage.setItem("islogin", "true");
        localStorage.setItem("admin", admin.username);
        alert("Login successfully");
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
      <form className="login-card"onSubmit={handleLogin} >
        <h1>Admin Login</h1>
        <input
          type="text"
          placeholder="Admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {loginerr === "Username is Incorrect" &&
        <span>{loginerr}</span>
        }

        <input
        //   type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          {loginerr === "Password is Incorrect" &&
        <span>{loginerr}</span>
        }
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
