import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaInfoCircle, FaBlog, FaBuilding, FaBox, FaTag, FaCog, FaTimes, FaRegImage, FaUser, FaChartBar, FaIndustry, FaQuestion, FaFlag, FaCertificate, FaThList, FaBoxes, FaTasks, FaTrademark, FaListAlt, FaHeading, FaRegFileAlt } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";


const navItems = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <RxDashboard size={24} />,
  },
  {
    title: 'Home',
    icon: <FaHome size={24} />,
    subItems: [
      { title: 'Banner', path: '/admin/banner', icon: <FaRegImage size={20} /> },
      { title: 'Client', path: '/admin/client', icon: <FaUser size={20} /> },
      { title: 'Counter', path: '/admin/counter', icon: <FaChartBar size={20} /> },
      { title: 'Sector', path: '/admin/sector', icon: <FaIndustry size={20} /> },
      { title: 'Why Choose Us', path: '/admin/whychooseus', icon: <FaQuestion size={20} /> },
    ],
  },
  {
    title: 'About Us',
    icon: <FaInfoCircle size={24} />,
    subItems: [
      { title: 'About Us', path: '/admin/aboutus', icon: <FaInfoCircle size={20} /> },
      { title: 'Mission Vision', path: '/admin/mission-vision', icon: <FaFlag size={20} /> },
      { title: 'Certificate', path: '/admin/certificate', icon: <FaCertificate size={20} /> },
    ],
  },
  {
    title: 'Blogs',
    path: '/admin/blog',
    icon: <FaBlog size={24} />,
  },
  {
    title: 'Infrastructure',
    path: '/admin/infra',
    icon: <FaBuilding size={24} />,
  },
  {
    title: 'Products',
    icon: <FaBox size={24} />,
    subItems: [
      { title: 'Category', path: '/admin/category', icon: <FaThList size={20} /> },
      { title: 'Product', path: '/admin/product', icon: <FaBoxes size={20} /> },
      { title: 'Application', path: '/admin/application', icon: <FaTasks size={20} /> },
    ],
  },
  {
    title: 'Brands',
    icon: <FaTag size={24} />,
    subItems: [
      { title: 'Brand', path: '/admin/brand', icon: <FaTrademark size={20} /> },
      { title: 'Brand Technical Specification', path: '/admin/brandspec', icon: <FaListAlt size={20} /> },
    ],
  },
  {
    title: 'Settings',
    icon: <FaCog size={24} />,
    subItems: [
      { title: 'Header Setting', path: '/admin/header', icon: <FaHeading size={20} /> },
      { title: 'Footer Setting', path: '/admin/footer', icon: <FaRegFileAlt size={20} /> },
    ],
  },
];

const Sidebar = ({ isOpen }) => {
    const [openSubMenu, setOpenSubMenu] = useState(null);
  
    const handleSubMenuToggle = (index) => {
      if (openSubMenu === index) {
        setOpenSubMenu(null);
      } else {
        setOpenSubMenu(index);
      }
    };
  
    return (
      <nav className={`bg-gray-800 text-white h-screen overflow-y-auto transition-all duration-300 ${isOpen ? 'w-80' : 'w-0'}`}>
        <div className="p-4">
          {navItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.subItems ? (
                <div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 py-2 px-4 rounded"
                    onClick={() => handleSubMenuToggle(index)}
                  >
                    {item.icon}
                    <span className="text-lg">{item.title}</span>
                  </div>
                  {openSubMenu === index && (
                    <div className="pl-8 mt-2">
                      {item.subItems.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded"
                          activeclassname="bg-gray-700"
                        >
                          {subItem.icon}
                          <span>{subItem.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  className="flex items-center space-x-2 py-2 px-4 hover:bg-gray-700 rounded"
                  activeclassname="bg-gray-700"
                >
                  {item.icon}
                  <span className="text-lg">{item.title}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </nav>
    );
  };
  
  export default Sidebar;


