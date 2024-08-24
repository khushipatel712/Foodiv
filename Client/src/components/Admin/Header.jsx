import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOnlineStatus } from '../../slice/adminSlice';
import { useGetProfileQuery, useUpdateStatusMutation } from '../../services/adminApi';
import { FaBars, FaTimes, FaBell, FaChevronDown, FaToggleOn, FaToggleOff, FaUserCircle } from 'react-icons/fa';
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
    const token = Cookies.get('token');
    const [isOpen, setIsOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    
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

    // Toggle profile menu dropdown
    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Render based on query status
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error loading profile data.</p>;
    }

    return (
        <nav className="w-full bg-white shadow-lg z-50 flex items-center px-4  py-6">
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
                <div className="relative">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={toggleProfileMenu}
                    >
                        {profile?.image ? (
                            <img src={profile.image} alt='profile' className='w-7 h-7 rounded-full' />
                        ) : (
                            <FaUserCircle size={20} className="text-gray-800" />
                        )}
                        <span className="text-gray-800 text-sm">{profile?.restaurantName}</span>
                        <FaChevronDown className="text-gray-800" />
                    </div>
                    {profileMenuOpen && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg p-2 w-48 text-sm">
                            <Link to="/admin/account" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Profile</Link>
                            <Link to="/orders/all" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Order</Link>
                            <a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Settings</a>
                            <Link to="/support" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Support</Link>
                            <Link to="/smtp-setting" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">SMTP Setting</Link>
                            <a href="#" className="block py-2 px-4 text-gray-800 hover:bg-gray-200">Logout</a>
                        </div>
                    )}
                </div>
                <div className="md:hidden flex items-center text-orange-600">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg w-auto absolute top-full left-0 right-0">
                    <div className="flex flex-col items-center space-y-4 py-4">
                        {/* Mobile Menu Items */}
                        {/* Your mobile menu items go here */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
