import React from 'react';
import img from 'D:/Node and React/Foodiv/Client/public/assests/gfos.jpg';
import points from 'D:/Node and React/Foodiv/Client/public/assests/point.svg';
import { FaRegCircleCheck } from "react-icons/fa6";



const ContactBecomePartner = () => {
    return (
        <div className="mt-10 md:mx-[50px] mx-2 mb-20 lg:px-20 px-5">


            <div className="w-full  pl-4 text-center lg:mb-20 mb-16  p-3">

                <p className='text-4xl font-bold mb-5'>Contact Us to Become our Partner</p>

                <p className='text-lg text-gray-700 font-[490]'>
                    Contact our experts for more details and start earning.
                </p>


            </div>



            <div className="w-full lg:w-1/2 mx-auto p-10 bg-white border shadow-2xl rounded-lg">

                <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <div className="relative w-full">
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                                <option value="IN">🇮🇳 India</option>
                                {/* Add more countries as options here */}
                            </select>
                        </div>
                        <textarea
                            placeholder="Your Message"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 col-span-1 sm:col-span-2"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full sm:w-auto px-7 font-medium py-3 bg-orange-600 text-white rounded-3xl shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    >
                        Submit
                    </button>
                </form>
            </div>



        </div>
    );
};

export default ContactBecomePartner;
