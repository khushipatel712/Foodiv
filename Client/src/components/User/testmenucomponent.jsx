import React, { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import DrawerComponent from './DrawerComponent';
import { GrSquare } from 'react-icons/gr';
import { useParams } from 'react-router-dom';
import { useGetMenuItemsByAdminIdQuery } from '../../services/menuitemApi'; // Import the API hooks
import { useGetProfileByIdQuery } from '../../services/adminApi';
const MenuComponent = () => {
    const { id } = useParams();
    const adminId = id;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVegOnly, setIsVegOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [cartItems, setCartItems] = useState([]);
    const [onlineStatus, setOnlineStatus] = useState(true); // State for online status
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    // Fetch menu items using the API hook
    const { data: menuItems = [], error, isLoading } = useGetMenuItemsByAdminIdQuery(adminId);

    // Fetch profile to get online status
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
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClick = () => {
        setIsMenuOpen(false);
    };

    const toggleVegOnly = () => {
        setIsVegOnly(!isVegOnly);
    };

    const handleAddToCart = (item) => {
        if (onlineStatus) {
            // If online, add item to cart
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
            // If offline, show modal
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
            <div className="flex flex-col lg:flex-row h-auto sm:mx-20 mx-1">
                {/* Sidebar */}
                <div className={`bg-white lg:w-1/6 flex text-right pt-10 lg:block ${isMenuOpen ? 'block' : 'hidden'} lg:static z-10 inset-0 lg:h-96 h-full shadow-lg lg:shadow-none`}>
                    <ul className="flex flex-col p-4 space-y-4">
                        {uniqueCategories.map((categoryName, index) => (
                            <li key={index} className="cursor-pointer text-orange-500 hover:text-orange-700">
                                {categoryName}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-1 sm:px-7 md:px-10 lg:pl-10 m-10 sm:border-l-2 h-full">
                    {/* Search and Veg Toggle */}
                    <div className="flex items-center sm:justify-between mb-6 space-x-2 ">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="border text-sm sm:text-base border-gray-300 rounded-md sm:p-[6px] p-1 w-full lg:w-1/3"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="flex items-center space-x-2">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={isVegOnly}
                                        onChange={toggleVegOnly}
                                    />
                                    <div
                                        className="flex items-center sm:space-x-2 cursor-pointer"
                                        onClick={toggleVegOnly}
                                    >
                                        {isVegOnly ? (
                                            <>
                                                <span className="text-green-500 text-sm sm:text-base">Veg Only</span>
                                                <FaToggleOn size={24} className="text-green-500" />
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-gray-500 text-sm sm:text-base">Veg Only</span>
                                                <FaToggleOff size={24} className="text-gray-500" />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-6 w-full lg:w-1/2">
                        {uniqueCategories.map((categoryName, idx) => (
                            <div key={idx}>
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
                                                                <GrSquare size={16} />
                                                            </div>
                                                        </div>
                                                        <p>₹ {item.price.toFixed(2)}</p>
                                                        {cartItem && (
                                                            <div className="flex items-center mt-2">
                                                                <button
                                                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-l"
                                                                    onClick={() => handleDecrement(item._id)}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="px-4">{cartItem.quantity}</span>
                                                                <button
                                                                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-r"
                                                                    onClick={() => handleIncrement(item._id)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <button
                                                        className="bg-orange-500 text-white px-4 py-2 rounded"
                                                        onClick={() => handleAddToCart(item)}
                                                    >
                                                        {cartItem ? 'Update Cart' : 'Add to Cart'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cart Summary */}
            <div className="fixed bottom-0 w-full bg-white shadow-lg p-4">
                <div className="flex justify-between items-center">
                    <div className="text-lg font-semibold">Total: ₹ {totalAmount}</div>
                </div>
                {cartItems.length > 0 && (
                    <button className="bg-orange-500 text-white px-4 py-2 rounded mt-2">Proceed to Checkout</button>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Offline Mode</h2>
                        <p className="mb-4">You are currently offline. Please connect to the internet to add items to your cart.</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
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