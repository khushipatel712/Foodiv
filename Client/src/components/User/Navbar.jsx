import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useParams } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { useGetProfileByIdQuery } from '../../services/adminApi';
import Cookies from 'js-cookie';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(Cookies.get('token') || '');

  const { id } = useParams();
  const { data: fetchedProfile, error } = useGetProfileByIdQuery(id);

  useEffect(() => {
    if (fetchedProfile) {
      setProfile(fetchedProfile);
    }
  }, [fetchedProfile]);

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    closeMenu();
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
    closeMenu();
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    // Refresh the component by updating state
    setToken(Cookies.get('token') || '');
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
    // Refresh the component by updating state
    setToken(Cookies.get('token') || '');
  };

  const handleLogout = () => {
    Cookies.remove('token'); // Remove token from cookies
    setToken(''); // Clear token from state
  };

  return (
    <div className="relative z-50">
      <nav className="bg-white shadow-md flex items-center justify-between p-4 lg:px-20">
        <div className="flex items-center">
          <img
            src={profile?.image || "/path/to/default/logo.png"}
            alt="Logo"
            className="h-8 w-8 object-cover mr-2"
          />
          <h1 className="text-lg font-bold">{profile?.restaurantName || "Shivi Fries"}</h1>
        </div>
        <div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <FaBars size={20} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-y-0 right-0 justify-end bg-black bg-opacity-50 flex z-20">
          <div className="w-64 bg-white p-6 shadow-md">
            <button onClick={toggleMenu} className="focus:outline-none">
              <IoMdClose size={24} />
            </button>
            <ul className="mt-6 space-y-4">
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Home</a></li>
              {!token ? (
                <>
                  <li>
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      className="block text-orange-500 hover:text-orange-700"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="block text-orange-500 hover:text-orange-700"
                    >
                      Register
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block text-orange-500 hover:text-orange-700"
                  >
                    Logout
                  </button>
                </li>
              )}
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Terms and Conditions</a></li>
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Privacy Policy</a></li>
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Cancellation Policy</a></li>
              <li><a href="#" className="block text-orange-500 hover:text-orange-700">Shipping Policy</a></li>
              {profile && (
                <li className="mt-4 text-gray-700">
                  <p><strong>Restaurant Name:</strong> {profile.restaurantName}</p>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Mobile Number:</strong> {profile.mobileNumber}</p>
                  <p><strong>Address:</strong> {profile.address}, {profile.city}, {profile.state}</p>
                </li>
              )}
              {error && <li className="mt-4 text-red-500">Error fetching profile data.</li>}
            </ul>
          </div>
          <div className="flex-1" onClick={closeMenu}></div>
        </div>
      )}

      {isLoginModalOpen && <LoginModal onClose={handleCloseLoginModal} adminId={id}/>}
      {isRegisterModalOpen && <RegisterModal onClose={handleCloseRegisterModal} adminId={id} />}
    </div>
  );
};

export default Navbar;
