import React from 'react';
import logo1 from 'D:/Node and React/Foodiv/Client/public/assests/pos1.svg';
import logo2 from 'D:/Node and React/Foodiv/Client/public/assests/pos1.svg';
import logo3 from 'D:/Node and React/Foodiv/Client/public/assests/pos1.svg';
import logo4 from 'D:/Node and React/Foodiv/Client/public/assests/pos1.svg';
import logo5 from 'D:/Node and React/Foodiv/Client/public/assests/pos1.svg';
import logo6 from 'D:/Node and React/Foodiv/Client/public/assests/pos1.svg';

const items = [
    { logo: logo1, title: 'Phone call Ordering', description: 'Let your smartphone users place orders or takeout from the comfort of their couch. A call can make things easy for both ends —receive order faster and get faster payment.' },
    { logo: logo2, title: 'Mobile App Ordering', description: 'With the fast and scalable online food order app, the restaurant food ordering system enables users to order and make payments easily.' },
    { logo: logo3, title: 'Website Ordering', description: 'The website can effectively represent your restaurant business with branding and letting users place order right from the website.' },
    { logo: logo4, title: 'QR based digital Menu & Ordering', description: 'Let your customers scan QR code, choose their desired food from the list of digital menu. Our food ordering system comes with unlimited QR scans to place an order quickly.' },
    { logo: logo5, title: 'Interactive UI for best UX', description: 'Whether it is online food ordering app or website, it comes with easy navigation and smooth access to finely categorized menus and place order as quick as possible.' },
    { logo: logo6, title: 'Contactless Orders', description: 'On the other side of the two-year anniversary of the pandemic, maintaining social distancing has become a new normal. Our system provides assured health, allowing contactless ordering & delivery.' },
];

export default function Feature() {
    return (
        <div className=' bg-slate-100 '>
        <div className="container mx-auto mt-20 lg:px-20 px-5 p-5">
            <div className="text-center flex justify-center flex-col items-center mb-4">
                <div>
                    <h2 className="lg:text-4xl text-3xl font-sans font-medium px-6">
                    Feature Packed Food Ordering System
                    </h2>
                </div>
                <div className='w-[98px] h-1 text-orange-500 bg-orange-500 text-center mt-4 mb-4'></div>
                <p className="text-gray-700 text-base md:text-xl lg:text-xl mb-6 font-sans">
                You get all so you don’t miss a single potential customer.
                </p>
            </div>
            <div>
                <div className="flex flex-col items-center justify-center px-5 ">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {items.map((item, index) => (
                            <li key={index} className="relative flex flex-row p-4 border rounded-md shadow-lg group px-10 bg-white">
                                <div className="flex items-center justify-between">
                                    <div className="relative flex items-center">
                                        {/* Grey Circle Behind the Logo */}
                                        <div className="absolute w-10 h-10 bg-gray-300 rounded-full top-5 left-8 transform -translate-x-1/2 transition-colors duration-300 group-hover:bg-orange-500"></div>
                                        <img src={item.logo} alt={item.title} className='relative sm:w-36 sm:h-36 w-32 h-32' />
                                    </div>
                                    {/* Grey Line on the Right Side */}
                                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gray-300 transition-colors duration-300 group-hover:bg-orange-500"></div>
                                </div>
                                <div className="ml-20 text-left mt-5">
                                    <h3 className="sm:text-lg text-base font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
}
