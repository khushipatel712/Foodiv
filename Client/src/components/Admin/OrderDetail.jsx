// import React, { useState } from 'react';

// const OrderDetails = () => {
//     const [orderDetails, setOrderDetails] = useState({
//         id: '#ORDER_118631723631140',
//         status: 'Preparing',
//         type: 'Dine-In',
//         paymentMode: 'offline',
//         paymentStatus: 'Unpaid',
//         name: 'Shivi',
//         date: '14 August 2024, 03:55 PM',
//         amount: 50.00,
//         items: [
//             {
//                 name: 'Fries',
//                 quantity: 1,
//                 price: 50.00,
//                 // image: '/path/to/image.jpg', // Replace with actual image path
//             },
//         ],
//         statuses: [
//             { name: 'New Order', time: '14 August 2024, 03:55 PM' },
//             { name: 'Confirmed', time: '14 August 2024, 03:56 PM' },
//             { name: 'Preparing', time: '14 August 2024, 03:57 PM' },
//             { name: 'Ready for Serve', time: '' },
//             { name: 'Order Completed', time: '' },
//         ],
//     });

//     const handleStatusUpdate = (currentStatus) => {
//         const currentIndex = orderDetails.statuses.findIndex(s => s.name === currentStatus);
//         if (currentIndex < orderDetails.statuses.length - 1) {
//             const newStatuses = [...orderDetails.statuses];
//             newStatuses[currentIndex + 1].time = new Date().toLocaleString('en-GB', { hour12: true });
//             setOrderDetails({
//                 ...orderDetails,
//                 status: newStatuses[currentIndex + 1].name,
//                 statuses: newStatuses,
//             });
//         }
//     };

//     return (
//         <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
//             <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
//                 <h1 className="text-2xl font-semibold">{orderDetails.id}</h1>
//                 <div>
//                     <button className="mr-2 mt-2 lg:mt-0 px-2 py-2 bg-blue-500 text-white text-sm rounded-lg">Mark as Paid</button>
//                     <button 
//                         className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm"
//                         onClick={() => handleStatusUpdate(orderDetails.status)}
//                     >
//                         Mark as {orderDetails.status === 'Preparing' ? 'Ready for Serve' : 'Order Completed'}
//                     </button>
//                 </div>
//             </div>



//             <div className=" flex lg:flex-row flex-col  space-y-3 lg:space-y-0  space-x-4 items-center mb-6">
//                    <div>Order Status: <span className="px-2 py-1 text-sm bg-blue-100 text-blue-500 rounded">{orderDetails.status}</span></div>
//                     <div>Type: <span className="px-2 py-1 text-sm bg-gray-100 text-gray-500 rounded">{orderDetails.type}</span></div>
//                     <div>Payment Mode: <span className="px-2 py-1 text-sm bg-red-100 text-red-500 rounded">{orderDetails.paymentMode}</span></div>
//                    <div> Payment Status: <span className="px-2 py-1 text-sm bg-red-500 text-white rounded">{orderDetails.paymentStatus}</span></div>
//                 </div>


//             {/* <div className="grid grid-cols-2 gap-6 mb-6"> */}


//               <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
//                 <div className=" bg-gray-100 p-4 rounded-lg shadow-sm ">
//                     <div className="flex justify-between  items-center">
//                         <span className="text-lg font-semibold">Items</span>
//                         <span className="text-lg font-semibold">Qty</span>
//                         <span className="text-lg font-semibold">Price</span>
//                         <span className="text-lg font-semibold">Total Price</span>
//                     </div>
//                     {orderDetails.items.map((item, index) => (
//                         <div key={index} className="flex justify-between items-center mt-4">
//                            {/* <div className='flex flex-row '> */}
//                             {/* <img src={item.image} alt={item.name} className="w-10 h-10 rounded" /> */}
//                             <span>{item.name}</span>
//                             {/* </div> */}
//                             <span>{item.quantity}x</span>
//                             <span>₹{item.price.toFixed(2)}</span>
//                             <span>₹{(item.quantity * item.price).toFixed(2)}</span>
//                         </div>
//                     ))}
//                 </div>


//                 <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2">
//                     <div className="font-semibold">{orderDetails.name}</div>
//                     <div>{orderDetails.date}</div>
//                     <div>1234567890</div>
//                     <div className="text-blue-500 text-sm underline cursor-pointer ">View Invoice</div>
//                 </div>

//                 <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
//                     <h3 className="font-semibold">Order Status</h3>
//                     <div className="mt-4 space-y-2">
//                         {orderDetails.statuses.map((status, index) => (
//                             <div key={index} className="flex justify-between items-center">
//                                 <span>{status.name}</span>
//                                 <span>{status.time || '-'}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>



//                 <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
//                     <h3 className="font-semibold">Order Summary</h3>
//                     <div className="flex justify-between mt-4">
//                         <span>Items Total</span>
//                         <span>₹{orderDetails.amount.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between font-semibold mt-2">
//                         <span>Total</span>
//                         <span>₹{orderDetails.amount.toFixed(2)}</span>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//         // </div>
//     );
// };

