import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Inneradminpages/Home";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import AdminDashboard from "./Admin/AdminDashboard";
import UserDashBoard from "./User/UserDashBoard";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddCategories from "./Inneradminpages/AddCategories";
import Categories from "./Inneradminpages/Categories";
import Quiz from "./Inneradminpages/Quiz";
import AddQuiz from "./Inneradminpages/AddQuiz";
import Home1 from "./Home1";
import UpdateQuiz from "./Inneradminpages/UpdateQuiz";
import Question from "./Inneradminpages/Question";
import AddQuestion from "./Inneradminpages/AddQuestion";
import Instructions from "./User/Instructions";
import Question1 from "./User/Question1";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes for Normal User */}
        <Route element={<ProtectedRoute role="NORMAL" />}>
          <Route path="/user" element={<UserDashBoard />} />
          <Route path="/user/:categoryId" element={<UserDashBoard />} />
          <Route path="/user/instructions/:qid" element={<Instructions />} />
          <Route path="/start/:qid" element={<Question1/>}/>
        </Route>

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute role="ADMIN" />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="AddCategories" element={<AddCategories />} />
            <Route path="Categories" element={<Categories />} />
            <Route path="Quiz" element={<Quiz />} />
            <Route path="AddQuiz" element={<AddQuiz />} />
            <Route path="Quiz/UpdateQuiz/:qId" element={<UpdateQuiz />} />
            <Route path="Quiz/Questions/:qId/:qtitle" element={<Question />} />
            <Route path="/admin/addquestion/:quizId" element={<AddQuestion />} />
          </Route>
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;