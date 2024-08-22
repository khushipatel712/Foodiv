import React from 'react';
import logo1 from 'D:/Node and React/Foodiv/Client/public/assests/Pos.svg';
import logo2 from 'D:/Node and React/Foodiv/Client/public/assests/Pos.svg';
import logo3 from 'D:/Node and React/Foodiv/Client/public/assests/Pos.svg';
import logo4 from 'D:/Node and React/Foodiv/Client/public/assests/Pos.svg';
import logo5 from 'D:/Node and React/Foodiv/Client/public/assests/Pos.svg';
import logo6 from 'D:/Node and React/Foodiv/Client/public/assests/Pos.svg';

import svg1 from 'D:/Node and React/Foodiv/Client/public/assests/bg.svg';
import svg2 from 'D:/Node and React/Foodiv/Client/public/assests/bg.svg';
import svg3 from 'D:/Node and React/Foodiv/Client/public/assests/bg.svg';
import svg4 from 'D:/Node and React/Foodiv/Client/public/assests/bg.svg';
import svg5 from 'D:/Node and React/Foodiv/Client/public/assests/bg.svg';
import svg6 from 'D:/Node and React/Foodiv/Client/public/assests/bg.svg';

const items = [
    { logo: logo1, svg: svg1, title: 'Pizza Ordering System' },
    { logo: logo2, svg: svg2, title: 'Cafe Ordering System' },
    { logo: logo3, svg: svg3, title: 'Kitchen Cloud Ordering System' },
    { logo: logo4, svg: svg4, title: 'Alcohol Ordering Software' },
    { logo: logo5, svg: svg5, title: 'Restaurant Website Builder' },
    { logo: logo6, svg: svg6, title: 'Fast Food Ordering System' },
];

export default function System() {
    return (
        <div className="container mx-auto mt-20 lg:px-20 px-5">
            <div className="text-center mb-16 flex justify-center flex-col items-center">
                <div>
                    <h2 className="lg:text-4xl text-3xl font-sans font-medium">
                        Our Online Food Ordering System Caters
                    </h2>
                </div>
                <div className='w-[98px] h-1 text-orange-500 bg-orange-500 text-center mt-4'></div>
            </div>
            <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {items.map((item, index) => (
                        <li key={index} className="flex flex-col items-center text-center shadow-xl p-5 relative group">
                            <div className="relative w-36 h-36 flex items-center justify-center">
                                <img src={item.svg} alt={`SVG ${index}`} className="absolute w-24 h-24 object-contain" />
                                <img src={item.logo} alt={item.title} className="relative z-10 w-12 h-12 object-contain" />
                            </div>
                            <p className="mt-2 text-[19px] font-semibold">{item.title}</p>
                            <div className="w-0 h-1 bg-orange-500 absolute bottom-0 left-0  transition-all duration-500 group-hover:w-full"></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
