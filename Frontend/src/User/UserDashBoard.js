import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";
import axios from "axios";
import "./UserDashBoard.css";
import { Link } from "react-router-dom";

const UserDashBoard = () => {
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [showActive, setShowActive] = useState(true); // State to toggle between active and all quizzes
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:8090/category/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories", err));
  }, [token]);

  useEffect(() => {
    let url = "http://localhost:8090/quiz/"; // Default API for all quizzes

    if (categoryId) {
      url = `http://localhost:8090/category/${categoryId}/quizzes`; // Adjust based on active status
    }

    if (showActive) {
      url = categoryId
        ? `http://localhost:8090/quiz/category/active/${categoryId}`
        : `http://localhost:8090/quiz/active`;
    }

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.error("Error fetching quizzes", err));
  }, [categoryId, token, showActive]);

  // Navigate to the selected category
  const filterQuizzes = (id) => {
    navigate(`/user/${id}`);
  };

  // Show all quizzes
  const showAllQuizzes = () => {
    navigate(`/user`);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container" style={{ marginTop: "100px" }}>
        {/* Categories Section */}
        <div className="categories-section">
          <div className="categories-list">
            <button className={!categoryId ? "active" : ""} onClick={showAllQuizzes}>
              All Quizzes
            </button>
            {categories.map((category) => (
              <button
                key={category.cid}
                className={categoryId == category.cid ? "active" : ""}
                onClick={() => filterQuizzes(category.cid)}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

      

        {/* Quizzes Section */}
        <div className="quizzes-section">
          <h2>{showActive ? "Active Quizzes" : "All Quizzes"}</h2>
          <div className="quiz-list">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.qid} className="quiz-card">
                  <div className="quiz-img">
                    <img src="./images/quiz.jpg" alt="" />
                  </div>
                  <div className="quiz-content">
                    <h3 style={{ paddingBottom: "5px" }}>{quiz.title}</h3>
                    <h6 style={{ paddingBottom: "5px" }}>{quiz.category?.title || "No Category"}</h6>
                    <p style={{ paddingBottom: "5px" }}>{quiz.description}</p>
                    <button>View</button>
                    <Link to={`/user/instructions/${quiz.qId}`}>
          <button>Start</button>
        </Link>
                    <button style={{width:"150px"}}>Questions:{quiz.noofquestion}</button>
                    <button>Marks: {quiz.maxMarks}</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="quiz-child-class">No quizzes are scheduled for this category.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
