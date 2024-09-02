import React, { useState, useEffect } from 'react';
import order from 'D:/Node and React/Foodiv/Client/public/assests/new_order.svg';
import Cookies from 'js-cookie';
import axios from 'axios';
import dayjs from 'dayjs';
import { useGetProfileQuery } from '../../services/adminApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    newOrders: 0,
    activeOrders: 0,
    newCustomersToday: 0,
    totalOrders: 0,
    ordersCurrentMonth: 0,
    todaysOrders: 0,
    totalRevenue: 0,
    revenueCurrentMonth: 0,
    todaysRevenue: 0,
    myCustomers: 0
  });

  const token = Cookies.get('token');
  const { data: profileData } = useGetProfileQuery(token);

  const adminId = profileData?.id;
  const dynamicUrl = adminId ? `http://localhost:5173/${adminId}/user/menu` : '#';

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    const fetchStats = async () => {
      try {
        if (adminId) {
          console.log(adminId);

          // Replace with your actual API endpoint
          const response = await axios.get(`http://localhost:5001/api/orders/admin/${adminId}`);
          const data = response.data;

          const today = dayjs().startOf('day');
          const currentMonth = dayjs().startOf('month');

          let newOrders = 0;
          let activeOrders = 0;
          let newCustomersToday = 0;
          let totalOrders = 0;
          let ordersCurrentMonth = 0;
          let todaysOrders = 0;
          let totalRevenue = 0;
          let revenueCurrentMonth = 0;
          let todaysRevenue = 0;
          let myCustomers = 0;

          data.forEach(order => {
            // Order statistics
            if (order.orderStatus === "New Order") newOrders++;
            if (order.orderStatus !== "New Order" && order.orderStatus !== "Cancelled") activeOrders++;
            totalOrders++;

            const orderDate = dayjs(order.createdAt);

            if (orderDate.isSame(today, 'day')) todaysOrders++;
            if (orderDate.isSame(currentMonth, 'month')) ordersCurrentMonth++;

            totalRevenue += order.totalAmount;
            if (orderDate.isSame(today, 'day')) todaysRevenue += order.totalAmount;
            if (orderDate.isSame(currentMonth, 'month')) revenueCurrentMonth += order.totalAmount;
          });

          // Customer statistics
          myCustomers = data.length; // Assuming you have a separate API to get customer count

          if (isMounted) {
            setStats({
              newOrders,
              activeOrders,
              newCustomersToday,
              totalOrders,
              ordersCurrentMonth,
              todaysOrders,
              totalRevenue: `₹ ${totalRevenue.toFixed(2)}`,
              revenueCurrentMonth: `₹ ${revenueCurrentMonth.toFixed(2)}`,
              todaysRevenue: `₹ ${todaysRevenue.toFixed(2)}`,
              myCustomers
            });
          }
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats();

    return () => {
      isMounted = false; // Set flag to false when component unmounts
    };
  }, [adminId]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Store Link Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Store Link</h2>
        <p className="text-gray-600">Share your web store's link on social media to attract more customers.</p>
        <a
          href={dynamicUrl}
          className="text-blue-500 flex items-center mt-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dynamicUrl}
        </a>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Individual Stat Boxes */}
        {[
          { label: "New Orders", value: stats.newOrders, iconColor: "bg-teal-500" },
          { label: "Active Orders", value: stats.activeOrders, iconColor: "bg-blue-500" },
          { label: "New Customers (Today's)", value: stats.newCustomersToday, iconColor: "bg-red-500" },
          { label: "Total Orders", value: stats.totalOrders, iconColor: "bg-purple-500" },
          { label: "Orders (Current Month)", value: stats.ordersCurrentMonth, iconColor: "bg-yellow-500" },
          { label: "Today's Orders", value: stats.todaysOrders, iconColor: "bg-gray-500" },
          { label: "Total Revenue", value: stats.totalRevenue, iconColor: "bg-indigo-500" },
          { label: "Revenue (Current Month)", value: stats.revenueCurrentMonth, iconColor: "bg-pink-500" },
          { label: "Today's Revenue", value: stats.todaysRevenue, iconColor: "bg-green-500" },
          { label: "My Customers", value: stats.myCustomers, iconColor: "bg-blue-500" }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.iconColor} text-white flex items-center justify-center rounded-xl transform rotate-45 hover:rotate-0`}>
              <img src={order} className="w-8 h-8 transform -rotate-45 hover:rotate-0" alt="Icon" />
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
        {/* <div className="flex items-center">
          <h3 className="text-gray-600">My Customers</h3>
          <p className="text-2xl font-semibold ml-4">0</p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
