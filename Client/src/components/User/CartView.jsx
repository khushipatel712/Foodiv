import React, { useState } from 'react';
import { GrSquare } from "react-icons/gr";

const CartView = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Fries', price: 50, quantity: 3, veg: true },
        { id: 2, name: 'Burger', price: 100, quantity: 1, veg: false },
    ]);

    const handleQuantityChange = (id, delta) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
                    : item
            )
        );
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <div className="lg:px-40 px-10 pt-10 flex flex-col gap-8">
            <div className="flex justify-between items-start">
                {/* Cart Items and Explore Button */}
                <div className="w-full">
                <div className='flex justify-between '>
                    <div className="text-xl font-semibold mb-4">My Cart</div>
                    <div className="ml-4">
                    <button className="border border-orange-500 text-orange-500 px-3 py-[6px] rounded-lg hover:bg-orange-500 hover:text-white">
                        Explore more
                    </button>
                    </div>
                </div>
                    <div className="flex flex-col space-y-6 lg:px-20 px-10 mt-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                        <GrSquare
                                            className={`mr-2 ${item.veg ? 'text-green-500' : 'text-red-500'}`}
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="text-sm mt-2">₹{item.price}.00</span>
                                </div>
                                <div className="flex items-center shadow-lg border rounded-md py-[6px] px-4 space-x-4">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                        className=" text-red-500 font-bold text-2xl"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                        className=" text-red-500 font-bold text-xl "
                                    >
                                        +
                                    </button>
                                </div>
                                <span className='font-semibold'>₹{item.price * item.quantity}.00</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Explore More Button */}
                
            </div>

            {/* Bill Summary */}
            <div className="w-full lg:w-[40%] ml-auto border  shadow">
                <div className="text-2xl font-semibold mb-4 p-4 bg-gray-100">Bill Summary</div>
                <div className='p-4'>
                <div className="flex justify-between mb-4">
                    <span>Items Total</span>
                    <span>₹{totalAmount}.00</span>
                </div>
                <div className="flex justify-between mb-6">
                    <span>Total</span>
                    <span className="font-bold">₹{totalAmount}.00</span>
                </div>
                <div className='flex justify-center'>
                <button className="w-auto px-6 py-2 bg-orange-600 text-white text-lg  rounded">
                    Proceed to checkout
                </button>
                </div>
                </div>
            </div>
        </div>
    );
};

export default CartView;
