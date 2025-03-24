import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Inneradminpages.css";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateQuiz = () => {
  const [quiz, setQuiz] = useState(null);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { qId } = useParams();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/quiz/${qId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8090/category/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (qId) {
      fetchQuizData();
      fetchCategories();
    }
  }, [qId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find((cat) => cat.cid.toString() === e.target.value);
    setQuiz({ ...quiz, category: selectedCategory || {} });
  };

  // Handle active status change
  const handleActiveChange = (e) => {
    setQuiz({ ...quiz, active: e.target.value === "true" }); // Convert string to boolean
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this quiz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:8090/quiz/${qId}`, quiz, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("Updated!", "Quiz updated successfully.", "success");
        navigate("/admin/Quiz"); // Redirect after update
      } catch (error) {
        Swal.fire("Error!", "Failed to update quiz.", "error");
        console.error("Error updating quiz:", error);
      }
    }
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="add-quiz-container">
      <h1>Update Quiz</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" name="title" value={quiz.title} onChange={handleChange} required />
        <br />
        <textarea name="description" value={quiz.description} onChange={handleChange} required />
        <br />
        <div className="no-of-columns">
          <input type="number" name="maxMarks" value={quiz.maxMarks} onChange={handleChange} required className="text1" />
          <input type="number" name="noofquestion" value={quiz.noofquestion} onChange={handleChange} required className="text1" />
        </div>
        <br />

        {/* Category Selection */}
        <label>Category:</label>
        <select name="category" value={quiz.category.cid || ""} onChange={handleCategoryChange} required className="option1">
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.cid} value={cat.cid}>
              {cat.title}
            </option>
          ))}
        </select>
        <br />

        {/* Active Status Selection */}
        <label>Active Status:</label>
        <select name="active" value={quiz.active.toString()} onChange={handleActiveChange} required className="option1">
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <br />

        <div className="addcategorybutton">
          <button type="submit">Update Quiz</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateQuiz;
