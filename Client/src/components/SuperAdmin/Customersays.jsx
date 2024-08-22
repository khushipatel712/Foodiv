import React, { useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import img from 'D:/Node and React/Foodiv/Client/public/assests/testimonal.png';
import profile1 from 'D:/Node and React/Foodiv/Client/public/assests/Jason.jpeg';
import 'react-multi-carousel/lib/styles.css';

// Sample reviews data with additional fields
const reviews = [
    { id: 1, text: "We recently integrated online food ordering system into our pizza eatery in USA and we must say it's very convenient! Foodiv has helped us bring our restaurant online in an organized fashion and in matter of minutes. It is hassle-free, and easy.", name: "John Doe", address: "New York, USA", image: profile1 },
    { id: 2, text: "We recently integrated online food ordering system into our pizza eatery in USA and we must say it's very convenient! Foodiv has helped us bring our restaurant online in an organized fashion and in matter of minutes. It is hassle-free, and easy. We recently integrated online food ordering system into our pizza eatery in USA and we must say it's very convenient! Foodiv has helped us bring our restaurant online in an organized", name: "Jane Smith", address: "Los Angeles, USA", image: profile1 },
    { id: 3, text: "We recently integrated online food ordering system into our pizza eatery in USA and we must say it's very convenient! Foodiv has helped us bring our restaurant online in an organized fashion and in matter of minutes. It is hassle-free, and easy.", name: "Alice Johnson", address: "Chicago, USA", image: profile1 },
    // Add more reviews as needed
];

// Responsive settings for the carousel
const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 768, min: 464 },
        items: 1
    },
    veryMobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export default function Customersays() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carouselRef = useRef(null);

    const handleBeforeChange = (previousSlide, nextSlide) => {
        setCurrentSlide(nextSlide);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        carouselRef.current.goToSlide(index); // Programmatically go to the slide
    };

    return (
        <div className="w-full mt-10  lg:px-20 px-5">
            <div className="lg:flex lg:flex-row flex-col">
                {/* Left Side - Reviews Carousel */}
                <div className="lg:w-[60%] mb-6 lg:mb-0">
                    <div className="p-6">
                        <h2 className="lg:text-5xl text-3xl font-semibold mb-4 text-left">What Our Customers Say</h2>
                        <Carousel
                            ref={carouselRef}
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            transitionDuration={2000}
                            beforeChange={handleBeforeChange}
                            afterChange={(previousSlide) => setCurrentSlide(previousSlide)} // Ensure correct slide state after change
                            arrows={false}
                        >
                            {reviews.map((review) => (
                                <div key={review.id} className="p-6 border-b last:border-b-0">
                                    <p className="text-gray-700 mb-2">{review.text}</p>
                                    <div className="flex items-start">
                                        <img 
                                            src={review.image} 
                                            alt={review.name} 
                                            className="w-24 h-24 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <div className="flex flex-col mt-5">
                                                <div className="font-bold text-xl text-orange-500">{review.name}</div>
                                                <div className="ml-2 text-gray-600">{review.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                        {/* Custom Progress Indicator */}
                        <div className="flex justify-center mt-4">
                            {reviews.map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`cursor-pointer h-2 mx-1 rounded-full ${currentSlide === index ? 'w-10 bg-orange-500' : 'w-4 bg-gray-300'}`}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="lg:w-[40%] flex items-center justify-center p-4">
                    <img 
                        src={img} 
                        alt="Sample" 
                        className="w-full h-auto object-cover" 
                    />
                </div>
            </div>
        </div>
    );
}
