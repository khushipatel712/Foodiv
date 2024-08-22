import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SmtpSetting = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">SMTP Settings</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Host *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            placeholder="smtp.gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Port *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            placeholder="587"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Encryption *</label>
          <select className="w-full border border-gray-300 rounded p-2 text-gray-700">
            <option>--- Select Encryption ---</option>
            <option value="SSL">SSL</option>
            <option value="TLS">TLS</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            placeholder="example@gmail.com"
          />
        </div>

        <div className="md:col-span-2 relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded p-2 text-gray-700"
            placeholder="Password"
          />
               <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="md:col-span-2 text-sm text-gray-600">
          <p>Note: We save your password in encrypted format and use it only for SMTP purposes.</p>
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

export default SmtpSetting;
