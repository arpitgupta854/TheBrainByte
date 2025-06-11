import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import './Inneradminpages.css';

const AddQuestion = () => {
  const { quizId } = useParams(); // Extract quizId from URL

  // Initial question state
  const [question, setQuestion] = useState({
    content: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    image: "", // Assuming the API supports image
  });

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Ensure all fields are filled
    if (
      !question.content ||
      !question.option1 ||
      !question.option2 ||
      !question.option3 ||
      !question.option4 ||
      !question.answer
    ) {
      Swal.fire("Error!", "Please fill all fields before submitting.", "error");
      return;
    }

    const token = localStorage.getItem("token"); // Get auth token

    // Construct request body in the correct format
    const questionData = {
      content: question.content,
      image: question.image, // Optional, depending on API
      option1: question.option1,
      option2: question.option2,
      option3: question.option3,
      option4: question.option4,
      answer: question.answer,
      quiz: { qId: quizId }, // Correct structure to match your API
    };

    try {
      await axios.post(`http://localhost:8090/question/`, questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire("Success!", "Question added to the quiz successfully!", "success");

      // Reset form fields after successful submission
      setQuestion({
        content: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        image: "",
      });

    } catch (error) {
      // Handle API errors
      if (error.response) {
        console.error("Error response:", error.response.data);
        Swal.fire("Error!", error.response.data.message || "Failed to add question.", "error");
      } else {
        console.error("Error submitting question:", error);
        Swal.fire("Error!", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="Add-question">
      <h1>Add New Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="add-question-content">
          <textarea
            rows="6"
            cols="70"
            placeholder="Enter the Description of Question"
            name="content"
            value={question.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="options">
          <div className="upper-option">
            <input
              type="text"
              placeholder="Option 1"
              name="option1"
              value={question.option1}
              onChange={handleChange}
              required
              className="text1"
            />
            <input
              type="text"
              placeholder="Option 2"
              name="option2"
              value={question.option2}
              onChange={handleChange}
              required
              className="text1"
            />
          </div>

          <div className="lower-options">
            <input
              type="text"
              placeholder="Option 3"
              name="option3"
              value={question.option3}
              onChange={handleChange}
              required
              className="text1"
            />
            <input
              type="text"
              placeholder="Option 4"
              name="option4"
              value={question.option4}
              onChange={handleChange}
              required
              className="text1"
            />
          </div>
        </div>

        <div className="answer">
          <select
            name="answer"
            value={question.answer}
            onChange={handleChange}
            required
            className="option1"
            style={{ width: "250px" }}
          >
            <option value="">Select Answer</option>
            <option value={question.option1}>{question.option1}</option>
            <option value={question.option2}>{question.option2}</option>
            <option value={question.option3}>{question.option3}</option>
            <option value={question.option4}>{question.option4}</option>
          </select>
        </div>
        <div className="submitbutton">
          <button type="submit">Add Question</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
