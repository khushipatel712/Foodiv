import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOnlineStatus } from '../../slice/adminSlice';
import { useGetProfileQuery, useUpdateStatusMutation } from '../../services/adminApi';
import { FaBars, FaTimes, FaBell, FaChevronDown, FaToggleOn, FaToggleOff, FaUserCircle, FaTachometerAlt, FaBox, FaList, FaUtensils, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    const dispatch = useDispatch();
    const online = useSelector((state) => state.admin.online);

    const { data: profile, isLoading, isError } = useGetProfileQuery(token);
    const [updateStatus, { isLoading: isUpdatingStatus }] = useUpdateStatusMutation(token);

    const handleToggle = async () => {
        try {
            dispatch(toggleOnlineStatus());
            await updateStatus({ online: !online }).unwrap();
        } catch (error) {
            console.error('Failed to update status:', error);
            dispatch(toggleOnlineStatus());
        }
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };
    const handleMenuClick = () => {
        setIsOpen(false); // Closes the sidebar
    };
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading profile data.</p>;
    }

    return (
        <>
            <nav className="relative w-full bg-white shadow-lg z-50 flex items-center px-4 py-6">
                <div className="flex items-center flex-grow">
                    <img src={logo} alt="Logo" className="w-32 h-auto" />
                </div>
                <div className="flex items-center space-x-4">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={handleToggle}
                    >
                        {isUpdatingStatus ? (
                            <span className="text-gray-500">Updating...</span>
                        ) : online ? (
                            <>
                                <span className="text-gray-500">Offline</span>
                                <FaToggleOff size={24} className="text-gray-500" />
                            </>
                        ) : (
                            <>
                                <span className="text-green-500">Online</span>
                                <FaToggleOn size={24} className="text-green-500" />
                            </>
                        )}
                    </div>
                    <div>
                        <Link to="/admin/notification">
                            <FaBell size={20} className="text-gray-800 cursor-pointer" />
                        </Link>
                    </div>
                    <div className="relative" ref={profileMenuRef}>
                        <div
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={toggleProfileMenu}
                        >
                            {profile?.image ? (
                                <img src={profile.image} alt="profile" className="w-7 h-7 rounded-full" />
                            ) : (
                                <FaUserCircle size={20} className="text-gray-800" />
                            )}
                            <span className="text-gray-800 text-sm">{profile?.restaurantName}</span>
                            <FaChevronDown className="text-gray-800" />
                        </div>
                        {profileMenuOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48 text-sm">
                                <Link
                                    to="/admin/account"
                                    className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                                    onClick={() => setProfileMenuOpen(false)}
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/admin/account"
                                    className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                                    onClick={() => setProfileMenuOpen(false)}
                                >
                                    Settings
                                </Link>
                                <Link
                                    to="/support"
                                    className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                                    onClick={() => setProfileMenuOpen(false)}
                                >
                                    Support
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setProfileMenuOpen(false);
                                    }}
                                    className="block py-2 px-4 text-gray-800 hover:bg-gray-200 w-full text-left"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="lg:hidden flex items-center text-orange-600">
                        <button onClick={toggleMenu}>
                            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Fixed Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white w-56 shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-gray-800 lg:hidden"
                >
                    <FaTimes size={20} />
                </button>
                <div className="flex flex-col items-start p-4 space-y-4">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center text-sm space-x-2 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg w-full text-left"
                        onClick={handleMenuClick}
                    >
                        <FaTachometerAlt size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        to="/admin/orders/active"
                        className="flex items-center text-sm space-x-2 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg w-full text-left"
                        onClick={handleMenuClick}
                    >
                        <FaBox size={18} />
                        <span>Active Orders</span>
                    </Link>
                    <Link
                        to="/admin/orders/all"
                        className="flex items-center text-sm space-x-2 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg w-full text-left"
                        onClick={handleMenuClick}
                    >
                        <FaList size={18} />
                        <span>All Orders</span>
                    </Link>
                    <Link
                        to="/admin/menu"
                        className="flex items-center text-sm space-x-2 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg w-full text-left"
                        onClick={handleMenuClick}
                    >
                        <FaUtensils size={18} />
                        <span>Menu</span>
                    </Link>
                    <Link
                        to="/admin/settings"
                        className="flex items-center text-sm space-x-2 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg w-full text-left"
                        onClick={handleMenuClick}
                    >
                        <FaCog size={18} />
                        <span>Settings</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;
