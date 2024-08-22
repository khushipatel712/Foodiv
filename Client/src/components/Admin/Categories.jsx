import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from "react-icons/fa";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ categoryName: '', description: '', image: null, adminId: '' });
    const [imagePreview, setImagePreview] = useState(null);
    const [adminId, setAdminId] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/categories');
            setCategories(response.data); // Directly set data if response is an array
            if (response.data.length > 0) {
                setAdminId(response.data[0].admin._id); // Example, adjust if necessary
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('categoryName', currentCategory.categoryName);
        formData.append('description', currentCategory.description);
        if (currentCategory.image) {
            formData.append('image', currentCategory.image);
        }
        formData.append('adminId', adminId);
    
        try {
            const response = await fetch('http://localhost:5001/api/categories', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Fetch categories again to update the list
            await fetchCategories();
            resetForm();
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };
    const handleEditCategory = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoryName', currentCategory.categoryName);
        formData.append('description', currentCategory.description);
        if (currentCategory.image) {
            formData.append('image', currentCategory.image);
        }
        formData.append('adminId', adminId);

        try {
            await axios.put(`http://localhost:5001/api/categories/${currentCategory._id}`, formData);
            fetchCategories();
            resetForm();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:5001/api/categories/${categoryId}`, {
                data: { admin: adminId }
        
            });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const resetForm = () => {
        setIsAdding(false);
        setIsEditing(false);
        setCurrentCategory({ categoryName: '', description: '', image: null, admin: adminId });
        setImagePreview(null);
    };

    const openEditModal = (category) => {
        setCurrentCategory(category);
        setIsEditing(true);
        if (category.image) {
            setImagePreview(`http://localhost:5001${category.image}`);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCurrentCategory({ ...currentCategory, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Menu</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                >
                    + Add Category
                </button>
            </div>

            {(isAdding || isEditing) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-10 items-center">
                    <form onSubmit={isEditing ? handleEditCategory : handleAddCategory} className="bg-white p-6 rounded-lg shadow-md z-10">
                        <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Category' : 'Add Category'}</h3>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={currentCategory.categoryName}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, categoryName: e.target.value })}
                            required
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            value={currentCategory.description}
                            onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="border p-2 rounded mb-2 w-full"
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mb-2 w-32 h-32 object-cover" />
                        )}
                        <div className="flex justify-end">
                            <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded-lg">{isEditing ? 'Update' : 'Add'}</button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-red-500 text-white px-2 py-1 rounded-lg ml-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-6">
                {categories.map(category => (
                    <div key={category._id} className="relative p-2 hover:bg-gray-100 flex justify-between items-center">
                        <h3 className="text-xl font-semibold">{category.categoryName}</h3>
                        <div className="flex flex-row">
                            <FaEdit 
                                className="text-gray-600 mr-2 cursor-pointer" 
                                onClick={() => openEditModal(category)} 
                            />
                            <FaTrash 
                                className="text-red-600 cursor-pointer" 
                                onClick={() => handleDeleteCategory(category._id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
