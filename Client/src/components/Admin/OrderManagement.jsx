// import React, { useState, useEffect } from 'react';
// import OrderTypeSelector from './OrderTypeSelector';
// import OrderStatusList from './OrderStatusList';
// import { fetchOrderTypes, fetchOrderStatuses, fetchOrderDetails } from '../SuperAdmin/api';

// const OrderManagement = () => {
//     const [orderTypes, setOrderTypes] = useState([]);
//     const [selectedOrderType, setSelectedOrderType] = useState(null);
//     const [statuses, setStatuses] = useState([]);
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [loadingOrder, setLoadingOrder] = useState(false);

//     // Fetch order types from the API when the component mounts
//     useEffect(() => {
//         fetchOrderTypes().then(data => setOrderTypes(data));
//     }, []);

//     // Fetch order statuses whenever the selected order type changes
//     useEffect(() => {
//         if (selectedOrderType) {
//             fetchOrderStatuses(selectedOrderType).then(data => setStatuses(data));
//         }
//     }, [selectedOrderType]);

//     // Fetch order details when a status is clicked
//     const handleStatusClick = (status) => {
//         setLoadingOrder(true);
//         fetchOrderDetails(status).then(data => {
//             setOrderDetails(data);
//             setLoadingOrder(false);
//         });
//     };

//     return (
//         <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">

//            <div className='flex  flex-col justify-between items-center'>
//             <OrderTypeSelector
//                 orderTypes={orderTypes}
//                 selectedOrderType={selectedOrderType}
//                 onSelect={setSelectedOrderType}
//             />

//             {selectedOrderType && (
//                 <OrderStatusList
//                     statuses={statuses}
//                     onStatusClick={handleStatusClick}

//                 />
//             )}

//             </div>

//             {loadingOrder && <p>Loading order details...</p>}

//             {orderDetails ? (
//                 <div className="w-96 border p-4 rounded-lg shadow-lg mt-6 bg-gray-50">

//                     <div className='flex  justify-between'>
//                         <div className="mb-4">
//                             <p className="text-sm text-gray-500">Order ID: <span className="font-semibold text-gray-700">{orderDetails.id}</span></p>
//                             <p className="text-sm text-gray-500">Date: <span className="font-semibold text-gray-700">{orderDetails.date}</span></p>
//                             <p className="text-sm text-gray-500">Name: <span className="font-semibold text-gray-700">{orderDetails.name}</span></p>
//                         </div>

//                         <div className="mb-4">
//                             <p className="text-sm font-bold text-gray-800">Status: <span className={`inline-block px-2 py-1 rounded-md ${orderDetails.status === 'Cancelled' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>{orderDetails.status}</span></p>
//                         </div>
//                     </div>
//                     <div className="mb-6">
//                         <p className="text-lg font-bold text-gray-800">Amount: <span className="text-gray-700">{orderDetails.amount}</span></p>
//                     </div>

//                     <div>
//                         <p className="text-lg font-semibold text-gray-800 mb-2">Items Ordered:</p>
//                         <ul className="space-y-2">
//                             {orderDetails.items.map((item, index) => (
//                                 <li key={index} className="flex justify-between items-center border-b pb-2">
//                                     <span className="text-gray-700">{item.quantity} x {item.name}</span>
//                                     <span className="text-gray-800 font-semibold">₹{item.price}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             ) : (
//                 selectedOrderType && !loadingOrder && <p>No order available.</p>
//             )}
//         </div>
//     );
// };

// export default OrderManagement;


import React, { useState, useEffect } from 'react';
import { useGetProfileQuery } from '../../services/adminApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OrderTypeSelector from './OrderTypeSelector';
import OrderStatusList from './OrderStatusList';

