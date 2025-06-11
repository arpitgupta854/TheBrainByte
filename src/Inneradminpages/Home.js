import React from "react";
import "./Inneradminpages.css";

const stats = [
  { title: "Total Students", count: 100, color: "#3498db" },
  { title: "Total Teachers", count: 20, color: "#e67e22" },
  { title: "Total Categories", count: 10, color: "#2ecc71" },
  { title: "Total Quizzes", count: 50, color: "#9b59b6" },
  { title: "Active Users", count: 85, color: "#1abc9c" },
  { title: "Pending Quizzes", count: 5, color: "#f39c12" },
];

const Home = () => {
  return (
    <div className="admin-home-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* Upper Section */}
      <div className="upper-admin-home">
        {stats.slice(0, 2).map((stat, index) => (
          <div 
            className="info-box"
            key={index}
            style={{ borderBottom: `4px solid ${stat.color}` }}
          >
            <h3>{stat.title}</h3>
            <p>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Lower Section */}
      <div className="lower-admin-home">
        {stats.slice(2, 4).map((stat, index) => (
          <div 
            className="info-box"
            key={index}
            style={{ borderBottom: `4px solid ${stat.color}` }}
          >
            <h3>{stat.title}</h3>
            <p>{stat.count}</p>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="extra-stats">
        {stats.slice(4).map((stat, index) => (
          <div 
            className="info-box small"
            key={index}
            style={{ borderBottom: `4px solid ${stat.color}` }}
          >
            <h4>{stat.title}</h4>
            <p>{stat.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
