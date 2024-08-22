import React, { useState } from 'react';


const CustomerSupport = () => {
 

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Support Settings</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Care Number</label>
          <div className="flex items-center border border-gray-300 ">
              <span className="px-3 py-2 bg-gray-100 text-gray-600">
                +91
              </span>
          <input
            type="text"
            className="w-full border-gray-300  p-2 text-gray-700"
          />
        </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Whatsapp Number</label>
          <div className="flex items-center border border-gray-300 ">
              <span className="px-3 py-2 bg-gray-100 text-gray-600">
                +91
              </span>
          <input
            type="text"
            className="w-full border-gray-300  p-2 text-gray-700"
          />
        </div>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-gray-500 text-white px-3 py-2 text-xs font-medium rounded-3xl hover:bg-gray-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerSupport;
