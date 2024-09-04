// import React from 'react';
// import { FaEye } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// const OrderTable = () => {
//     const orders = [
//         {
//             createdDateTime: "14 August 2024, 03:55 PM",
//             orderDateTime: "14 August 2024, 03:55 PM",
//             isPreOrder: "No",
//             isArchived: "No",
//             orderId: "ORDER_118631723631140",
//             orderType: "Dine-In",
//             orderStatus: "Preparing",
//             amount: "₹50.00",
//             paymentStatus: "UnPaid",
//             customerName: "Shivi",
//             customerMobile: "1234567890",
//             customerEmail: "-",
//         },
//         {
//             createdDateTime: "08 August 2024, 11:33 AM",
//             orderDateTime: "08 August 2024, 11:33 AM",
//             isPreOrder: "Yes",
//             isArchived: "Yes",
//             orderId: "ORDER_118631723097031",
//             orderType: "Takeaway",
//             orderStatus: "Cancelled",
//             amount: "₹50.00",
//             paymentStatus: "UnPaid",
//             customerName: "Shivani",
//             customerMobile: "7284816345",
//             customerEmail: "-",
//         },
//     ];

//     const getPreOrderClass = (isPreOrder) => {
//         return isPreOrder === "Yes" ? "bg-green-500" : "bg-red-500";
//     };

//     const getArchivedClass = (isArchived) => {
//         return isArchived === "Yes" ? "bg-green-500" : "bg-red-500";
//     };

//     const getOrderTypeClass = (orderType) => {
//         switch (orderType) {
//             case "Dine-In":
//                 return "bg-yellow-500";
//             case "Takeaway":
//                 return "bg-blue-500";
//             default:
//                 return "bg-gray-500";
//         }
//     };

//     const getPaymentStatusClass = (paymentStatus) => {
//         return paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500";
//     };

//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200 text-base">
//                         <th className="px-4 py-2 border whitespace-nowrap">Created Date & Time</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Date & Time</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Is Pre-Order</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Is Archived</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Id</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Type</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Status</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Amount</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Payment Status</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Customer Name</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Customer Mobile</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Customer Email</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((order, index) => (
//                         <tr key={index}>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.createdDateTime}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.orderDateTime}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap">
//                                 <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPreOrderClass(order.isPreOrder)}`}>
//                                     {order.isPreOrder}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap">
//                                 <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getArchivedClass(order.isArchived)}`}>
//                                     {order.isArchived}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">
//                                 {order.orderId}
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap">
//                             <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getOrderTypeClass(order.orderType)}`}>
//                                 {order.orderType}
//                               </span>  
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.orderStatus}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.amount}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">
//                                 <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPaymentStatusClass(order.paymentStatus)}`}>
//                                     {order.paymentStatus}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.customerName}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.customerMobile}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.customerEmail}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap flex space-x-2">
//                                 <FaEye className="text-blue-500 cursor-pointer" />
//                                 <MdDelete className="text-red-500 cursor-pointer" />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default OrderTable;

// import React, { useState, useEffect } from 'react';
// import { FaEye } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
// import axios from 'axios';
// import { useGetProfileQuery } from '../../services/adminApi';

// const OrderTable = () => {
//     const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useGetProfileQuery();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             if (!profile?.id) return;
//             setLoading(true);
//             try {
//                 const response = await axios.get(`http://localhost:5001/api/orders/admin/${profile.id}`); // Replace with your API endpoint
//                 setOrders(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError('Error fetching orders');
//                 setLoading(false);
//             }
//             setLoading(false);
//         };

//         fetchOrders();
//     }, [profile]);

//     const getPreOrderClass = (isPreOrder) => {
//         return isPreOrder === 'Yes' ? 'bg-green-500' : 'bg-red-500';
//     };

//     const getArchivedClass = (isArchived) => {
//         return isArchived === 'Yes' ? 'bg-green-500' : 'bg-red-500';
//     };

//     const getOrderTypeClass = (orderType) => {
//         switch (orderType) {
//             case 'Dine-In':
//                 return 'bg-yellow-500';
//             case 'Takeaway':
//                 return 'bg-blue-500';
//             default:
//                 return 'bg-gray-500';
//         }
//     };

