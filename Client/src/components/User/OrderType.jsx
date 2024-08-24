import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { addOrderTypeToDB } from './IndexdDBUtils'; // Import the IndexedDB utility function

const OrderType = ({ onClose }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Function to handle order type selection and save to IndexedDB
    const handleOrderTypeSelection = async (orderType) => {
        try {
            await addOrderTypeToDB(orderType);
            navigate(`/${id}/user/checkout`); // Navigate after saving order type
        } catch (error) {
            console.error('Error saving order type to IndexedDB:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-8 relative max-w-sm w-full">
                <div className='flex items-start justify-between'>
                    <button
                        className="absolute top-2 right-2 text-orange-400"
                        onClick={onClose}
                    >
                        <IoMdClose size={20} />
                    </button>
                    <div className="text-2xl text-center font-semibold mb-4">Please Select Your Order Type</div>
                </div>
                <form>
                    <div className="mb-4">
                        <div className='flex justify-center gap-2'>
                            <button
                                type="button"
                                onClick={() => handleOrderTypeSelection('Dine In')}
                                className="bg-white hover:bg-orange-600 text-orange-600 border-orange-600 border-2 hover:text-white px-4 py-2 rounded transition"
                            >
                                Dine In
                            </button>
                            <button
                                type="button"
                                onClick={() => handleOrderTypeSelection('Takeaway')}
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
