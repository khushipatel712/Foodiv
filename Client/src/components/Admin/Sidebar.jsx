import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdOutlineRestaurantMenu, MdMenuBook, MdOutlinePolicy } from 'react-icons/md';
import { TbLayoutDashboard, TbPremiumRights } from 'react-icons/tb';
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

const Sidebar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const navigate = useNavigate();

  const handleSubMenuToggle = (index) => {
    setOpenSubMenu(openSubMenu === index ? null : index);
  };

  return (
    <nav className="  left-0 h-screen bg-white shadow-lg z-50 w-64 overflow-y-auto p-4">
      <div className="flex items-center justify-between ">
      
      </div>
      <div className="flex flex-col space-y-2">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            {item.subItems ? (
              <div>
                <button
                  className={`flex items-center w-full py-2 px-4 text-left ${
                    openSubMenu === index ? 'bg-gray-100' : 'text-gray-800'
                  } hover:bg-gray-200 rounded-md focus:outline-none`}
                  onClick={() => handleSubMenuToggle(index)}
                >
                  {item.icon}
                  <span className="ml-3 text-base">{item.title}</span>
                </button>
                {openSubMenu === index && (
                  <div className="pl-8 mt-2 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className="block py-2 px-4 text-gray-700 hover:bg-gray-300 rounded-md"
                        activeclassname="bg-gray-300 text-gray-900"
                      >
                        {subItem.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : item.title === 'Logout' ? (
              <button
                className="flex items-center w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-200 rounded-md"
                onClick={() => {
                  // Handle logout functionality here
                }}
              >
                {item.icon}
                <span className="ml-3 text-base">{item.title}</span>
              </button>
            ) : (
              <NavLink
                to={item.path}
                className="flex items-center w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-200 rounded-md"
                activeclassname="bg-gray-200 text-gray-900"
              >
                {item.icon}
                <span className="ml-3 text-base">{item.title}</span>
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;


// import React, { useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { RxDashboard } from "react-icons/rx";
// import { MdOutlineRestaurantMenu, MdMenuBook, MdOutlinePolicy } from "react-icons/md";
// import { TbLayoutDashboard, TbPremiumRights } from "react-icons/tb";
// import { RiAccountPinCircleLine } from "react-icons/ri";
// import { FiYoutube } from "react-icons/fi";

// const navItems = [
//   {
//     title: 'Dashboard',
//     path: '/admin/dashboard',
//     icon: <TbLayoutDashboard size={20} />,
//   },
//   {
//     title: 'Orders',
//     icon: <MdOutlineRestaurantMenu size={20} />,
//     subItems: [
//       { title: 'Active Orders', path: '/admin/orders/active' },
//       { title: 'All Orders', path: '/admin/orders/all' },
//     ],
//   },
//   {
//     title: 'Menu Management',
//     icon: <MdMenuBook size={20} />,
//     subItems: [
//       { title: 'Menu', path: '/admin/menu' },
//       { title: 'Categories', path: '/admin/categories'},
//     ],
//   },
//   {
//     title: 'Subscriptions',
//     path: '/admin/subscriptions',
//     icon: <TbPremiumRights size={20} />,
//   },
//   {
//     title: 'Manage Policies',
//     path: '/admin/policies',
//     icon: <MdOutlinePolicy size={20} />,
//   },
//   {
//     title: 'My Accounts',
//     path: '/admin/account',
//     icon: <RiAccountPinCircleLine size={20} />,
//   },
//   {
//     title: 'Foodiv Tutorials',
//     path: 'https://www.youtube.com/@foodiv',
//     icon: <FiYoutube size={20} />,
//   },
// ];

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [openSubMenu, setOpenSubMenu] = useState(null);
//   const navigate = useNavigate();

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSubMenuToggle = (index) => {
//     setOpenSubMenu(openSubMenu === index ? null : index);
//   };

//   const handleLogout = async () => {
//     // Handle logout functionality here, if necessary
//   };

//   return (
//     <>
//       <FaBars
//         onClick={toggleSidebar}
//         size={20}
//         className="sm:hidden cursor-pointer fixed top-4 right-4 z-50"
//       />
//       <nav
//         className={`bg-white text-black p-4 mt-2 fixed top-0 right-0 z-40 h-full overflow-y-auto transition-transform duration-300 ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         } sm:translate-x-0 sm:w-64 w-full`}
//       >
//         <div className="flex items-center justify-between">
//           <h1 className="text-xl font-bold">Menu</h1>
//           <FaTimes
//             onClick={toggleSidebar}
//             size={20}
//             className="sm:hidden cursor-pointer"
//           />
//         </div>
//         <div className="mt-6">
//           {navItems.map((item, index) => (
//             <div key={index} className="relative group">
//               {item.subItems ? (
//                 <div>
//                   <div
//                     className="flex items-center space-x-2 cursor-pointer group-hover:bg-gray-200 py-2"
//                     onClick={() => handleSubMenuToggle(index)}
//                   >
//                     {item.icon}
//                     <span className="text-base">{item.title}</span>
//                   </div>
//                   {openSubMenu === index && (
//                     <div className="pl-8">
//                       {item.subItems.map((subItem, subIndex) => (
//                         <NavLink
//                           key={subIndex}
//                           to={subItem.path}
//                           className="flex items-center px-2 py-2 w-full hover:text-gray-600"
//                         >
//                           <span>{subItem.title}</span>
//                         </NavLink>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ) : item.title === 'Logout' ? (
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 py-2 w-full hover:bg-gray-200"
//                 >
//                   {item.icon}
//                   <span className="text-base">{item.title}</span>
//                 </button>
//               ) : (
//                 <NavLink
//                   to={item.path}
//                   className="flex items-center space-x-2 py-2 hover:bg-gray-200"
//                 >
//                   {item.icon}
//                   <span className="text-base">{item.title}</span>
//                 </NavLink>
//               )}
//             </div>
//           ))}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Sidebar;


