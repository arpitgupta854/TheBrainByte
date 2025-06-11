import React, { useState, useEffect } from "react";
import "./Inneradminpages.css";
import axios from "axios";
import Swal from "sweetalert2";

const AddQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    maxMarks: "",
    noofquestion: "",
    category: {}, // Store full category object
    active: false, // Default to false
  });

  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8090/category/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [token]);

  // Handle text input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      [name]: value,
    }));
  };

  // Handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategory = categories.find(
      (cat) => cat.cid.toString() === event.target.value
    );
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      category: selectedCategory || {}, // Store full category object
    }));
  };

  // Handle active status change
  const handlePublicChange = (event) => {
    setQuiz((prevQuiz) => ({
      ...prevQuiz,
      active: event.target.value === "true", // Convert string to boolean
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting quiz:", JSON.stringify(quiz, null, 2));

    try {
      await axios.post("http://localhost:8090/quiz/", quiz, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      Swal.fire("Success!", "Quiz added successfully!", "success");

      setQuiz({
        title: "",
        description: "",
        maxMarks: "",
        noofquestion: "",
        category: {},
        active: false, // Reset to default
      });
    } catch (error) {
      Swal.fire("Error!", "Failed to add quiz.", "error");
      console.error("Error adding quiz:", error);
    }
  };

  return (
    <div className="add-quiz-container">
      <h1>Add New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={quiz.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          rows="8"
          cols="70"
          placeholder="Enter the Description"
          name="description"
          value={quiz.description}
          onChange={handleChange}
          required
        />
        <br />
        <div className="no-of-columns">
          <input
            type="number"
            placeholder="Enter Max Marks"
            name="maxMarks"
            value={quiz.maxMarks}
            onChange={handleChange}
            required
            className="text1"
          />
          <input
            type="number"
            placeholder="Enter No. of Questions"
            name="noofquestion"
            value={quiz.noofquestion}
            onChange={handleChange}
            required
            className="text1"
          />
        </div>

        {/* Category Selection */}
        <div className="category">
          <label>Category:</label>
          <select
            name="category"
            value={quiz.category.cid || ""}
            onChange={handleCategoryChange}
            required
            className="option1"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.cid} value={category.cid}>
                {category.title}
              </option>
            ))}
          </select>
          <br />

          {/* Public/Private Selection */}
          <label>Active:</label>
          <select
            name="active"
            value={quiz.active.toString()} // Ensure correct value binding
            onChange={handlePublicChange}
            required
            className="option1"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <br />
        </div>

        <div className="addcategorybutton">
          <button type="submit">Add Quiz</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
