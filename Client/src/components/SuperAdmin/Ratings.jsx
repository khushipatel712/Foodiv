import React from 'react';
import logo1 from 'D:/Node and React/Foodiv/Client/public/assests/capterra.png'; // Ensure correct path for the image
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import filled, half, and blank star icons

const items = [
    { logo: logo1, name: 'Register', rate: '4.8' },
    { logo: logo1, name: 'Fill Restaurant Details', rate: '4' },
    { logo: logo1, name: 'Create Menu', rate: '5' },
];

const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <>
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} className="text-yellow-500" />
            ))}
            {halfStar === 1 && <FaStarHalfAlt key="half" className="text-yellow-500" />}
            {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={`empty-${i}`} className="text-yellow-500 opacity-50" />
            ))}
        </>
    );
};

export default function Ratings() {
    return (
        <div className="container mx-auto mt-20 lg:px-20 px-5">
            <div className="text-center flex justify-center flex-col items-center mb-20">
                <h2 className="lg:text-4xl text-3xl font-sans font-medium px-6">
                    Industry ratings
                </h2>
            </div>
            <div className="flex flex-col items-center justify-center">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <li key={index} className="flex flex-col py-6 px-10 border  hover:transition-transform hover:-translate-y-3 translate-y-0 duration-500 transition-transform hover:duration-500 hover:shadow-xl">
                            <div className="flex flex-col items-center justify-center">
                                <img src={item.logo} alt={item.name} className='mb-5' />
                                <div className="flex items-center flex-row">
                                   <div className='flex items-center flex-row gap-1' >
                                    {generateStars(parseFloat(item.rate))}
                                    </div>
                                    <div className='text-orange-500 font-medium text-lg'>
                                       ({item.rate})
                                    </div>
                                </div>
                            </div>
                       
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
