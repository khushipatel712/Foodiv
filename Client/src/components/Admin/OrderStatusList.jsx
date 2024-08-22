// src/components/OrderStatusList.js
import React from 'react';

const OrderStatusList = ({ statuses, onStatusClick }) => {
    return (
        <div className="flex flex-wrap gap-4">
            {statuses.map((status, index) => (
                <button
                    key={index}
                    onClick={() => onStatusClick(status)}
                    className="border px-3 py-3 rounded-3xl shadow cursor-pointer hover:bg-black hover:text-white"
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

export default OrderStatusList;
