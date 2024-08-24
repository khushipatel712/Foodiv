import React, { useState } from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import DrawerComponent from './DrawerComponent';
import { GrSquare } from 'react-icons/gr';
import { useFetchMenuItemsQuery } from '../../services/menuitemApi'; // Import the API hooks

const MenuComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVegOnly, setIsVegOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [cartItems, setCartItems] = useState([]);

    // Fetch menu items using the API hook
    const { data: menuItems = [], error, isLoading } = useFetchMenuItemsQuery();

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
            <div className="flex flex-col lg:flex-row h-auto mx-20">
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
                <div className="flex-1 px-10 lg:pl-10 m-10 border-l-2 h-full">
                    {/* Search and Veg Toggle */}
                    <div className="flex items-center justify-between mb-6">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="border border-gray-300 rounded-md p-[6px] w-full lg:w-1/3"
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
                                        className="flex items-center space-x-2 cursor-pointer"
                                        onClick={toggleVegOnly}
                                    >
                                        {isVegOnly ? (
                                            <>
                                                <span className="text-green-500">Veg Only</span>
                                                <FaToggleOn size={24} className="text-green-500" />
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-gray-500">Veg Only</span>
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
                                    .map((item, itemIdx) => (
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
                                                </div>
                                                <button
                                                    className="text-orange-600 border-2 border-orange-500 hover:bg-orange-500 hover:text-white px-6 text-xs py-2 rounded"
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    ADD
                                                </button>
                                            </div>
                                        </div>
                                    ))}
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
                <div className="flex justify-end p-4">
                    <button onClick={handleMenuClick} className="text-gray-500 text-xl">
                        &times;
                    </button>
                </div>
                <ul className="flex flex-col p-4 space-y-4">
                    {uniqueCategories.map((categoryName, index) => (
                        <li key={index} className="cursor-pointer text-orange-500 hover:text-orange-700" onClick={handleMenuClick}>
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
        </>
    );
};

export default MenuComponent;
