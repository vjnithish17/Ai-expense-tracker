import { NavLink, useNavigate } from "react-router-dom";
import "../css/nav.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
      const navigate = useNavigate();

       const Admin = localStorage.getItem("admin");

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("islogin");
    localStorage.removeItem("admin");
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="logo">
         AI Expense Tracker
      </div>
         <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

      <ul className={menuOpen ?"nav-links active":"nav-links" } >
        <li>
          <NavLink to="/Dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/transactions">Transactions</NavLink>
        </li>

        <li>
          <NavLink to="/add">Add</NavLink>
        </li>

        <li>
          <NavLink to="/analytics">Analytics</NavLink>
        </li>

        <li>
          <NavLink to="/ai">AI Insights</NavLink>
        </li>
        <li className="user">
          {Admin}
        </li>

         <li>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>

        {/* <li>
          <NavLink to="/chat">AI Chat</NavLink>
        </li> */}

      </ul>

    </nav>
  );
}

export default Navbar;
