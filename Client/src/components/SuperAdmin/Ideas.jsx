import React from 'react';
import img from 'D:/Node and React/Foodiv/Client/public/assests/gfos.jpg'; // Your image path
import points from 'D:/Node and React/Foodiv/Client/public/assests/point.svg';

const keyPoints = [
  'Allows customers to order food from the website',
  'Increase customers’ engagement with vivid menu list',
  'Increase customer retention rates with easy navigation',
  'Keep customer visiting and order with a sales-optimized website',
    'Increase customer retention rates with easy navigation',
  'Keep customer visiting and order with a sales-optimized website'
];

const Ideas = () => {
  return (
    <div className="mt-36 md:mx-[50px] mx-2 flex flex-col lg:flex-row items-center justify-between gap-5 lg:px-20 px-5">
      {/* Left Side Image */}
    
      <div className="w-full lg:w-1/2 flex flex-col items-start pl-4 text-center lg:text-left p-3">
        <div className="text-4xl font-semibold mb-5 flex justify-start lg:justify-start">
        Online Food Ordering Ideas
        </div>
        <p className="text-gray-600 mb-4  text-justify">
        Are you an aspiring Restaurant owner with a fresh new idea? Or are you looking to invest in an restaurant ordering software to digitize your traditional food business? Before investing, you must be skimming sites to gather as much information on the Online Food Ordering System as possible. So, to help you, we are here with detailed guides and the latest tips on starting an online food delivery business, its advantages, tips for choosing the best food ordering software, and more.
        </p>
        <ul className="space-y-4 text-left">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-center justify-center text-lg lg:justify-start text-gray-700">
              <img src={points} className="text-orange-500 mr-2 w-10 h-10" /> {point}
            </li>
          ))}
        </ul>
      </div>


       {/* Right Side Content */}
      <div className="w-full lg:w-1/2">
        <img 
          src={img} 
          alt="Delivery"
          className="w-full h-full"
        />
      </div>
      
    

    </div>
  );
};

export default Ideas;
