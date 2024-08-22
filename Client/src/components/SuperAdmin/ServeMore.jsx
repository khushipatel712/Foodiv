import React from 'react';
import img from 'D:/Node and React/Foodiv/Client/public/assests/pizza.jpg'; // Your image path
import logo from 'D:/Node and React/Foodiv/Client/public/assests/logobg.png'; // Import your SVG file
import { FaRegCircleCheck } from "react-icons/fa6";

const keyPoints = [
  'Allows customers to order food from the website',
  'Increase customers’ engagement with vivid menu list',
  'Increase customer retention rates with easy navigation',
  'Keep customer visiting and order with a sales-optimized website'
];

const ServeMore = () => {
  return (
    <div className="relative  flex flex-col lg:flex-row items-center justify-between shadow-xl group lg:mx-20 mx-5 mb-5 lg:mb-0">
      {/* Left Side Image */}
      <div className="w-full lg:w-1/2">
        <img 
          src={img} 
          alt="Delivery"
          className="w-full h-full"
        />
      </div>
      
      {/* Right Side Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center pl-4 text-center lg:text-left">
        <div className="text-2xl font-bold mb-2 flex items-center justify-center lg:justify-start">
          Serve More, Get More
        </div>
        <div className="w-20 h-1 bg-orange-500 mb-4"></div>
        <p className="text-gray-600 mb-4  text-center">
          Integrating online food ordering for restaurants enables you to attract more customers to buy from you. Our food ordering system
        </p>
        <ul className="space-y-2 text-left">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-center justify-center lg:justify-start text-gray-700">
              <FaRegCircleCheck className="text-orange-500 mr-2 w-4 h-4" /> {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Top Semi-Rounded Div */}
      <div className="absolute top-16 hidden md:flex left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-180 group-hover:bg-orange-500 rounded-t-full w-32 h-32 items-center justify-center shadow-2xl z-20 bg-white transition-colors duration-300">
        <img src={logo} alt="icon" className="w-16 h-16 rotate-180" /> {/* SVG Icon */}
      </div>
    </div>
  );
};

export default ServeMore;
