import React, { useState, useEffect } from 'react';
import OrderTypeSelector from './OrderTypeSelector';
import OrderStatusList from './OrderStatusList';
import { fetchOrderTypes, fetchOrderStatuses, fetchOrderDetails } from '../SuperAdmin/api';

const OrderManagement = () => {
    const [orderTypes, setOrderTypes] = useState([]);
    const [selectedOrderType, setSelectedOrderType] = useState(null);
    const [statuses, setStatuses] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loadingOrder, setLoadingOrder] = useState(false);

    // Fetch order types from the API when the component mounts
    useEffect(() => {
        fetchOrderTypes().then(data => setOrderTypes(data));
    }, []);

    // Fetch order statuses whenever the selected order type changes
    useEffect(() => {
        if (selectedOrderType) {
            fetchOrderStatuses(selectedOrderType).then(data => setStatuses(data));
        }
    }, [selectedOrderType]);

    // Fetch order details when a status is clicked
    const handleStatusClick = (status) => {
        setLoadingOrder(true);
        fetchOrderDetails(status).then(data => {
            setOrderDetails(data);
            setLoadingOrder(false);
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
       
           <div className='flex  flex-col justify-between items-center'>
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

            {loadingOrder && <p>Loading order details...</p>}

            {orderDetails ? (
                <div className="w-96 border p-4 rounded-lg shadow-lg mt-6 bg-gray-50">

                    <div className='flex  justify-between'>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Order ID: <span className="font-semibold text-gray-700">{orderDetails.id}</span></p>
                            <p className="text-sm text-gray-500">Date: <span className="font-semibold text-gray-700">{orderDetails.date}</span></p>
                            <p className="text-sm text-gray-500">Name: <span className="font-semibold text-gray-700">{orderDetails.name}</span></p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-bold text-gray-800">Status: <span className={`inline-block px-2 py-1 rounded-md ${orderDetails.status === 'Cancelled' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'}`}>{orderDetails.status}</span></p>
                        </div>
                    </div>
                    <div className="mb-6">
                        <p className="text-lg font-bold text-gray-800">Amount: <span className="text-gray-700">{orderDetails.amount}</span></p>
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-800 mb-2">Items Ordered:</p>
                        <ul className="space-y-2">
                            {orderDetails.items.map((item, index) => (
                                <li key={index} className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-700">{item.quantity} x {item.name}</span>
                                    <span className="text-gray-800 font-semibold">₹{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                selectedOrderType && !loadingOrder && <p>No order available.</p>
            )}
        </div>
    );
};

export default OrderManagement;
