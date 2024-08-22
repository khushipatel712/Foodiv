import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { TbPremiumRights } from "react-icons/tb";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { MdOutlinePolicy } from "react-icons/md";

const navItems = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard', // Dashboard page path
    icon: <TbLayoutDashboard size={20} />,
  },
  {
    title: 'Orders',
    icon: <MdOutlineRestaurantMenu size={20} />,
    subItems: [
      { title: 'Active Orders', path: '/admin/orders/active' }, // Active Orders page path
      { title: 'All Orders', path: '/admin/orders/all' }, // All Orders page path
    ],
  },
  {
    title: 'Menu Management',
    icon: <MdMenuBook size={20} />,
    subItems: [
      { title: 'Menu', path: '/admin/menu' }, // Menu page path
      { title: 'Categories', path: '/admin/categories'}, // Categories page path
    ],
  },
  {
    title: 'Manage',
    path: '/admin/manage', // Manage page path
    icon: <RxDashboard size={20} />,
  },
  {
    title: 'Subscriptions',
    path: '/admin/subscriptions', // Subscriptions page path
    icon: <TbPremiumRights size={20} />,
  },
  {
    title: 'Manage Policies',
    path: '/admin/policies', // Manage Policies page path
    icon: <MdOutlinePolicy size={20} />,
  },
  {
    title: 'My Accounts',
    path: '/admin/account', // My Accounts page path
    icon: <RiAccountPinCircleLine size={20} />,
  },
  {
    title: 'Foodiv Tutorials',
    path: 'https://www.youtube.com/@foodiv', // Foodiv Tutorials page path
    icon: <FiYoutube size={20} />,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubMenuToggle = (index) => {
    if (openSubMenu === index) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(index);
    }
  };

  const handleLogout = async () => {
    // Handle logout functionality here, if necessary
  };

  return (
    <nav className={`bg-white text-black p-4 mt-2 ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 m-6 my-10 overflow-y-auto`}>
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center">
          {isOpen ? <FaTimes onClick={toggleSidebar} size={20} /> : <FaBars onClick={toggleSidebar} size={20} />}
        </div>
      </div>
      <div className="mt-4 my-6">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            {item.subItems ? (
              <div>
                <div
                  className="flex items-center space-x-2 cursor-pointer group-hover:bg-gray-200 py-2"
                  onClick={() => handleSubMenuToggle(index)}
                >
                  {item.icon}
                  {isOpen && <span className="text-base">{item.title}</span>}
                </div>
                {isOpen && openSubMenu === index && (
                  <div className="pl-8">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className="flex items-center px-2 py-2 w-full hover:text-gray-600"
                      >
                        <span>{subItem.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : item.title === 'Logout' ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 py-2 w-full hover:bg-gray-200"
              >
                {item.icon}
                {isOpen && <span className="text-base">{item.title}</span>}
              </button>
            ) : (
              <NavLink
                to={item.path}
                className="flex items-center space-x-2 py-2 hover:bg-gray-200"
              >
                {item.icon}
                {isOpen && <span className="text-base">{item.title}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
