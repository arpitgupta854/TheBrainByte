import React, { useState } from 'react'
import './Inneradminpages.css';
import axios from 'axios';
import Swal from 'sweetalert2';
const AddCategories = () => {
  
  const[addCategory,setaddCategory]=useState(
  {
    title:"",
    description:"",
  }
  );
  const token = localStorage.getItem("token");
  const formsubmit=(event)=>{
    event.preventDefault();

    try{
      const response= axios.post('http://localhost:8090/category/',addCategory,{
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

    
     Swal.fire({
            title: 'Success!',
            text: 'Successfully registered!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
      
          setaddCategory({
            title:"",
            description:"",
          });
        }
        catch(error){
         console.error("Error:", error);
         Swal.fire({
          title: 'Error!',
          text: ' Not Successfully registered!',
          icon: 'error',
          confirmButtonText: 'OK',
        });
    
        setaddCategory({
          title:"",
          description:"",
        });
        }
    
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setaddCategory((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
};
  return (
   <>
       <div className="category-container">
       <h1>Add Categories</h1>
       <div className="addCategories">
        <form onSubmit={formsubmit}>
          <input type="text"placeholder='Enter Category' name="title" value={addCategory.title}  onChange={handleChange} required/>
          <br />
          <textarea
                rows="8"
                cols="70"
                placeholder="Enter the Description of Category"
                name="description"
                value={addCategory.description}
                onChange={handleChange}
                required
            />
          <br />
          <div className="addcategorybutton">
              <button type='submit'>Add Category</button>
            </div>
        </form>
       </div>
       </div>
   
   </>
  )
}

export default AddCategories