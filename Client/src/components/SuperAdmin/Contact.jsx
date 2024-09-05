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

const Contact = () => {
  return (
    <div className="mt-10 md:mx-[50px] mx-2 flex flex-col lg:flex-row items-center justify-between gap-5 lg:px-20 px-5">
      {/* Left Side Image */}
    
      <div className="w-full lg:w-1/2 flex flex-col items-start pl-4 text-center lg:text-left p-3">
        <p className="text-gray-500 mb-4  text-justify">
        Are you an aspiring Restaurant owner with a fresh new idea? Or are you looking to invest in an restaurant ordering software to digitize your traditional food business? Before investing, you must be skimming sites to gather as much information on the Online Food Ordering System as possible.
        </p>
        <ul className="space-y-4 text-left">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-center text-lg justify-start text-gray-500">
              <FaRegCircleCheck className="text-orange-500 mr-2 "/>{point}
            </li>
          ))}
        </ul>
      </div>


       {/* Right Side Content */}
       <div className="w-full lg:w-1/2 mx-auto p-8 bg-white border shadow-xl rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
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

export default Contact;
