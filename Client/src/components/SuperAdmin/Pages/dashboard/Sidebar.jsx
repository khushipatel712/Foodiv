import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSignOutAlt, FaInfoCircle, FaBlog, FaBuilding, FaBox, FaTag, FaCog, FaTimes, FaRegImage, FaUser, FaChartBar, FaIndustry, FaQuestion, FaFlag, FaCertificate, FaThList, FaBoxes, FaTasks, FaTrademark, FaListAlt, FaHeading, FaRegFileAlt } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";


const navItems = [
  {
    title: 'Dashboard',
    path: '/superadmin',
    icon: <RxDashboard size={24} />,
  },
  {
    title: 'Home',
    icon: <FaHome size={24} />,
    subItems: [
      { title: 'OnlineWeb', path: '/superadmin/onlineweb', icon: <FaRegImage size={20} /> },
      { title: 'Manage', path: '/superadmin/manage', icon: <FaUser size={20} /> },
      { title: 'Restaurants', path: '/superadmin/restaurant', icon: <FaRegImage size={20} /> },
      { title: 'Seamless', path: '/superadmin/seamless', icon: <FaUser size={20} /> },
      { title: 'Setup', path: '/superadmin/setup', icon: <FaRegImage size={20} /> },
      { title: 'Feature', path: '/superadmin/feature', icon: <FaRegImage size={20} /> },
      { title: 'Servemore', path: '/superadmin/servemore', icon: <FaUser size={20} /> },
      { title: 'Shareprofit', path: '/superadmin/shareprofit', icon: <FaRegImage size={20} /> },
      { title: 'SmoothProcess', path: '/superadmin/smoothprocess', icon: <FaUser size={20} /> },
      { title: 'OnlineFood', path: '/superadmin/onlinefood', icon: <FaRegImage size={20} /> },
      { title: 'Ratings', path: '/superadmin/ratings', icon: <FaUser size={20} /> },
      { title: 'Customer', path: '/superadmin/customer', icon: <FaRegImage size={20} /> },
      { title: 'Review', path: '/superadmin/review', icon: <FaUser size={20} /> },
      { title: 'Faq', path: '/superadmin/faq', icon: <FaRegImage size={20} /> },
      // { title: 'Manage', path: '/superadmin/manage', icon: <FaUser size={20} /> },
      // { title: 'Counter', path: '/admin/counter', icon: <FaChartBar size={20} /> },
      // { title: 'Sector', path: '/admin/sector', icon: <FaIndustry size={20} /> },
      // { title: 'Why Choose Us', path: '/admin/whychooseus', icon: <FaQuestion size={20} /> },
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
    path: '/superadmin/blog',
    icon: <FaBlog size={24} />,
  },
  {
    title: 'System',
    icon: <FaBuilding size={24} />,
    subItems: [
      { title: 'System', path: '/superadmin/system', icon: <FaThList size={20} /> },
      { title: 'System Content', path: '/superadmin/system/content', icon: <FaBoxes size={20} /> },
    ],
  },
  {
    title: 'Partner',
    icon: <FaBox size={24} />,
    subItems: [
      { title: 'Join Foddiv', path: '/superadmin/joinfoodiv', icon: <FaThList size={20} /> },
      { title: 'How to Become Partner', path: '/superadmin/becomepartner', icon: <FaBoxes size={20} /> },
      { title: 'Partner Network', path: '/superadmin/partnernetwork', icon: <FaTasks size={20} /> },
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
      { title: 'Header Setting', path: '/superadmin/header', icon: <FaHeading size={20} /> },
      { title: 'Footer Setting', path: '/superadmin/footer', icon: <FaRegFileAlt size={20} /> },
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
      <nav className={`bg-gray-800 text-white min-h-screen  overflow-y-auto transition-all duration-300 ${isOpen ? 'w-80' : 'w-0'}`}>
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


