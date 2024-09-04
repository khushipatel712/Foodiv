import React, { useState, useEffect, useRef } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import DrawerComponent from './DrawerComponent';
import { GrSquare } from 'react-icons/gr';
import { useParams } from 'react-router-dom';
import { useGetMenuItemsByAdminIdQuery } from '../../services/menuitemApi';
import { useGetProfileByIdQuery } from '../../services/adminApi';
import { FaSearch } from "react-icons/fa";


const MenuComponent = () => {
    const categoryRefs = useRef({});
    const { id } = useParams();
    const adminId = id
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVegOnly, setIsVegOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [onlineStatus, setOnlineStatus] = useState(true); // State for online status
    const [showModal, setShowModal] = useState(false);

    // Fetch menu items using the API hook
    const { data: menuItems = [], error, isLoading } = useGetMenuItemsByAdminIdQuery(adminId);

    const { data: profile } = useGetProfileByIdQuery(adminId);


    useEffect(() => {
        if (profile) {
            setOnlineStatus(profile.online); // Set online status from profile
        }
    }, [profile]);



    const handleIncrement = (itemId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            )
        );
    };

    const handleDecrement = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item._id === itemId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {

                    return null;
                }
            }
            return item;
        }).filter(item => item !== null);

        setCartItems(updatedCart);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(false);
    };

    const scrollToCategory = (categoryName) => {
        const categoryElement = categoryRefs.current[categoryName];
        if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth' });
        }
        handleMenuClick();
    };

    const toggleVegOnly = () => {
        setIsVegOnly(!isVegOnly);
    };

    const handleAddToCart = (item) => {
        if (onlineStatus) {
            setCartItems(prevItems => {
                const existingItem = prevItems.find(cartItem => cartItem.id === item._id);
                if (existingItem) {
                    return prevItems.map(cartItem =>
                        cartItem.id === item._id
                            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                            : cartItem
                    );
                } else {
                    return [...prevItems, { ...item, id: item._id, quantity: 1 }];
                }
            });
        } else {
            setShowModal(true);
        }
    };

    const handleRemoveFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const totalAmount = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);

    // Render loading state
    if (isLoading) return <div>Loading...</div>;

    // Render error state
    if (error) return <div>Error fetching menu items.</div>;

    // Group items by category
    const groupedItems = menuItems.reduce((acc, item) => {
        if (!acc[item.category?.categoryName]) {
            acc[item.category?.categoryName] = [];
        }
        acc[item.category?.categoryName].push(item);
        return acc;
    }, {});

    // Extract unique categories
    const uniqueCategories = Object.keys(groupedItems);

    return (
        <>
            <div className="flex flex-col lg:flex-row h-auto lg:mx-10  mx-1">
                {/* Sidebar */}
                <div className={`bg-white lg:w-1/6 flex text-right pt-10 lg:block ${isMenuOpen ? 'block' : 'hidden'} lg:static z-10 inset-0 lg:h-96 h-full shadow-lg lg:shadow-none`}>
                    <ul className="flex flex-col p-4 space-y-4">
                        {uniqueCategories.map((categoryName, index) => (
                            <li key={index}
                                onClick={() => scrollToCategory(categoryName)}
                                className="cursor-pointer font-medium text-orange-500 hover:text-orange-600">
                                {categoryName}
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="flex-1 px-1 sm:px-7 md:px-10 lg:pl-10 m-10 lg:border-l-2 h-full">

                    <div className="flex items-center sm:justify-between mb-6 space-x-2">
                        <div className="flex items-center border text-sm sm:text-base border-gray-300 rounded-md w-full lg:w-1/3">
                            <FaSearch className="text-gray-500  ml-2" />
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="flex-grow p-1 sm:p-[6px]  outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            </div>
                            <div className="flex items-center space-x-2">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        {/* <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={isVegOnly}
                                        onChange={toggleVegOnly}
                                    /> */}
                                        <div
                                            className="flex items-center sm:space-x-2 cursor-pointer"
                                            onClick={toggleVegOnly}
                                        >
                                            {isVegOnly ? (
                                                <>
                                                    <span className="text-green-500 whitespace-nowrap text-sm sm:text-base">Veg Only</span>
                                                    <FaToggleOn className="text-green-500 size-4 sm:size-6 ml-1" />
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-gray-500 whitespace-nowrap text-sm sm:text-base">Veg Only</span>
                                                    <FaToggleOff size={24} className="text-gray-500 size-4 sm:size-6 ml-1" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-6 w-full lg:w-1/2">
                            {uniqueCategories.map((categoryName, idx) => (
                                <div key={idx} ref={(el) => (categoryRefs.current[categoryName] = el)}>
                                    <div className="inline-flex items-center relative">
                                        <div className="text-lg font-semibold mb-1">{categoryName}</div>
                                        <div className="absolute bottom-0 left-0 w-full border-b-2 border-dotted border-black" />
                                    </div>
                                    {groupedItems[categoryName]
                                        .filter(item => !isVegOnly || item.veg)
                                        .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                        .map((item, itemIdx) => {
                                            // Find if item is already in cart
                                            const cartItem = cartItems.find(cartItem => cartItem.id === item._id);

                                            return (
                                                <div key={itemIdx}>
                                                    {item.subCategory?.name && (
                                                        <div className="text-lg mb-2 mt-2 text-orange-500 italic">
                                                            {item.subCategory.name}
                                                        </div>
                                                    )}
                                                    <div className="mt-2 border-gray-300 rounded-xl p-3 shadow-lg flex justify-between items-center">
                                                        <div>
                                                            <div className="flex items-center">
                                                                <div className="text-base font-semibold">{item.name}</div>
                                                                <div className={`ml-4 ${item.veg ? 'text-green-500' : 'text-red-500'}`}>
                                                                    <GrSquare className='sm:size-4 size-3' />
                                                                </div>
                                                            </div>
                                                            <p>₹ {item.price.toFixed(2)}</p>
                                                        </div>
                                                        {cartItem && cartItem.quantity > 0 ? (
                                                            <div className="flex items-center ">
                                                                <button
                                                                    className="px-2 py-1 bg-orange-500 text-white font-bold rounded-l"
                                                                    onClick={() => handleDecrement(item._id)}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-[10px]">{cartItem.quantity}</span>
                                                                <button
                                                                    className="px-2 py-1 bg-orange-500 text-white font-bold  rounded-r"
                                                                    onClick={() => handleIncrement(item._id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                className="text-orange-600 border-2 border-orange-500 hover:bg-orange-500 hover:text-white sm:px-6 text-xs sm:py-2 px-3 py-1 rounded"
                                                                onClick={() => handleAddToCart(item)}
                                                            >
                                                                ADD
                                                            </button>
                                                        )}
                                                    </div>

                                                </div>
                                            );
                                        })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-5 py-2 border-4 border-white rounded-full shadow-2xl z-20"
                    onClick={toggleMenu}
                >
                    Browse Menu
                </button>

                <div
                    className={`lg:hidden fixed inset-x-0 bottom-0 bg-white shadow-lg z-30 transform transition-transform ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'} h-[35%] rounded-t-2xl overflow-y-auto`}
                >
                    <div className="flex justify-end px-3 py-1">
                        <button onClick={handleMenuClick} className="text-gray-500 font-bold text-xl">
                            &times;
                        </button>
                    </div>
                    <ul className="flex flex-col p-4 space-y-4">
                        {uniqueCategories.map((categoryName, index) => (
                            <li key={index} className="cursor-pointer text-orange-500 hover:text-orange-700"
                                onClick={() => scrollToCategory(categoryName)}>
                                {categoryName}
                            </li>
                        ))}
                    </ul>
                </div>

                {isMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black opacity-50 z-10"
                        onClick={handleMenuClick}
                    ></div>
                )}

                <div className='flex flex-col items-center justify-center'>
                    <div className='text-orange-600 text-sm mb-4'>
                        Powered by Foodiv
                    </div>
                    <div>
                        © Shivi Fries
                    </div>
                </div>

                <DrawerComponent
                    cartItems={cartItems}
                    totalAmount={totalAmount}
                    onRemoveFromCart={handleRemoveFromCart} // Pass the remove function if needed
                />

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-sm w-full">
                            {/* <h2 className="text-xl font-bold mb-4">Offline Mode</h2> */}
                            <p className="mb-4 lg:text-lg text-base text-center font-medium text-orange-500">Sorry, We are currently not accepting orders.</p>
                            <div className="flex justify-center">
                                <button
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </>
            );
};

            export default MenuComponent;



