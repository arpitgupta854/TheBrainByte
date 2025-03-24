import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import "./Question.css";

const Question = () => {
  const { qid } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [warningCount, setWarningCount] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!qid) return;

    axios
      .get(`http://localhost:8090/question/quiz/${qid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions", err));
  }, [qid, token]);

  // Prevent back navigation
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
      Swal.fire("Security Alert", "Back navigation is disabled!", "warning");
    };
  }, []);

  // Detect tab switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        warnUser("Tab switching is not allowed!");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Detect window resize
  useEffect(() => {
    const handleResize = () => {
      warnUser("Resizing the window is not allowed!");
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Detect inspect element
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        warnUser("Inspecting the page is not allowed!");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Detect print screen attempt
  useEffect(() => {
    const handlePrintScreen = (e) => {
      if (e.key === "PrintScreen") {
        Swal.fire("Security Alert", "Screenshots are not allowed!", "error");
      }
    };

    document.addEventListener("keyup", handlePrintScreen);
    return () => {
      document.removeEventListener("keyup", handlePrintScreen);
    };
  }, []);

  // Warn the user and redirect after 3 warnings
  const warnUser = (message) => {
    Swal.fire("Security Warning", message, "warning");
    setWarningCount((prev) => {
      if (prev + 1 >= 3) {
        Swal.fire("Security Alert", "You have violated the rules multiple times!", "error").then(() => {
          navigate("/user");
        });
      }
      return prev + 1;
    });
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Quiz",
        text: "Please attempt at least one question before submitting!",
      });
      return;
    }

    let correctAnswers = 0;
    let attempted = 0;
    let totalMarks = 0;

    questions.forEach((q) => {
      if (answers[q.quesid]) {
        attempted++;
        if (answers[q.quesid] === q.answer) {
          correctAnswers++;
          totalMarks += 5;
        }
      }
    });

    setResult({ correctAnswers, attempted, totalMarks });
    setSubmitted(true);
  };

  const handleOk = () => {
    navigate("/user");
  };

  return (
    <>
      <Navbar />
      <div className="quiz-container2">
        <h2>Quiz Questions</h2>

        {submitted ? (
          <div className="result-section">
            <h1>Quiz Result</h1>
            <p>Total Questions: {questions.length}</p>
            <p>Attempted: {result?.attempted}</p>
            <p>Correct Answers: {result?.correctAnswers}</p>
            <p>Marks Scored: {result?.totalMarks}</p>

            <h3>Answers</h3>
            {questions.map((q) => (
              <div key={q.quesid} className="question-card">
                <h4>{q.content}</h4>
                <p>
                  <b>Your Answer:</b> {answers[q.quesid] || "Not Attempted"}
                </p>
                <p>
                  <b>Correct Answer:</b> {q.answer}
                </p>
              </div>
            ))}

            <button className="ok-btn" onClick={handleOk}>
              OK
            </button>
          </div>
        ) : (
          <>
            {questions.length > 0 ? (
              questions.map((q, index) => (
                <div key={q.quesid} className="question-card">
                  <h4>
                    {index + 1}. {q.content}
                  </h4>
                  <div className="options-container">
                    {[q.option1, q.option2, q.option3, q.option4].map(
                      (option, idx) => (
                        <label key={idx} className="option">
                          <input
                            type="radio"
                            name={`question-${q.quesid}`}
                            value={option}
                            checked={answers[q.quesid] === option}
                            onChange={() => handleAnswerChange(q.quesid, option)}
                          />
                          {option}
                        </label>
                      )
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Loading questions...</p>
            )}

            <button className="submit-btn" onClick={handleSubmit}>
              Submit Quiz
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default Question;
