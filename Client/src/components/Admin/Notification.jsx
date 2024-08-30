// import React from 'react';

// const Notification = () => {
//   return (
//     <div className="max-w-5xl mx-auto p-4">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
//         <div className="flex items-center mb-2 lg:mb-0">
//           <label htmlFor="entries" className="mr-2 text-gray-700">Show</label>
//           <select
//             id="entries"
//             className="border border-gray-300 rounded p-1 text-gray-700"
//           >
//             <option value="10">10</option>
//             <option value="25">25</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//           </select>
//           <span className="ml-2 text-gray-700">entries</span>
//         </div>
//         <div className="flex items-center">
//           <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
//           <input
//             type="text"
//             id="search"
//             className="border border-gray-300 rounded p-1 text-gray-700"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="text-left py-2 px-4 border-b border-gray-300">Message</th>
//               <th className="text-left py-2 px-4 border-b border-gray-300">Created at</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="hover:bg-gray-100">
//               <td className="py-2 px-4 border-b border-gray-300">New order received from Shivi</td>
//               <td className="py-2 px-4 border-b border-gray-300">14 August 2024, 03:55 PM</td>
//             </tr>
//             <tr className="hover:bg-gray-100">
//               <td className="py-2 px-4 border-b border-gray-300">New order received from shivani</td>
//               <td className="py-2 px-4 border-b border-gray-300">08 August 2024, 11:33 AM</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4">
//         <span className="text-gray-700">Showing 1 to 2 of 2 entries</span>
//         <div className="flex items-center mt-2 lg:mt-0">
//           <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l">Previous</button>
//           <button className="px-4 py-2 bg-blue-500 text-white">1</button>
//           <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notification;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetProfileQuery } from '../../services/adminApi';

const Notification = () => {
  const { data: profile, isLoading: isProfileLoading, isError: isProfileError } = useGetProfileQuery();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [entries, setEntries] = useState(10); // Number of entries per page
    const [searchTerm, setSearchTerm] = useState('');
    // const [profile, setProfile] = useState({ id: '66bf1fe9b5fc608af0c19b68' }); // Example profile ID

    useEffect(() => {
        const fetchOrders = async () => {
            if (!profile?.id) return;

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5001/api/orders/admin/${profile.id}`);
                // console.log('API Response:', response.data); // Log the API response
                setOrders(response.data); // Assuming response.data is an array of orders
            } catch (error) {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [profile?.id]);

    const handleEntriesChange = (e) => {
        setEntries(parseInt(e.target.value, 10));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter and paginate the orders
    const filteredOrders = orders.filter(order =>
        order.contactDetail?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayedOrders = filteredOrders.slice(0, entries);

    return (
        <div className="max-w-5xl mx-auto p-4">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex items-center mb-2 lg:mb-0">
                    <label htmlFor="entries" className="mr-2 text-gray-700">Show</label>
                    <select
                        id="entries"
                        value={entries}
                        onChange={handleEntriesChange}
                        className="border border-gray-300 rounded p-1 text-gray-700"
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span className="ml-2 text-gray-700">entries</span>
                </div>
                <div className="flex items-center">
                    <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded p-1 text-gray-700"
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left py-2 px-4 border-b border-gray-300">Message</th>
                            <th className="text-left py-2 px-4 border-b border-gray-300">Created at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedOrders.length > 0 ? (
                            displayedOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        {`New order received from ${order.contactDetail?.name || 'Unknown'}`}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'No Date'}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="py-2 px-4 text-center border-b border-gray-300">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between mt-4">
                <span className="text-gray-700">Showing 1 to {displayedOrders.length} of {filteredOrders.length} entries</span>
                <div className="flex items-center mt-2 lg:mt-0">
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l">Previous</button>
                    <button className="px-4 py-2 bg-blue-500 text-white">1</button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r">Next</button>
                </div>
            </div>
        </div>
    );
};

export default Notification;
