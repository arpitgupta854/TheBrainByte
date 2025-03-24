import React, { useState, useEffect } from 'react';
import './Inneradminpages.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize useNavigate


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:8090/quiz/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Fetched Quizzes:", response.data);
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Error Fetching Quizzes',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    };

    fetchQuizzes();
  }, [token]);

  const deleteQuiz = async (qId) => {
    // 🔹 Show confirmation dialog before deleting
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this quiz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8090/quiz/${qId}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Remove deleted quiz from state
        setQuiz(quiz.filter((q) => q.qId !== qId));

        Swal.fire({
          title: 'Deleted!',
          text: 'Quiz has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error("Error deleting quiz:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete quiz.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    }
  };

  return (
    <>
      <div className="quiz-container" style={{marginLeft:"60px"}}>
        <h1>All Quizzes</h1>
        {quiz.map((quiz, index) => (
          <div className="category-inner-element" key={index}>
            <div className="quiz-container1">
              <div className="quiz-container-img">
                <img src="/images/quiz.jpg" alt="Quiz" />
              </div>
              <div className="quiz-container-rightside">
                <h4>{quiz.title}</h4>
                <p style={{ fontSize: "15px", marginTop: "5px" }}>{quiz.category?.title}</p>
              </div>
            </div>
            <p style={{ marginLeft: "60px" }}>{quiz.description}</p>
            <div className="quizbuttons">
              <div className="buttonofquiz">
                <button onClick={() => navigate(`/admin/Quiz/Questions/${quiz.qId}/${quiz.title}`)}>Questions</button>
                <button>Marks: {quiz.maxMarks}</button>
                <button>Questions: {quiz.noofquestion}</button>
                <button>Attempts</button>
                <button onClick={() => navigate(`/admin/Quiz/UpdateQuiz/${quiz.qId}`)}>Update</button>
                <button onClick={() => deleteQuiz(quiz.qId)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="addcategorybutton" style={{marginTop:"15px"}}>
        <a href="/admin/AddQuiz">
          <button>Add Quiz</button>
        </a>
      </div>
    </>
  );
};

export default Quiz;
