import React from 'react';
import { IoMdClose } from 'react-icons/io';

const OrderType = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-8 relative max-w-sm w-full">
                <div className='flex items-start  justify-between'>
                    <div>
                        <button
                            className="absolute top-2 right-2 text-orange-400"
                            onClick={onClose}
                        >
                            <IoMdClose size={20} />
                        </button>
                    </div>
                    <div className="text-2xl text-center font-semibold mb-4">Please Select Your Order Type</div>

                </div>
                <form>
                    <div className="mb-4">


                        <div className='flex justify-center gap-2'>
                            <button
                                type="button"
                                onClick={() => { /* Handle login logic here */ }}
                                className="bg-white hover:bg-orange-600 text-orange-600 border-orange-600 border-2 hover:text-white px-4 py-2 rounded transition"
                            >
                                Dine In
                            </button>
                            <button
                                type="button"
                                onClick={() => { /* Handle login logic here */ }}
                                className="bg-white hover:bg-orange-600 text-orange-600 border-orange-600 border-2 hover:text-white px-4 py-2 rounded transition"
                            >
                                Takeaway
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OrderType;
