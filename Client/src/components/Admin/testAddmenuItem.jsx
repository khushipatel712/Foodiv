import React, { useState, useEffect } from 'react';
import AddSubCategoryModal from './AddSubCategoryModal';  
import { useGetProfileQuery } from '../../services/adminApi';
import axios from 'axios';
import Cookies from 'js-cookie';

const AddMenuItem = () => {
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantFields, setVariantFields] = useState([{ name: '', price: '', comparePrice: '' }]);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]); // New state for subcategories
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(''); 
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [isVeg, setIsVeg] = useState(true); 
  const [description, setDescription] = useState('');
  const token = Cookies.get('token');
  const { data: profileData } = useGetProfileQuery(token);

  useEffect(() => {
    axios.get('http://localhost:5001/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  useEffect(() => {
    console.log("Modal state:", showSubCategoryModal);
  }, [showSubCategoryModal]);

  useEffect(() => {
    console.log("Profile Data:", profileData);
  }, [profileData]);

  const handleAddVariantField = () => {
    setVariantFields([...variantFields, { name: '', price: '', comparePrice: '' }]);
  };

  const handleInputChange = (index, event) => {
    const values = [...variantFields];
    values[index][event.target.name] = event.target.value;
    setVariantFields(values);
  };

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    console.log(categoryId)
    setSelectedCategory(categoryId); 
    setSelectedSubCategory(''); 

    try {
      const response = await axios.get(`http://localhost:5001/api/subcategories/${categoryId}`);
      setSubCategories(response.data); // Set fetched subcategories to state
    } catch (error) {
      console.error("There was an error fetching the subcategories!", error);
    }
  };

  const handleSubCategoryChange = (event) => {
    const value = event.target.value;
    console.log("SubCategory Changed:", value);
    if (value === 'add_subcategory') {
      setShowSubCategoryModal(true);
    } else {
      setShowSubCategoryModal(false);
      setSelectedSubCategory(value); 
    }
  };

  const handleTypeChange = (event) => {
    setIsVeg(event.target.value === 'veg'); 
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productName);
      formData.append('price', price);
      formData.append('comparePrice', comparePrice);
      formData.append('veg', isVeg ? true : false); // Ensure this field is included
      formData.append('description', description);
      formData.append('adminId', profileData?.id);
      formData.append('category', selectedCategory);
      formData.append('subCategory', selectedSubCategory);
  
      console.log("Submitting Form Data:", Object.fromEntries(formData.entries())); // Log the FormData entries
  
      const response = await axios.post('http://localhost:5001/api/menu-items', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type
        },
      });
      console.log("Menu Item Added:", response.data);
  
      // Handle success (e.g., display a success message, clear form, etc.)
    } catch (error) {
      console.error("There was an error adding the menu item!", error.response?.data || error.message);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Menu Item</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input 
              type="text" 
              placeholder="Product Name" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={productName}
              onChange={(e) => setProductName(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">SubCategory</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={handleSubCategoryChange}
                value={selectedSubCategory}
              >
                <option value="" disabled>Select a subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
                <option key="add_subcategory" value="add_subcategory">Add SubCategory</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input 
              type="text" 
              placeholder="Price" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={price}
              onChange={(e) => setPrice(e.target.value)} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Compare Price</label>
            <input 
              type="text" 
              placeholder="Compare Price" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={comparePrice}
              onChange={(e) => setComparePrice(e.target.value)} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Type</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="type" 
                  value="veg" 
                  className="form-radio" 
                  checked={isVeg}
                  onChange={handleTypeChange} 
                />
                <span className="ml-2">Veg</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="type" 
                  value="nonveg" 
                  className="form-radio"
                  checked={!isVeg}
                  onChange={handleTypeChange} 
                />
                <span className="ml-2">Non-Veg</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea 
              placeholder="Describe Product Detail" 
              rows={4} 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)} 
            ></textarea>
          </div>

          <button 
            className="bg-gray-500 text-white px-4 py-1 rounded-2xl"
            onClick={handleSubmit} 
          >
            Save
          </button>
        </div>
      </div>

      {showSubCategoryModal && (
        <AddSubCategoryModal
          isOpen={showSubCategoryModal}
          onClose={() => setShowSubCategoryModal(false)}
          category={selectedCategory}
          adminId={profileData?.id}
        />
      )}
    </div>
  );
};

export default AddMenuItem;
