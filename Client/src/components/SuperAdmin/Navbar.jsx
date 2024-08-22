import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPizzaSlice, FaBeer, FaTable, FaUtensils, FaChevronDown, FaCaretDown } from 'react-icons/fa';
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    const menuItems = [
        { name: 'Online Ordering', path: '/online-ordering', submenu: true },
        { name: 'Pricing', path: '/pricing', submenu: false },
        { name: 'Blog', path: '/blog', submenu: false },
        { name: 'Partners', path: '/partners', submenu: false },
        { name: 'Contact Us', path: '/contact-us', submenu: false },
        { name: 'Login', path: '/login', submenu: false }
    ];

    const submenuItems = [
        { name: 'Pizza Ordering System', path: '/pizza-ordering', icon: <FaPizzaSlice /> },
        { name: 'Alcohol Delivery Software', path: '/alcohol-delivery', icon: <FaBeer /> },
        { name: 'Tableside Ordering System', path: '/tableside-ordering', icon: <FaTable /> },
        { name: 'Restaurant POS System', path: '/restaurant-pos', icon: <FaUtensils /> },
        { name: 'Restaurant Website Builder', path: '/website-builder', icon: <FaUtensils /> },
        { name: 'Cloud Kitchen Ordering System', path: '/cloud-kitchen', icon: <FaUtensils /> },
        { name: 'Takeaway Ordering System', path: '/takeaway-ordering', icon: <FaUtensils /> },
        { name: 'Restaurant Management Software', path: '/restaurant-management', icon: <FaUtensils /> },
        { name: 'Kitchen Display System', path: '/kitchen-display', icon: <FaUtensils /> },
        { name: 'Cafe Ordering System', path: '/cafe-ordering', icon: <FaUtensils /> },
        { name: 'Pre-Order & Catering System', path: '/pre-order-catering', icon: <FaUtensils /> },
        { name: 'Mobile Order & Pay', path: '/mobile-order-pay', icon: <FaUtensils /> },
        { name: 'Restaurant Billing Software', path: '/billing-software', icon: <FaUtensils /> },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 lg:px-28">
            <div className="w-full px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="w-32 h-auto" />
                    </div>
                    <div className="hidden md:flex space-x-6">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative group">
                                <Link to={item.path} className="text-gray-800 text-lg hover:text-orange-600 hover:underline flex items-center">
                                    {item.name}
                                    {item.submenu && <FaCaretDown className="ml-1" />} {/* Down arrow icon */}
                                </Link>
                                {item.submenu && (
                                    <div className="absolute top-full left-0 w-max bg-white shadow-lg p-4 z-50 hidden group-hover:block">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {submenuItems.map((submenuItem, idx) => (
                                                <Link
                                                    key={idx}
                                                    to={submenuItem.path}
                                                    className="flex items-center text-gray-800 hover:text-orange-600"
                                                >
                                                    <span className="mr-2 text-orange-600">{submenuItem.icon}</span>
                                                    {submenuItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="hidden md:flex">
                        <Link to="/register">
                            <button className="bg-orange-600 text-white px-6 py-3 rounded-3xl hover:bg-white hover:text-orange-600 border border-orange-600">
                                Register Now
                            </button>
                        </Link>
                    </div>
                    <div className="md:hidden flex items-center text-orange-600">
                        <button onClick={toggleMenu}>
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg w-auto">
                    <div className="flex flex-col items-center space-y-4 py-4">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative">
                                <button
                                    onClick={() => item.submenu && toggleSubmenu(index)}
                                    className="text-gray-800 hover:text-orange-600 hover:underline flex items-center"
                                >
                                    {item.name}
                                    {item.submenu && <FaChevronDown className="ml-2" />} {/* Down arrow icon */}
                                </button>
                                {item.submenu && activeSubmenu === index && (
                                    <div className="bg-white p-4 mt-2 w-full overflow-scroll">
                                        {submenuItems.map((submenuItem, idx) => (
                                            <Link
                                                key={idx}
                                                to={submenuItem.path}
                                                className="flex items-center text-left text-gray-800 py-2 hover:text-orange-600"
                                            >
                                                <span className="mr-2 text-orange-600">{submenuItem.icon}</span>
                                                {submenuItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link to="/register">
                            <button className="bg-orange-600 text-white px-4 py-2 rounded-3xl hover:bg-white hover:text-orange-600 border border-orange-600">
                                Register Now
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
