import React, { useState, useEffect } from 'react';
import './Inneradminpages.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const Categories = () => {
    const [categories1, setCategories1] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8090/category/", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });

                console.log("Fetched Categories:", response.data); 
                setCategories1(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                 Swal.fire({
                        title: 'Error! Fetching Details',
                        text: error || 'Error Fetching Details',
                        icon: 'error',
                        confirmButtonText: 'OK',
                     });
            }
        };

        fetchCategories();
    }, [token]); 

    const deleteCategory = async (cid) => {
        try {
            await axios.delete(`http://localhost:8090/category/${cid}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            // Remove the deleted category from state
            setCategories1(categories1.filter(category => category.cid !== cid));
    
            Swal.fire({
                title: 'Deleted!',
                text: 'Category has been deleted.',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (error) {
            console.error("Error deleting category:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to delete category',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
    

    return (
        <>
           <div className="category-element">
           <h1>All Categories</h1>
        {categories1.map((category, index) => (
        <div className="category-innner-element" key={index}>
            <p style={{ marginBottom: "9px" }}>{category.title}</p>
            <p>{category.description}</p>
            <div className="deletebutton">
                <button onClick={() => deleteCategory(category.cid)}>Delete</button>
            </div>
        </div>
    ))}
</div>

            <div className="addcategorybutton">
              <a href="/admin/AddCategories"><button>Add Category</button></a>
            </div>
        </>
    );
};

export default Categories;
