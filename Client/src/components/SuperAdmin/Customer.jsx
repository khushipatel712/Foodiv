import React from 'react';

export default function Customer() {
    return (
        <div className="w-full mt-10 ">
            <div className="lg:flex lg:flex-row flex-col w-full ">
                {/* Left Side */}
                <div className="lg:w-[70%] lg:pr-6 mb-6 lg:mb-0">
                    <div className="bg-gray-100 lg:p-24 p-10 lg:px-20 px-5 shadow-md  flex items-start justify-start flex-col">
                        <div className="lg:text-9xl text-6xl sm:text-8xl font-bold mb-10 text-orange-500">10000+</div>
                        <div className="text-gray-700 mb-10 lg:text-2xl text-xl">Restaurants Registered</div>
                        <div className="text-gray-900 lg:text-4xl text-3xl lg:pr-72  text-left font-semibold">Maximize Your Restaurant's Success with Our Expertise</div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:w-[30%] flex flex-col justify-center text-center gap-6 mx-16">
                    {/* Right Side Top */}
                    <div className="bg-gray-100 p-5  rounded-t-[30px] shadow-md">
                        <p className="lg:text-5xl  text-4xl text-orange-500 font-bold mb-2">30+</p>
                        <p className="text-base text-gray-700 font-semibold mb-2 uppercase">Countries</p>
                    </div>

                    {/* Right Side Bottom */}
                    <div className="bg-gray-100 p-5 rounded-b-[30px] shadow-md">
                        <p className="lg:text-5xl text-4xl text-orange-500 font-bold mb-2">1.3M+</p>
                        <p className="text-base text-gray-700 font-semibold mb-2 uppercase">Orders Processed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