// export default OrderDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa'; // Import the left arrow icon

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5001/api/order/${orderId}`);
            const order = response.data;
            
            // Define the statuses based on order type
            const orderStatuses = {
                DineIn: ['New Order', 'Confirmed', 'Preparing', 'Ready for Serve', 'Order Completed', 'Cancelled'],
                Takeaway: ['New Order', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Order Completed', 'Cancelled'],
                Delivery: ['New Order', 'Confirmed', 'Preparing', 'Out for Delivery', 'Order Completed', 'Cancelled'],
                TableRoom: ['New Order', 'Confirmed', 'Preparing', 'Order Completed', 'Cancelled'],
            };
            
            const statusList = orderStatuses[order.orderType];
            const currentStatusIndex = statusList.indexOf(order.orderStatus);
            
            const statuses = statusList.map((status, index) => ({
                name: status,
                time: index <= currentStatusIndex ? new Date(order.updatedAt).toLocaleString('en-GB', { hour12: true }) : '-'
            }));

            // Determine the next status
            const nextStatus = currentStatusIndex < statusList.length - 1 ? statusList[currentStatusIndex + 1] : 'Completed';
            
            setOrderDetails({ ...order, statuses, nextStatus });
            setLoading(false);
        } catch (err) {
            setError('Error fetching order details');
            setLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        const orderStatuses = {
            DineIn: ['New Order', 'Confirmed', 'Preparing', 'Ready for Serve', 'Order Completed', 'Cancelled'],
            Takeaway: ['New Order', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Order Completed', 'Cancelled'],
            Delivery: ['New Order', 'Confirmed', 'Preparing', 'Out for Delivery', 'Order Completed', 'Cancelled'],
            TableRoom: ['New Order', 'Confirmed', 'Preparing', 'Order Completed', 'Cancelled'],
        };

        const statusList = orderStatuses[orderDetails.orderType];
        const currentIndex = statusList.indexOf(orderDetails.orderStatus);
        
        if (currentIndex < statusList.length - 1) {
            const newStatus = statusList[currentIndex + 1];
            try {
                await axios.put(`http://localhost:5001/api/order/status/${orderId}`, {
                    orderType: orderDetails.orderType,
                    orderStatus: newStatus
                });

                // Update the state with new status and next status
                setOrderDetails(prevDetails => {
                    const updatedStatuses = prevDetails.statuses.map((status, index) =>
                        index === currentIndex + 1 ? { ...status, time: new Date().toLocaleString('en-GB', { hour12: true }) } : status
                    );
                    
                    // Update nextStatus and statuses
                    const nextStatus = currentIndex + 2 < statusList.length ? statusList[currentIndex + 2] : 'Completed';
                    
                    return {
                        ...prevDetails,
                        orderStatus: newStatus,
                        statuses: updatedStatuses,
                        nextStatus
                    };
                });
            } catch (err) {
                setError('Error updating order status');
            }
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!orderDetails) return <div>No order details found</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
                <div className="flex items-center justify-between w-full">
   <div>
    
                    <button onClick={handleBack} className="mr-2 px-2 py-2 bg-gray-500 text-white text-sm rounded-lg flex items-center">
                        <FaArrowLeft className="mr-1" /> Back
                    </button>
   </div>
   <div>

                    <button 
                        className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm"
                        onClick={handleStatusUpdate}
                    >
                        {orderDetails.nextStatus}
                    </button>
   </div>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col  space-y-3 lg:space-y-0 space-x-4 items-center mb-6">
                <div>Order Status: 
                    <span className="px-2 ml-1 py-1 text-sm bg-blue-100 text-blue-500 rounded">{orderDetails.orderStatus}</span>
                </div>
                <div>Type: 
                    <span className="px-2 py-1 ml-1 text-sm bg-gray-100 text-gray-500 rounded">{orderDetails.orderType}</span>
                </div>
                <div>Payment Mode: 
                    <span className="px-2 py-1 ml-1 text-sm bg-red-100 text-red-500 rounded">{orderDetails.transactionDetail}</span>
                </div>
                <div>Payment Status: 
                    <span className="px-2 py-1 ml-1 text-sm bg-red-500 text-white rounded">{orderDetails.paymentStatus || 'N/A'}</span>
                </div>
            </div>

            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Items</span>
                        <span className="text-lg font-semibold">Qty</span>
                        <span className="text-lg font-semibold">Price</span>
                        <span className="text-lg font-semibold">Total Price</span>
                    </div>
                    {orderDetails.cartItem.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mt-4">
                            <span>{item.name}</span>
                            <span>{item.quantity}x</span>
                            <span>₹{item.price.toFixed(2)}</span>
                            <span>₹{(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2">
                    <div className="font-semibold">{orderDetails.contactDetail.name}</div>
                    <div>{new Date(orderDetails.createdAt).toLocaleString('en-GB', { hour12: true })}</div>
                    <div>{orderDetails.contactDetail.phone}</div>
                    <div className="text-blue-500 text-sm underline cursor-pointer">View Invoice</div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold">Order Status</h3>
                    <div className="mt-4 space-y-2">
                        {orderDetails.statuses.map((status, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span>{status.name}</span>
                                <span>{status.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold">Order Summary</h3>
                    <div className="flex justify-between mt-4">
                        <span>Items Total</span>
                        <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2">
                        <span>Total</span>
                        <span>₹{orderDetails.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;


