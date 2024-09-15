import React from 'react';
import { FaCheck } from 'react-icons/fa'; // Import the check icon
import { FaRegCircleCheck } from "react-icons/fa6";

const points = [
  'No Commission',
  'More Control on Customer Data',
  'Free QR Code Menu',
  'Free Online Ordering System'
];

export default function Onlineweb() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-24 lg:px-20 px-5  p-6">
      <p className="text-black text-3xl md:text-[50px] lg:text-[50px] mb-7 font-sans font-medium leading-none">
        Get Your own Online Food Ordering App and Website
      </p>
      <p className="text-gray-700 text-base md:text-xl lg:text-xl mb-6 font-sans px-14">
        Integrate the food ordering system in your restaurant and grab the future. Our restaurant online ordering software is capable enough to serve your purposes successfully.
      </p>
      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <button className="py-3 px-5 text-base  bg-yellow-500 hover:bg-white hover:border-yellow-500 border-2 border-yellow-500 text-black rounded-xl">
          Get Started For Free
        </button>
        <button className="py-3 px-5 text-base  border-2 border-orange-600 hover:bg-orange-600 text-black hover:text-white rounded-xl">
          Request A Demo
        </button>
      </div>
      <div className="mx-4 sm:mx-8 lg:mx-16 mt-8">
  <div className="flex flex-wrap sm:flex-nowrap">
    {points.map((point, index) => (
      <div key={index} className="flex items-center text-left px-2 mb-4 w-full sm:w-auto">
        <FaRegCircleCheck className="text-red-600 mr-2" /> {/* Icon on the left */}
        <p className="text-black text-base font-medium">{point}</p> {/* Description text */}
      </div>
    ))}
  </div>
</div>

    </div>
  );
}
