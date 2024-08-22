import React from 'react';
import logo1 from 'D:/Node and React/Foodiv/Client/public/assests/logo1.jpg'; 
import logo2 from 'D:/Node and React/Foodiv/Client/public/assests/logo2.jpg'; 
import logo3 from 'D:/Node and React/Foodiv/Client/public/assests/logo3.jpg'; 
import logo4 from 'D:/Node and React/Foodiv/Client/public/assests/logo4.jpg'; 
import logo5 from 'D:/Node and React/Foodiv/Client/public/assests/logo4.jpg'; 
import logo6 from 'D:/Node and React/Foodiv/Client/public/assests/logo6.jpg'; 
import logo7 from 'D:/Node and React/Foodiv/Client/public/assests/logo7.jpg'; 
import logo8 from 'D:/Node and React/Foodiv/Client/public/assests/logo8.jpg'; 

const logos = [
  { src: logo1, alt: 'Logo 1', description: 'Unlimited requests' },
  { src: logo2, alt: 'Logo 2', description: 'Top-notch designers' },
  { src: logo3, alt: 'Logo 3', description: 'Business and user-oriented' },
  { src: logo4, alt: 'Logo 4', description: 'Fixed Rates' },
  { src: logo5, alt: 'Logo 5', description: 'Custom portal' },
  { src: logo6, alt: 'Logo 6', description: 'Fast delivery' },
  { src: logo7, alt: 'Logo 7', description: 'Latest trends' },
  { src: logo8, alt: 'Logo 8', description: 'Flexible & scalable' },
  { src: logo5, alt: 'Logo 5', description: 'Custom portal' },
  { src: logo6, alt: 'Logo 6', description: 'Fast delivery' },
  { src: logo7, alt: 'Logo 7', description: 'Latest trends' },
  { src: logo8, alt: 'Logo 8', description: 'Flexible & scalable' },

];

export default function Restaurant() {
  return (
    <div className="container mx-auto mt-20 lg:px-20 px-5">
          <div className="text-center mb-16">
        <h2 className="lg:text-5xl text-4xl font-sans font-medium">Trusted by <span className='font-bold'>10,000+</span> Restaurants </h2>
      </div>
      <div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 ">
          {logos.map((logo, index) => (
            <li key={index} className="flex flex-col items-center text-center">
              <img src={logo.src} alt={logo.alt} className="mb-6 w-36 h-36  object-contain" />
       
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
