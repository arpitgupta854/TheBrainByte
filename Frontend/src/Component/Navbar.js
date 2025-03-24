import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../pages/authService"; 
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userData = await AuthService.currentUser(); 
        setUser(userData); 
      }
    };
    fetchUser();
  }, []); 

  const handleLogout = () => {
    AuthService.logout(); 
    setUser(null); 
    navigate("/login"); 
  };

  return (
    <div className="nav-bar">
      <div className="nav-left-container">
        <div className="nav-logo">
          <Link to="/"><img src="/images/logo.jpg" alt="Logo" /></Link>
        </div>
        <div className="nav-name">
          <p>Exam Portal</p>
        </div>
      </div>

      <div className="nav-right-container">
        {user ? (
          <>
           <div className="signin-button">
            <button>{user.username}</button>
            </div>
            <div className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <div className="login-button">
              <Link to="/login"><button>Login</button></Link>
            </div>
            <div className="signin-button">
              <Link to="/SignUp"><button>Sign Up</button></Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
