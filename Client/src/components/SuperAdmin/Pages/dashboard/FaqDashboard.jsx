// src/components/FaqDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FaqDashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [editFaqId, setEditFaqId] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editFaq, setEditFaq] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/faqs');
      setFaqs(response.data.faqs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  const handleUpdateFaq = async (faqId) => {
    try {
      await axios.patch(`http://localhost:5001/api/faqs/${faqId}`, editFaq);
      fetchFaqs(); // Refresh the FAQ list
      setEditFaqId(null); // Clear edit form
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  const handleRemoveFaq = async (faqId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this FAQ?");
    
    if (confirmDelete) {
      try {
        // Proceed with the deletion if confirmed
        await axios.delete(`http://localhost:5001/api/faqs/${faqId}`);
        fetchFaqs(); // Refresh the FAQ list
      } catch (error) {
        console.error('Error removing FAQ:', error);
      }
    } else {
      // Do nothing if the user cancels the action
      console.log('FAQ deletion canceled');
    }
  };

  const handleAddFaq = async () => {
    try {
      await axios.post('http://localhost:5001/api/faqs', newFaq);
      fetchFaqs(); // Refresh the FAQ list
      setNewFaq({ question: '', answer: '' }); // Clear form
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">FAQ Dashboard</h1>

      {/* Add FAQ Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New FAQ</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Question"
            value={newFaq.question}
            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full mb-2"
          />
          <textarea
            placeholder="Answer"
            value={newFaq.answer}
            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
            className="p-2 border border-gray-300 rounded w-full mb-2"
            rows="4"
          />
          <button
            onClick={handleAddFaq}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add FAQ
          </button>
        </div>
      </div>

      {/* FAQ List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">FAQ List</h2>
        <ul className="space-y-4">
          {faqs.map((faq) => (
            <li key={faq._id} className="border border-gray-200 rounded p-4">
              {editFaqId === faq._id ? (
                <div>
                  <input
                    type="text"
                    value={editFaq.question}
                    onChange={(e) => setEditFaq({ ...editFaq, question: e.target.value })}
                    className="p-2 border border-gray-300 rounded w-full mb-2"
                  />
                  <textarea
                    value={editFaq.answer}
                    onChange={(e) => setEditFaq({ ...editFaq, answer: e.target.value })}
                    className="p-2 border border-gray-300 rounded w-full mb-2"
                    rows="4"
                  />
                  <button
                    onClick={() => handleUpdateFaq(faq._id)}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditFaqId(null)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="mb-2">{faq.answer}</p>
                  <button
                    onClick={() => { setEditFaqId(faq._id); setEditFaq({ question: faq.question, answer: faq.answer }); }}
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveFaq(faq._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FaqDashboard;
