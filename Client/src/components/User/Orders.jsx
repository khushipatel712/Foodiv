import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const statusColors = {
  'New Order': 'bg-blue-100 text-blue-800',
  'Preparing': 'bg-yellow-100 text-yellow-800',
  'Ready for Pickup': 'bg-green-100 text-green-800',
  'Delivered': 'bg-gray-100 text-gray-800',
  'Cancelled': 'bg-red-100 text-red-800'
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const token = Cookies.get('userToken');

  useEffect(() => {
    const fetchOrders = async () => {
      if (token) {
        try {
          const response = await fetch(`http://localhost:5001/api/order/${id}/orders`, {
            headers: {
              'Authorization': token
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await response.json();
          setOrders(data);
        } catch (err) {
          setError(err.message);
        }
      } else if (location.state && location.state.orders) {
        setOrders(location.state.orders);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, [id, token, location.state]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    </div>
  );

  return (
    <div className="container lg:px-44 mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600">My Orders</h2>
      {orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-orange-200">
              <div className="bg-orange-50 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-orange-800">Order #{order._id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.orderStatus]}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-gray-600 mt-2">Ordered on: {new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <div className="px-6 py-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-lg text-gray-800">Order Items</h4>
                  <p className="font-bold text-xl text-orange-600">Total: ₹{order.totalAmount.toFixed(2)}</p>
                </div>
                <ul className="divide-y divide-gray-200">
                  {order.cartItem.map((item, index) => (
                    <li key={index} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-orange-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
          <p className="font-bold">No orders found</p>
          <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
        </div>
      )}
    </div>
  );
};

export default Orders;