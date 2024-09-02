import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { TbLayoutDashboard } from 'react-icons/tb';
import { MdOutlineRestaurantMenu, MdMenuBook, MdOutlinePolicy } from 'react-icons/md';
import { TbPremiumRights } from 'react-icons/tb';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { FiYoutube } from 'react-icons/fi';

const navItems = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <TbLayoutDashboard size={20} />,
  },
  {
    title: 'Orders',
    icon: <MdOutlineRestaurantMenu size={20} />,
    subItems: [
      { title: 'Active Orders', path: '/admin/orders/active' },
      { title: 'All Orders', path: '/admin/orders/all' },
    ],
  },
  {
    title: 'Menu Management',
    icon: <MdMenuBook size={20} />,
    subItems: [
      { title: 'Menu', path: '/admin/menu' },
      { title: 'Categories', path: '/admin/categories' },
    ],
  },
  {
    title: 'Subscriptions',
    path: '/admin/subscriptions',
    icon: <TbPremiumRights size={20} />,
  },
  {
    title: 'Manage Policies',
    path: '/admin/policies',
    icon: <MdOutlinePolicy size={20} />,
  },
  {
    title: 'My Accounts',
    path: '/admin/account',
    icon: <RiAccountPinCircleLine size={20} />,
  },
  {
    title: 'Foodiv Tutorials',
    path: 'https://www.youtube.com/@foodiv',
    icon: <FiYoutube size={20} />,
  },
];

const MobileSidebar = ({ isOpen, toggleSidebar }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.sidebar') && isOpen) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <nav
      className={`sidebar bg-white text-black fixed inset-y-0 left-0 transition-transform transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 z-50 sm:p-4 p-2 overflow-y-auto`}
    >
      <div className="flex items-center justify-between">
        <FaTimes onClick={toggleSidebar} size={20} className="cursor-pointer" />
      </div>
      <div className="mt-4">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            {item.subItems ? (
              <div>
                <div
                  className="flex items-center space-x-2 cursor-pointer group-hover:bg-gray-200 py-2"
                  onClick={() => handleSubMenuToggle(index)}
                >
                  {item.icon}
                  <span className="text-base">{item.title}</span>
                </div>
                {openSubMenu === index && (
                  <div className="pl-8">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className="flex items-center px-2 py-2 w-full hover:text-gray-600"
                        onClick={toggleSidebar} // Close sidebar when clicking a submenu item
                      >
                        <span>{subItem.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                className="flex items-center space-x-2 py-2 hover:bg-gray-200"
                onClick={toggleSidebar} // Close sidebar when clicking an item
              >
                {item.icon}
                <span className="text-base">{item.title}</span>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MobileSidebar;
