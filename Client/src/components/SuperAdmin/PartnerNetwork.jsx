import React from 'react';
import { FiArrowRightCircle } from "react-icons/fi";
import img from '../../../public/assests/PartnerNetwork.jpg'; // Your image path
import points from 'D:/Node and React/Foodiv/Client/public/assests/point.svg';

const keyPoints = [
  'Get 20% commission',
  'Customer Support',
  'Customer Support',
  'Customer Support',
    'Customer Support',
  'Customer Support'
];

const PartnerNetwork = () => {
  return (
    <div className="mt-36 md:mx-[50px] mx-2  lg:px-20 px-5">

        <div className="text-4xl font-bold mb-20 text-center">
        The Benefits of Joining Foodiv's Partner Network

        </div>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-16'>


      <div className="w-full lg:w-1/2">
        <img 
          src={img} 
          alt="Delivery"
          className="w-full h-full"
        />
      </div>

    
      <div className="w-full lg:w-1/2 flex flex-col items-start pl-4 text-center lg:text-left p-3">
        <ul className="space-y-4 text-left">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-center font-medium justify-center text-lg lg:justify-start ">
              <FiArrowRightCircle className="mr-2 bg-gray-100 p-2 rounded-full size-10" /> {point}
            </li>
          ))}
        </ul>
      </div>
      
      </div>
    

    </div>
  );
};

export default PartnerNetwork;