//     const getPaymentStatusClass = (paymentStatus) => {
//         return paymentStatus === 'paid' ? 'bg-green-500' : 'bg-red-500';
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200 text-base">
//                         <th className="px-4 py-2 border whitespace-nowrap">Created Date & Time</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Date & Time</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Is Pre-Order</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Is Archived</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Id</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Type</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Order Status</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Amount</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Payment Status</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Customer Name</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Customer Mobile</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Customer Email</th>
//                         <th className="px-4 py-2 border whitespace-nowrap">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map((order, index) => (
//                         <tr key={index}>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{new Date(order.createdAt).toLocaleString()}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{new Date(order.createdAt).toLocaleString()}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap">
//                                 <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPreOrderClass(order.isPreOrder)}`}>
//                                     {order.isPreOrder}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap">
//                                 <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getArchivedClass(order.isArchived)}`}>
//                                     {order.isArchived}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">
//                                 {order.orderId}
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap">
//                                 <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getOrderTypeClass(order.orderType)}`}>
//                                     {order.orderType}
//                                 </span>  
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.orderStatus}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.totalAmount}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">
//                                 <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPaymentStatusClass(order.paymentStatus)}`}>
//                                     {order.paymentStatus}
//                                 </span>
//                             </td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.contactDetail.name}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.contactDetail.mobile}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.contactDetail.email}</td>
//                             <td className="px-4 py-2 border whitespace-nowrap flex space-x-2">
//                                 <FaEye className="text-blue-500 cursor-pointer" />
//                                 <MdDelete className="text-red-500 cursor-pointer" />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default OrderTable;

