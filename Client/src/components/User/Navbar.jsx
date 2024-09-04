import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
  const [token, setToken] = useState(Cookies.get('userToken') || '');

  const { id } = useParams();
  const { data: fetchedProfile, error } = useGetProfileByIdQuery(id);
  const navigate =useNavigate();

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

  const handleNavigation = (path) => {
    navigate(path);
    closeMenu();
};

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
   
    setToken(Cookies.get('userToken') || '');
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
    // Refresh the component by updating state
    setToken(Cookies.get('userToken') || '');
  };

  const handleLogout = () => {
    Cookies.remove('userToken'); // Remove token from cookies
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
        <div className="fixed top-0 inset-y-0 h-fit right-0 justify-end bg-black bg-opacity-50 flex z-20">
          <div className="w-64 bg-white p-6 shadow-md">
            <button onClick={toggleMenu} className="focus:outline-none">
              <IoMdClose className='size-5' />
            </button>
            <ul className="mt-6 space-y-4 text-sm sm:text-base">
              <li><button onClick={()=>handleNavigation (`/${id}/user/menu`)} className="block text-orange-500 hover:text-orange-700">Home</button></li>
              {!
              token ? (
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
              <li><button  onClick={() => handleNavigation(`/${id}/terms`)} className="block text-orange-500 hover:text-orange-700">Terms and Conditions</button></li>
              <li><button  onClick={()=>handleNavigation( `/${id}/privacy`)} className="block text-orange-500 hover:text-orange-700">Privacy Policy</button></li>
              <li><button  onClick={()=>handleNavigation( `/${id}/cancellation`)} className="block text-orange-500 hover:text-orange-700">Cancellation Policy</button></li>
              <li><button  onClick={()=>handleNavigation( `/${id}/shipping`)} className="block text-orange-500 hover:text-orange-700">Shipping Policy</button></li>
              {profile && (
                <li className="mt-4 text-gray-700">
                  <div> <span className='font-bold'>Restaurant Name:</span>{profile.restaurantName}</div>
                  <div> <span className='font-bold'>Email:</span> {profile.email}</div>
                  <div> <span className='font-bold'>Mobile Number:</span> {profile.mobileNumber}</div>
                  <div> <span className='font-bold'>Address:</span> {profile.address}, {profile.city}, {profile.state}</div>
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
