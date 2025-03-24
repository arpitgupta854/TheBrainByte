import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "./authService"; 

const ProtectedRoute = ({ role }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const userData = await AuthService.currentUser(); 
                setUser(userData); 
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchUser();
    }, [token]); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user || !user.authorities || user.authorities.length === 0) {
        return <Navigate to="/login" />; 
    }

    const userRole = user.authorities[0]?.authority || "";

    if (role && userRole !== role) {
        return <Navigate to="/login" />; 
    }

    return <Outlet />; 
};

export default ProtectedRoute;
