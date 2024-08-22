import React from 'react';
import logo1 from 'D:/Node and React/Foodiv/Client/public/assests/register.svg';
import logo2 from 'D:/Node and React/Foodiv/Client/public/assests/register.svg';
import logo3 from 'D:/Node and React/Foodiv/Client/public/assests/register.svg';
import logo4 from 'D:/Node and React/Foodiv/Client/public/assests/register.svg';
import logo5 from 'D:/Node and React/Foodiv/Client/public/assests/register.svg';




const items = [
    { logo: logo1, title: 'Register', description: 'Register using your restaurant name and email address.' },
    { logo: logo2, title: 'Fill Restaurant Details', description: 'Update details, such as name, mobile, address, and images.' },
    { logo: logo3, title: 'Create Menu', description: 'Create a menu list using name, categories, cost, food type, etc.' },
    { logo: logo4, title: 'Generate QR Code Menu', description: 'Generate QR Code so that customers can see the menu on their mobile.' },
    { logo: logo5, title: 'Get Interactive Dashboard', description: 'You get an intuitive dashboard, personalized especially for your restaurant.' },

];

export default function Setup() {
    const formatIndex = (index) => {
        return (index + 1).toString().padStart(2, '0');
    };

    return (
        <div className="container mx-auto mt-20 lg:px-20 px-5">
            <div className="text-center flex justify-center flex-col items-center mb-4">
                <div>
                    <h2 className="lg:text-4xl text-3xl font-sans font-medium px-6">
                        Online Restaurant Ordering App and Website Come with Easy Setup
                    </h2>
                </div>
                <div className='w-[98px] h-1 text-orange-500 bg-orange-500 text-center mt-4 mb-4'></div>
                <p className="text-gray-700 text-base md:text-xl lg:text-xl mb-6 font-sans">
                    We have kept it as a child’s play. Setup and keep going.
                </p>
            </div>
            <div>
                <div className="flex flex-col items-center justify-center">
                    <ul className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, index) => (
                            <li key={index} className="flex flex-col  py-9 px-7 border rounded-3xl shadow-lg hover:transition-transform hover:-translate-y-3 translate-y-0 duration-500 transition-transform hover:duration-500">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="">
                                        <span className="text-6xl text-gray-300 font-extrabold ">{formatIndex(index)}</span>
                                    </div>
                                    <img src={item.logo} alt={item.title} className="w-12 h-12 object-contain" />
                                </div>
                                <div className="text-left mt-5">
                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
