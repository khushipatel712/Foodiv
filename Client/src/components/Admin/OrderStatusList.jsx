import React from 'react';

const OrderStatusList = ({ statuses, selectedStatus, onStatusClick }) => {
    return (
        <div className=" mt-4 flex flex-wrap items-center justify-between md:px-20 px-5 sm:px-10 gap-4 pb-4 border-b-2 w-full">
            {statuses.map((status, index) => (
                <button
                    key={index}
                    onClick={() => onStatusClick(status)}
                    className={` font-medium text-base
                        ${selectedStatus === status ? 'text-orange-500' : 'hover:text-orange-500'}`}
                >
                    {status}
                </button>
            ))}
        </div>
    );
};

export default OrderStatusList;