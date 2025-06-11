import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Inneradminpages.css";

const Question = () => {
  const { qId, qtitle } = useParams();
  const [questions, setQuestions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchQuizData();
  }, [qId]);

  // Function to fetch questions
  const fetchQuizData = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/question/quiz/${qId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(response.data);  
    } catch (error) {
      console.error("Error fetching quiz:", error);
      Swal.fire("Error!", "Failed to load questions.", "error");
    }
  };

  // Function to delete a question
  const deleteQuestion = async (quesId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8090/question/${quesId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Remove the deleted question from state
          setQuestions(questions.filter((question) => question.quesid !== quesId));

          Swal.fire("Deleted!", "The question has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting question:", error);
          Swal.fire("Error!", "Failed to delete question.", "error");
        }
      }
    });
  };

  return (
    <div className="Question-container">
      <h1>All Questions for {decodeURIComponent(qtitle)}</h1>

      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((question, index) => (
          <div className="question-content" key={index}>
            <h3>{index + 1}. {question.content}</h3>

            <div className="option-container">
              <div className="upper-option-container">
                <p style={{ marginRight: "20px" }}>1. {question.option1}</p>
                <p>2. {question.option2}</p>
              </div>
              <div className="lower-option-container">
                <p style={{ marginRight: "20px" }}>3. {question.option3}</p>
                <p>4. {question.option4}</p>
              </div>
            </div>

            <div className="answer">
              <p style={{ marginLeft: "10px" }}>Answer: {question.answer}</p>
              <div className="delete-button">
                <button onClick={() => deleteQuestion(question.quesid)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
      
      <div className="addquestion">
        <a href={`/admin/addquestion/${qId}`}>
          <button>Add Question</button>
        </a>
      </div>
    </div>
  );
};

export default Question;
