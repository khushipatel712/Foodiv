import React from 'react';
import { FaArrowLeft } from "react-icons/fa6";


const GuestForm = ({ goBack }) => {
    return (
        <div className="w-full lg:w-[70%] bg-white p-5 lg:p-10 rounded-lg shadow">

            <div className='flex flex-row gap-4 items-center'>
                {/* Back Button */}
                <div>
                    <button
                        className=" hover:text-blue-700 mb-4"
                        onClick={goBack}
                    >
                        <FaArrowLeft />
                    </button>
                </div>
                <div className="text-lg font-medium mb-4">Contact Information</div>
            </div>
            {/* Guest Form */}
            <form>
                <div className="mb-4 flex">
                    <div className='flex flex-row gap-4 w-full justify-between'>
                    <div className='w-1/2'>
                        <label className="block text-gray-700 font-semibold text-xs mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded text-sm"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className="block text-gray-700 font-semibold mb-2 text-xs" htmlFor="name">Mobile</label>
                        <input
                            type="text"
                            id="mobile"
                            className="w-full text-sm px-3 py-2 border rounded "
                            placeholder="Enter your mobile number"
                        />
                    </div>

                    </div>
                </div>
                <div className="mb-4 w-1/2">
        
                    <label className="block text-gray-700 text-xs font-semibold mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 text-sm border rounded"
                        placeholder="Enter your email"
                    />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold text-lg mb-2" htmlFor="instruction">Instruction</label>
                    <textarea
                        type="text"
                        id="instruction"
                        className="w-full px-3 py-2 border rounded text-sm"
                        placeholder=' "Any suggestion? we will pass on... '
                    />
                </div>
              
            </form>
        </div>
    );
};

export default GuestForm;
