import React from 'react';
import img from 'D:/Node and React/Foodiv/Client/public/assests/gfos.jpg'; // Your image path
import points from 'D:/Node and React/Foodiv/Client/public/assests/point.svg';
import { FaRegCircleCheck } from "react-icons/fa6";

const keyPoints = [
  'Allows customers to order food from the website',
  'Increase customers’ engagement with vivid menu list',
  'Increase customer retention rates with easy navigation',
  'Keep customer visiting and order with a sales-optimized website',
    'Increase customer retention rates with easy navigation',
  'Keep customer visiting and order with a sales-optimized website'
];

const SystemContact = () => {
  return (
    <div className="mt-10 md:mx-[50px] mx-2  lg:px-20 px-5 mb-20">
       <p className='text-center font-semibold text-4xl mb-6'>Request a Demo</p>
       <div className="w-1/2 mx-auto p-8 bg-white border shadow-xl rounded-lg">
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <div className="relative w-full">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="IN">🇮🇳 India</option>
              {/* Add more countries as options here */}
            </select>
          </div>
          <input
            type="text"
            placeholder="Restaurant Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 col-span-1 sm:col-span-2"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 w-full sm:w-auto px-7 font-medium py-3 bg-orange-600 text-white rounded-3xl shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
        >
          Submit
        </button>
      </form>
    </div>
      
    

    </div>
  );
};

export default SystemContact;
