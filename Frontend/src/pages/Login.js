import React, { useState} from "react";
import { useNavigate } from "react-router-dom"; 
import "./pages.css";
import Navbar from "../Component/Navbar";
import AuthService from "./authService";
import axios from "axios";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

     const navigate = useNavigate(); 
    const [error, Seterror] = useState(null);

    const formSubmit = async (event) => {
        event.preventDefault();
        const alertElement = document.querySelector(".show-alert1");
    
        if (!user.username.trim() || !user.password.trim()) {
            alertElement.innerText = "Something Went Wrong";
            alertElement.style.display = "block";
            setTimeout(() => alertElement.style.display = "none", 3000);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8090/generate-token", user);
            const token = response.data.token;
            if (token) {
                AuthService.login(token); 
    
                const userData = await AuthService.currentUser(); 
                if (userData) {
                    if (userData.authorities[0].authority === 'NORMAL') {
                        navigate("/user");
                    } else if (userData.authorities[0].authority === 'ADMIN') {
                        navigate("/admin");
                    } else {
                        navigate("/login");
                    }                    
                } else {
                    Seterror("Error fetching user details!");
                    setTimeout(() => Seterror(null), 3000);
                }
            } else {
                Seterror("Invalid response from server!");
                setTimeout(() => Seterror(null), 3000);
            }
        } catch (error) {
            Seterror("Username or Password is Wrong!!");
            setTimeout(() => Seterror(null), 3000);
            console.error("Login failed:", error);
        }
    
        setUser({ username: "", password: "" });
    };
    
  

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="image">
                    <img src="/images/logo.jpg" alt="Logo" />
                </div>
                <h1>Login Here !!</h1>
                <form onSubmit={formSubmit}>
                    <div className="input-field">
                        <input
                            type="text"
                            name="username"
                            placeholder="UserName"
                            value={user.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="register">Login</button>
                        <button
                            type="button"
                            className="clear"
                            onClick={() => setUser({ username: "", password: "" })}
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
            <p className="show-alert1">Hello</p>
            <p className="show-alert2">{error}</p>
        </>
    );
};

export default Login;