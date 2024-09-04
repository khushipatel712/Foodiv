import React, { useState, useEffect } from 'react';
import { GrSquare } from "react-icons/gr";
import { useNavigate, useParams } from 'react-router-dom';
import { getDrawerDataFromDB, updateDrawerDataInDB } from './IndexdDBUtils';

const CartView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetchDrawerData = async () => {
        try {
            const data = await getDrawerDataFromDB();
            if (data && data.cartItems) {
                const uniqueItems = combineAndGroupItems(data.cartItems);
                setCartItems(uniqueItems);
                setTotalAmount(calculateTotalAmount(uniqueItems)); // Calculate total after setting items
            }
        } catch (error) {
            console.error('Error fetching drawer data from IndexedDB:', error);
        }
    };

    useEffect(() => {
        fetchDrawerData();  // Fetch data initially
    }, []);

    const combineAndGroupItems = (items) => {
        const uniqueItems = {};
        items.forEach(item => {
            if (!uniqueItems[item.id]) {
                uniqueItems[item.id] = { 
                    ...item, 
                    quantity: item.quantity || 1  // Use provided quantity or default to 1
                };
            } else {
                uniqueItems[item.id].quantity += item.quantity || 1; // Increment by provided quantity or 1
            }
        });
        return Object.values(uniqueItems);
    };

    const handleQuantityChange = (itemId, delta) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => 
                item.id === itemId
                    ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
                    : item
            );
            setTotalAmount(calculateTotalAmount(updatedItems)); // Recalculate total
            return updatedItems;
        });
    };

    const calculateTotalAmount = (items) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const handleExploreClick = () => {
        navigate(`/${id}/user/menu`);
    };

    const handleCheckout = async () => {
        try {
            // Update drawer data in IndexedDB with current cart items and total amount
            await updateDrawerDataInDB(cartItems, totalAmount);
            fetchDrawerData();  
            navigate(`/${id}/user/check`);
        } catch (error) {
            console.error('Error updating drawer data in IndexedDB:', error);
        }
    };

    
    return (
        <div className="lg:px-40 px-10 pt-10 flex flex-col gap-8">
            <div className="flex justify-between items-start">
                <div className="w-full">
                    <div className='flex justify-between'>
                        <div className="sm:text-xl  text-lg font-semibold mb-4">My Cart</div>
                        <div className="ml-4">
                            <button
                                onClick={handleExploreClick}
                                className="border sm:text-base text-sm border-orange-500 text-orange-500 px-2 py-1 sm:px-3 sm:py-[6px] rounded-lg hover:bg-orange-500 hover:text-white"
                            >
                                Explore more
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col sm:space-y-6 space-y-4 lg:px-20 px-2 mt-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center">
                                        <GrSquare
                                            className={`mr-2 ${item.veg ? 'text-green-500' : 'text-red-500'}`}
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="text-sm mt-2">₹{item.price}.00</span>
                                </div>
                                <div className="flex items-center shadow-lg border rounded-md px-1  py-[2px] sm:py-[6px] sm:px-4 space-x-4">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className="text-red-500 font-bold text-2xl"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        className="text-red-500 font-bold text-xl"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className='font-semibold'>₹{item.price * item.quantity}.00</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-[40%] ml-auto border shadow">
                <div className="sm:text-2xl text-xl font-semibold mb-4 p-4 bg-gray-100">Bill Summary</div>
                <div className='p-4'>
                    <div className="flex justify-between mb-4">
                        <span>Items Total</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-6">
                        <span>Total</span>
                        <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-center'>
                        <button
                            onClick={handleCheckout}
                            className="w-auto px-3 py-1 text-base md:px-6 md:py-2 bg-orange-600 text-white sm:text-lg rounded"
                        >
                            Proceed to checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartView;
