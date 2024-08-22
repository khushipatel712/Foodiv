import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetProfileQuery } from '../../services/adminApi';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import AddSubCategoryModal from './AddSubCategoryModal';

const AddMenuItem = () => {
  const { menuItemId } = useParams(); // Get menuItemId from URL
  const [showVariantForm, setShowVariantForm] = useState(false);
  const [variantFields, setVariantFields] = useState([{ name: '', price: '', comparePrice: '' }]);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [description, setDescription] = useState('');
  const token = Cookies.get('token');
  const { data: profileData } = useGetProfileQuery(token);

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:5001/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  // Fetch menu item data for editing
  useEffect(() => {
    if (menuItemId) {
      axios.get(`http://localhost:5001/api/menu-items/${menuItemId}`)
        .then(response => {
          const data = response.data;

          setProductName(data.name || '');
          setPrice(data.price || '');
          setComparePrice(data.comparePrice || '');
          setIsVeg(data.veg || true);
          setDescription(data.description || '');
          setSelectedCategory(data.category._id || '');
          setSelectedSubCategory(data.subCategory || '');

          // console.log(selectedSubCategory)

          // Fetch subcategories for the selected category
          if (data.category._id) {
            fetchSubCategories(data.category._id);
          }
          else{
            console.log('no subcategory found')
          }
        })
        .catch(error => console.error("Error fetching menu item:", error));
    }
  }, [menuItemId]);

  // Fetch subcategories
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/subcategories/${categoryId}`);
      if (response.data.length > 0) {
        setSubCategories(response.data);
      } else {
        setSubCategories([]); // No subcategories for this category
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

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
    setSelectedCategory(categoryId);
    setSelectedSubCategory('');

    if (categoryId) {
      // Fetch subcategories only if the category is valid
      try {
        const response = await axios.get(`http://localhost:5001/api/subcategories/${categoryId}`);
        if (response.data.length > 0) {
          setSubCategories(response.data);
        } else {
          setSubCategories([]); // No subcategories
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    } else {
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = (event) => {
    const value = event.target.value;
    if (value === 'add_subcategory') {
      setShowSubCategoryModal(true);
    } else {
      setShowSubCategoryModal(false);
      setSelectedSubCategory(value || '');
    }
  };

  const handleTypeChange = (event) => {
    setIsVeg(event.target.value === 'veg');
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', productName || '');
      formData.append('price', price || '');
      formData.append('comparePrice', comparePrice || '');
      formData.append('veg', isVeg ? 'true' : 'false');
      formData.append('description', description || '');
      formData.append('category', selectedCategory || '');
      formData.append('adminId', profileData?.id);
      if (selectedSubCategory) {
        formData.append('subCategory', selectedSubCategory);
      }

      const endpoint = menuItemId 
        ? `http://localhost:5001/api/menu-items/${menuItemId}` 
        : 'http://localhost:5001/api/menu-items';
      const method = menuItemId ? 'put' : 'post';

      const response = await axios({ 
        method, 
        url: endpoint, 
        data: formData,
        headers: { 'Content-Type': 'form-data' } 
      });

      console.log("Menu Item Updated:", response.data);
      // Handle success (e.g., display a success message, redirect, etc.)
    } catch (error) {
      console.error("Error updating menu item:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {menuItemId ? 'Edit Menu Item' : 'Add Menu Item'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input 
              type="text" 
              placeholder="Product Name" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={productName || ''}
              onChange={(e) => setProductName(e.target.value)} 
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={selectedCategory || ''}
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
                value={selectedSubCategory || ''}
              >
                <option value="" disabled>Select a subcategory</option>
                <option value="">None</option>
                {
                  subCategories.map((subCategory) => (
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
              value={price || ''}
              onChange={(e) => setPrice(e.target.value)} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Compare Price</label>
            <input 
              type="text" 
              placeholder="Compare Price" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={comparePrice || ''}
              onChange={(e) => setComparePrice(e.target.value)} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea 
              rows="4" 
              placeholder="Description" 
              className="w-full p-2 border border-gray-300 rounded-md" 
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Type</label>
            <div className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input 
                  type="radio" 
                  value="veg" 
                  checked={isVeg} 
                  onChange={handleTypeChange} 
                  className="form-radio" 
                />
                <span className="ml-2">Veg</span>
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio" 
                  value="non-veg" 
                  checked={!isVeg} 
                  onChange={handleTypeChange} 
                  className="form-radio" 
                />
                <span className="ml-2">Non-Veg</span>
              </label>
            </div>
          </div>

          <button 
            onClick={handleSubmit} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {menuItemId ? 'Update' : 'Add'} Menu Item
          </button>
        </div>

        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Variants</h3>
          {variantFields.map((field, index) => (
            <div key={index} className="mb-4">
              <div className="flex mb-2">
                <div className="w-1/3">
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Variant Name" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    value={field.name || ''}
                    onChange={(e) => handleInputChange(index, e)} 
                  />
                </div>
                <div className="w-1/3 mx-2">
                  <label className="block text-gray-700 font-medium mb-2">Price</label>
                  <input 
                    type="text" 
                    name="price" 
                    placeholder="Variant Price" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    value={field.price || ''}
                    onChange={(e) => handleInputChange(index, e)} 
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-gray-700 font-medium mb-2">Compare Price</label>
                  <input 
                    type="text" 
                    name="comparePrice" 
                    placeholder="Variant Compare Price" 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    value={field.comparePrice || ''}
                    onChange={(e) => handleInputChange(index, e)} 
                  />
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={handleAddVariantField} 
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add Variant
          </button>
        </div>*/}
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
