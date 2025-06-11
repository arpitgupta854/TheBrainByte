import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";
import axios from "axios";
import "./UserDashBoard.css"; // Changed CSS filename to match

const Instructions = () => {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!qid) return;

    axios
      .get(`http://localhost:8090/quiz/${qid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Fetched Quiz Data:", res.data);
        setQuiz(res.data);
      })
      .catch((err) => console.error("Error fetching quiz data", err));
  }, [qid, token]);

  return (
    <>
      <Navbar />
      <div className="instruction-container">
        {!quiz ? (
          <p>Loading quiz details...</p>
        ) : (
          <>
            <div className="instruction-header">
              <h2>Quiz Instructions</h2>
            </div>

            <div className="instruction-content">
              <h3>{quiz?.title}</h3>
              <p className="quiz-description">{quiz?.description}</p>

              <div className="instructions-list">
                <h4 style={{textAlign:"center"}}>Important Guidelines</h4>
                <ul>
                  <li>This quiz is for practice purposes.</li>
                  <li>You must submit the quiz within <b> 20 minutes</b>.</li>
                  <li>You can attempt the quiz <b> multiple times </b>.</li>
                  <li>This quiz contains <strong> {quiz?.noofquestion} questions</strong>.</li>
                  <li>The Quiz carries <b> {quiz?.maxMarks} marks </b>. No negative marking.</li>
                  <li>All questions are of <b>MCQ type</b>.</li>
                  <li>The test report is automatically generated as a PDF.</li>
                </ul>
              </div>

              <a href={`/start/${qid}`}><button className="start-quiz-btn">Start Quiz</button></a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Instructions;