const OrderManagement = () => {
    const navigate = useNavigate();
    const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useGetProfileQuery();
    const [orderTypes, setOrderTypes] = useState([]);
    const [selectedOrderType, setSelectedOrderType] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOrderTypes([
            { id: 'DineIn', name: 'Dine In' },
            { id: 'Takeaway', name: 'Takeaway' },
            { id: 'Delivery', name: 'Delivery' },
            { id: 'TableRoom', name: 'Table/Room' }
        ]);
    }, []);

    useEffect(() => {
        if (selectedOrderType && profile?.id) {
            const orderStatuses = {
                DineIn: ['New Order', 'Confirmed', 'Preparing', 'Ready for Serve', 'Order Completed', 'Cancelled'],
                Takeaway: ['New Order', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Order Completed', 'Cancelled'],
                Delivery: ['New Order', 'Confirmed', 'Preparing', 'Out for Delivery', 'Order Completed', 'Cancelled'],
                TableRoom: ['New Order', 'Confirmed', 'Preparing', 'Order Completed', 'Cancelled'],
            };
            setStatuses(orderStatuses[selectedOrderType]);
            setSelectedOrders([]); // Reset selected orders when changing order type
            fetchOrders(''); // Fetch orders with default status "New Order"
        }
    }, [selectedOrderType, profile]);

    const fetchOrders = async () => {
        if (!profile?.id) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5001/api/orders/admin/${profile.id}`);
            const filteredOrders = response.data.filter(order => order.orderType === selectedOrderType);
            setOrders(filteredOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        setLoading(false);
    };

    const handleStatusClick = (status) => {
        const filteredOrders = orders.filter(order => order.orderStatus === status);
        setSelectedOrders(filteredOrders);
    };

    const handleOrderClick = (order) => {
        navigate(`/admin/order-details/${order}`);
    };

    if (isProfileLoading) {
        return <div>Loading profile...</div>;
    }

    if (isProfileError) {
        return <div>Error loading profile</div>;
    }

    if (!profile?.id) {
        return <div>Error: Admin ID not available</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className='flex flex-col justify-between items-center'>
                <OrderTypeSelector
                    orderTypes={orderTypes}
                    selectedOrderType={selectedOrderType}
                    onSelect={setSelectedOrderType}
                />

                {selectedOrderType && (
                    <OrderStatusList
                        statuses={statuses}
                        onStatusClick={handleStatusClick}
                    />
                )}
            </div>

            {loading && <p>Loading orders...</p>}

            {/* {selectedOrders.length === 0 ? (
                <p>No orders found.</p>
            
            ) : ( */}
                <div className="mt-6 space-y-6 w-full lg:space-y-0 lg:flex lg:flex-wrap lg:gap-4">
                    {selectedOrders.map(selectedOrder => (
                        <div key={selectedOrder._id} 
                         className="w-fit lg:w-1/2 xl:w-1/2 border p-4 rounded-lg shadow-lg bg-gray-50 cursor-pointer"
                        onClick={() => handleOrderClick(selectedOrder._id)}>
                            <div className='flex justify-between'>
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Order ID: <span className="font-semibold text-gray-700">{selectedOrder._id}</span></p>
                                    <p className="text-sm text-gray-500">Date: <span className="font-semibold text-gray-700">{new Date(selectedOrder.createdAt).toLocaleString()}</span></p>
                                    <p className="text-sm text-gray-500">Name: <span className="font-semibold text-gray-700">{selectedOrder.contactDetail.name}</span></p>
                                </div>
                                <div className="mb-4">
                                <div className='flex '>
                                <div>
                                <span   className={`ml-2 text-xs px-2 py-1 flex rounded-md ${selectedOrder.paymentStatus === 'unpaid'
                                                    ? 'bg-red-500 text-white '
                                                    : 'bg-green-500 text-white'
                                                }`}
                                    >
                                    {selectedOrder.paymentStatus}
                                </span>
                                    
                                </div>
                                    <div className="text-sm inline-flex  font-bold text-gray-800">
                                        <span
                                            className={`ml-2 text-xs px-2 py-1 whitespace-nowrap rounded-md ${selectedOrder.orderStatus === 'Cancelled'
                                                    ? 'bg-red-100 text-red-500 '
                                                    : 'bg-green-100 text-green-500'
                                                }`}
                                        >
                                            {selectedOrder.orderStatus}
                                        </span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="mb-6">
                                <p className="text-lg font-bold text-gray-800">Amount: <span className="text-gray-700">₹{selectedOrder.totalAmount}</span></p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-2">Items Ordered:</p>
                                <ul className="space-y-2">
                                    {selectedOrder.cartItem.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center border-b pb-2">
                                            <span className="text-gray-700">{item.quantity} x {item.name}</span>
                                            <span className="text-gray-800 font-semibold">₹{item.price * item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            {/* ) */}
            {/* } */}
            </div>
    );
};

            export default OrderManagement;