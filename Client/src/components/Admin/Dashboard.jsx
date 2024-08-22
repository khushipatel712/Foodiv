import React from 'react';
import order from 'D:/Node and React/Foodiv/Client/public/assests/new_order.svg'
const Dashboard = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Store Link Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Store Link</h2>
        <p className="text-gray-600">Share your web store's link on social media to attract more customers.</p>
        <a
          href="https://shivifries.myfoodiv.com"
          className="text-blue-500 flex items-center mt-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://shivifries.myfoodiv.com
        
        </a>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Individual Stat Boxes */}
        {[
          { label: "New Orders", value: "0", iconColor: "bg-teal-500" },
          { label: "Active Orders", value: "0", iconColor: "bg-blue-500" },
          { label: "New Customers (Today's)", value: "0", iconColor: "bg-red-500" },
          { label: "Total Orders", value: "0", iconColor: "bg-purple-500" },
          { label: "Orders (Current Month)", value: "0", iconColor: "bg-yellow-500" },
          { label: "Today's Orders", value: "0", iconColor: "bg-gray-500" },
          { label: "Total Revenue", value: "₹ 0.00", iconColor: "bg-indigo-500" },
          { label: "Revenue (Current Month)", value: "₹ 0.00", iconColor: "bg-pink-500" },
          { label: "Today's Revenue", value: "₹ 0.00", iconColor: "bg-green-500" },
          { label: "My Customers", value: "0", iconColor: "bg-blue-500" },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.iconColor} text-white flex items-center justify-center rounded-xl transform rotate-45 hover:rotate-0`}>
              <img src={order} className='w-8 h-8 transform -rotate-45 hover:rotate-0'/>
            
            </div>
          </div>
        ))}
      </div>

      {/* Active Plan Section */}
      <div className="bg-white p-4 rounded-lg shadow mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full mr-3">ACTIVE PLAN</span>
          <p className="text-xl font-semibold">BASIC PLAN</p>
        </div>
        <div className="flex items-center">
          <h3 className="text-gray-600">My Customers</h3>
          <p className="text-2xl font-semibold ml-4">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
