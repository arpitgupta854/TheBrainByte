import React, { useState } from 'react';
import Navbar from '../Component/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import './pages.css';

const SignUp = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  });

 
  const formSubmit = async (event) => {
    event.preventDefault();
    const alertElement = document.querySelector('.show-alert');
    try {
      const response = await axios.post('http://localhost:8090/user/', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // On successful registration
      Swal.fire({
        title: 'Success!',
        text: 'Successfully registered!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      // Clear form fields after successful registration
      setUser({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
      });
  
      // Show success message
      alertElement.innerText = 'Successfully registered!';
      alertElement.style.display = 'block';
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 3000);
  
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong!';
      const errorCode = error.response ? error.response.status : null;
  
      // Handle specific error like user already exists (409 Conflict)
      if (errorCode === 409) {
        alertElement.innerText = 'User already exists!';
      } else {
        alertElement.innerText = errorMessage || 'Something went wrong!';
      }
      
      // Show error message, but do not clear fields
      alertElement.style.display = 'block';
      setTimeout(() => {
        alertElement.style.display = 'none';
      }, 3000);
  
      // Show error in SweetAlert
      Swal.fire({
        title: 'Error!',
        text: errorMessage || 'User Already Exit!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setUser({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
      });
  
    }
  };
     

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <p className='show-alert'>Hello</p>
      <div className="container">
        <div className="image">
          <img src="/images/logo.jpg" alt="Logo" />
        </div>
        <h1>Register Here !!</h1>
        <form onSubmit={formSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="username"
              placeholder="UserName"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              name="firstname"
              placeholder="FirstName"
              value={user.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              name="lastname"
              placeholder="LastName"
              value={user.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <input
              type="phone"
              name="phone"
              placeholder="Your Phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit" className="register">
              Register
            </button>
            <button
              type="button"
              className="clear"
              onClick={() =>
                setUser({
                  username: '',
                  password: '',
                  firstname: '',
                  lastname: '',
                  email: '',
                  phone: '',
                })
              }
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
