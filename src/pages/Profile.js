import React, { useEffect, useState } from "react";
import "./pages.css";
import AuthService from "../pages/authService";

const Profile = () => {
  const [user, setUser] = useState(null);

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

  // Show a loading state until the user data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h3>User Details</h3>
      <div className="profile-img">
        <img src="/images/user.png" alt="User" />
      </div>
      <div className="user-data">
        <table>
          <tbody>
            <tr>
              <td>UserName</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{user.firstname}</td>
            </tr>
            <tr>
              <td>Phone No</td>
              <td>{user.phone}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button>Update Profile</button>
    </div>
  );
};

export default Profile;