import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useGetProfileQuery } from '../../services/adminApi';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaRegFileExcel } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const OrderTable = () => {
    const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useGetProfileQuery();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate=useNavigate();

    // Filter states
    const [filters, setFilters] = useState({
        customerFilter: '',
        orderTypeFilter: 'All',
        orderStatusFilter: 'All',
        paymentStatusFilter: 'All',
        fromDate: null,
        // toDate: null
    });

    // useEffect(() => {
    //     fetchOrders();
    // }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!profile?.id) return;
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5001/api/orders/admin/${profile.id}`);
                setOrders(response.data);
                setFilteredOrders(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [profile]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    const applyFilters = () => {
        let filtered = orders;

        if (filters.customerFilter) {
            filtered = filtered.filter(order => 
                order.contactDetail.name.toLowerCase().includes(filters.customerFilter.toLowerCase()) ||
                order.contactDetail.mobile.includes(filters.customerFilter) ||
                order.contactDetail.email.toLowerCase().includes(filters.customerFilter.toLowerCase())
            );
        }

        if (filters.orderTypeFilter !== 'All') {
            filtered = filtered.filter(order => order.orderType === filters.orderTypeFilter);
        }

        if (filters.orderStatusFilter !== 'All') {
            filtered = filtered.filter(order => order.orderStatus === filters.orderStatusFilter);
        }

        if (filters.paymentStatusFilter !== 'All') {
            filtered = filtered.filter(order => order.paymentStatus === filters.paymentStatusFilter);
        }

        if (filters.fromDate) {
            filtered = filtered.filter(order => new Date(order.createdAt) >= filters.fromDate);
        }


        setFilteredOrders(filtered);
    };

    const resetFilters = () => {
        setFilters({
            customerFilter: '',
            orderTypeFilter: 'All',
            orderStatusFilter: 'All',
            paymentStatusFilter: 'All',
            fromDate: null,
            // toDate: null
        });
        setFilteredOrders(orders);
    };

    const getPreOrderClass = (isPreOrder) => {
        return isPreOrder === 'Yes' ? 'bg-green-500' : 'bg-red-500';
    };

    const getArchivedClass = (isArchived) => {
        return isArchived === 'Yes' ? 'bg-green-500' : 'bg-red-500';
    };

    const getOrderTypeClass = (orderType) => {
        switch (orderType) {
            case 'DineIn':
                return 'bg-yellow-500';
            case 'Takeaway':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getPaymentStatusClass = (paymentStatus) => {
        return paymentStatus === 'paid' ? 'bg-green-500' : 'bg-red-500';

    };


    const flattenOrders = (orders) => {
        return orders.map(order => ({
            createdAt: new Date(order.createdAt).toLocaleString(),
            orderDateTime: new Date(order.createdAt).toLocaleString(),
            // isPreOrder: order.isPreOrder,
            // isArchived: order.isArchived,
            orderId: order._id,
            orderType: order.orderType,
            orderStatus: order.orderStatus,
            amount: order.totalAmount,
            paymentStatus: order.paymentStatus,
            customerName: order.contactDetail.name,
            customerMobile: order.contactDetail.mobile,
            customerEmail: order.contactDetail.email
        }));
    };

    const handleDelete = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete(`http://localhost:5001/api/order/${orderId}`);
                setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
                setFilteredOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            } catch (error) {
                console.error("Error deleting order:", error);
            }
        }
    };

    const handleOrderDetail = async (orderId) =>{
 try{
    navigate(`/admin/order-details/${orderId}`)

 } catch(err){
    console.error("Error displaying order detail")
 }


    }
    


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="space-y-4 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Customer Name, Mobile And Email"
                    value={filters.customerFilter}
                    onChange={(e) => handleFilterChange('customerFilter', e.target.value)}
                    className="border px-2 py-1 text-sm rounded w-full"
                />
                <select
                    value={filters.orderTypeFilter}
                    onChange={(e) => handleFilterChange('orderTypeFilter', e.target.value)}
                    className="border px-2 py-1 text-sm rounded w-full"
                >
                    <option value="All">Select Order Types</option>
                    <option value="DineIn">Dine-In</option>
                    <option value="Takeaway">Takeaway</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Table/Room">Table/Room</option>
                </select>
                <select
                    value={filters.orderStatusFilter}
                    onChange={(e) => handleFilterChange('orderStatusFilter', e.target.value)}
                    className="border px-2 py-1 text-sm rounded w-full"
                >
                    <option value="All">Select Order Statuses</option>
                    <option value="New Order">New Order</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Preparing">Ready for Serve</option>
                    <option value="Preparing">Ready for Pickup</option>
                    <option value="Preparing">Out for Delivery</option>
                    <option value="Preparing">Order Completed</option>
                    <option value="Preparing">Cancelled</option>
                    {/* Add more status options as needed */}
                </select>
                <select
                    value={filters.paymentStatusFilter}
                    onChange={(e) => handleFilterChange('paymentStatusFilter', e.target.value)}
                    className="border px-2 py-1 text-sm rounded w-full"
                >
                    <option value="All">Select Payment Statuses</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                </select>
                <div className='relative'>
                <DatePicker
                    selected={filters.fromDate}
                    onChange={(date) => handleFilterChange('fromDate', date)}
                    placeholderText="Select From Date"
                    className="border px-2 py-1 text-sm rounded w-full"
                />
                </div>
                {/* <DatePicker
                    selected={filters.toDate}
                    onChange={(date) => handleFilterChange('toDate', date)}
                    placeholderText="Select To Date"
                    className="border p-2 rounded w-full"
                /> */}
                <div className="flex space-x-2 sm:col-span-2 lg:col-span-1">
                    <button onClick={applyFilters} className="bg-black text-white px-2 py-1 sm:px-2 sm:py-1   text-sm rounded-3xl flex-grow">Search</button>
                    <button onClick={resetFilters} className="bg-gray-300 px-2 py-1 sm:px-2 sm:py-1 rounded-3xl text-sm flex-grow">Reset</button>
                </div>
                <CSVLink
                   data={flattenOrders(filteredOrders)}
                    filename={"orders.csv"}
                    className="bg-green-600 text-white px-3 py-1 w-fit rounded flex items-center justify-center"
                >
                    {/* <span className="mr-2">Export</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg> */}
                    <FaRegFileExcel className='size-5'/>
                </CSVLink>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200 text-base">
                        <tr>
                            <th className="px-4 py-2 border whitespace-nowrap">Created Date & Time</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Order Date & Time</th>
                            {/* <th className="px-4 py-2 border whitespace-nowrap">Is Pre-Order</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Is Archived</th> */}
                            <th className="px-4 py-2 border whitespace-nowrap">Order Id</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Order Type</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Order Status</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Amount</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Payment Status</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Customer Name</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Customer Mobile</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Customer Email</th>
                            <th className="px-4 py-2 border whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                                {/* <td className="px-4 py-2 border whitespace-nowrap">
                                    <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPreOrderClass(order.isPreOrder)}`}>
                                        {order.isPreOrder}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border whitespace-nowrap">
                                    <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getArchivedClass(order.isArchived)}`}>
                                        {order.isArchived}
                                    </span>
                                </td> */}
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">
                                    {order._id}
                                </td>
                                <td className="px-4 py-2 border whitespace-nowrap">
                                    <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getOrderTypeClass(order.orderType)}`}>
                                        {order.orderType}
                                    </span>  
                                </td>
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.orderStatus}</td>
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.totalAmount}</td>
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">
                                    <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPaymentStatusClass(order.paymentStatus)}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.contactDetail.name}</td>
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.contactDetail.mobile}</td>
                                <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.contactDetail.email}</td>
                                <td className="px-4 py-2 border whitespace-nowrap flex space-x-2">
                                

                                    <FaEye onClick={()=> handleOrderDetail(order._id)} className="text-blue-500 cursor-pointer" />
                               

                                    <MdDelete     onClick={() => handleDelete(order._id)} className="text-red-500 cursor-pointer" />
                            
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;


