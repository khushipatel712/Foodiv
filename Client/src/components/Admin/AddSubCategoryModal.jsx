import React, { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import axios from 'axios';

const AddSubCategoryModal = ({ isOpen, onClose, category, adminId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // console.log('ctawe:',category);
  // console.log('cadmin:',adminId);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('category', category);  
    formData.append('adminId', adminId);   
    
    console.log("Submitting Form Data:", Array.from(formData.entries()));

    try {
      const response = await axios.post('http://localhost:5001/api/subcategory', formData, {
        headers: {
          'Content-Type': 'form-data'
        }
      });

      console.log('SubCategory created:', response.data);
      onClose(); // Close the modal after successful save
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  if (!isOpen) return null;

console.log('Modal isOpen:', isOpen);
  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold mb-4">Add SubCategory</div>
            <button
              className="text-gray-800 hover:text-black"
              onClick={onClose}
            >
              <IoIosClose className="size-8 font-bold" />
            </button>
          </div>
          {/* SubCategory Name */}
          <input
            type="text"
            placeholder="SubCategory Name"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* SubCategory Description */}
          <textarea
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
            <input
              type="file"
              className="w-full text-sm text-gray-500"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4">
              <img
                src={imagePreview}
                alt="SubCategory Preview"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="bg-gray-500 text-white px-3 py-2 text-xs font-medium rounded-xl hover:bg-gray-700"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    </>
  );
};

export default AddSubCategoryModal;
