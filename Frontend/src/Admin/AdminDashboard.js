import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import "./Admin.css";

const menuItems = [
  { name: "Home", path: "/admin/home" },
  { name: "Profile", path: "/admin/profile" },
  { name: "Categories", path: "/admin/Categories" },
  { name: "Add Categories", path: "/admin/AddCategories" },
  { name: "Quiz", path: "/admin/Quiz" },
  { name: "Add Quiz", path: "/admin/AddQuiz" },

];

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <div className="container1">
        <div className="menu-container">
          <h4>Menu</h4>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
