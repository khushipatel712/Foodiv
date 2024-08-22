import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import LoginModal from './LoginModal'; 
import RegisterModal from './RegisterModal';// Adjust the path as necessary

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setMenuOpen(!menuOpen);
  };


  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
    setMenuOpen(!menuOpen);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <div className="relative z-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md flex items-center justify-between p-4 lg:px-20">
        {/* Left side: Logo and text */}
        <div className="flex items-center">
          <img
            src="/path/to/your/logo.png" // Update this with the correct path to your image
            alt="Logo"
            className="h-8 w-8 object-cover mr-2"
          />
          <h1 className="text-lg font-bold">Shivi Fries</h1>
        </div>

        <div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <FaBars size={20} />
          </button>
        </div>
      </nav>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="fixed  inset-y-0 right-0 justify-end bg-black bg-opacity-50 flex z-20">
          <div className="w-64 bg-white p-6 shadow-md">
            <button onClick={toggleMenu} className="focus:outline-none">
              <IoMdClose size={24} />
            </button>
            <ul className="mt-6 space-y-4">
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Home</a></li>
              <li>
                <button 
                  type="button"
                  onClick={handleLoginClick}
                  className="block text-orange-500 hover:text-orange-700"
                >
                  Login
                </button>
              </li>
              <li> <button 
                  type="button"
                  onClick={handleRegisterClick}
                  className="block text-orange-500 hover:text-orange-700"
                >
                  Register
                </button></li>
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Terms and Conditions</a></li>
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Privacy Policy</a></li>
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Cancellation Policy</a></li>
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Shipping Policy</a></li>
            </ul>
          </div>
          <div className="flex-1" onClick={closeMenu}></div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginModal onClose={handleCloseLoginModal} />
      )}

      {isRegisterModalOpen && (
        <RegisterModal onClose={handleCloseRegisterModal} />
      )}
    </div>
  );
};

export default Navbar;
