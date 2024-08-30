import React from 'react';
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const OrderTable = () => {
    const orders = [
        {
            createdDateTime: "14 August 2024, 03:55 PM",
            orderDateTime: "14 August 2024, 03:55 PM",
            isPreOrder: "No",
            isArchived: "No",
            orderId: "ORDER_118631723631140",
            orderType: "Dine-In",
            orderStatus: "Preparing",
            amount: "₹50.00",
            paymentStatus: "UnPaid",
            customerName: "Shivi",
            customerMobile: "1234567890",
            customerEmail: "-",
        },
        {
            createdDateTime: "08 August 2024, 11:33 AM",
            orderDateTime: "08 August 2024, 11:33 AM",
            isPreOrder: "Yes",
            isArchived: "Yes",
            orderId: "ORDER_118631723097031",
            orderType: "Takeaway",
            orderStatus: "Cancelled",
            amount: "₹50.00",
            paymentStatus: "UnPaid",
            customerName: "Shivani",
            customerMobile: "7284816345",
            customerEmail: "-",
        },
    ];

    const getPreOrderClass = (isPreOrder) => {
        return isPreOrder === "Yes" ? "bg-green-500" : "bg-red-500";
    };

    const getArchivedClass = (isArchived) => {
        return isArchived === "Yes" ? "bg-green-500" : "bg-red-500";
    };

    const getOrderTypeClass = (orderType) => {
        switch (orderType) {
            case "Dine-In":
                return "bg-yellow-500";
            case "Takeaway":
                return "bg-blue-500";
            default:
                return "bg-gray-500";
        }
    };

    const getPaymentStatusClass = (paymentStatus) => {
        return paymentStatus === "Paid" ? "bg-green-500" : "bg-red-500";
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200 text-base">
                        <th className="px-4 py-2 border whitespace-nowrap">Created Date & Time</th>
                        <th className="px-4 py-2 border whitespace-nowrap">Order Date & Time</th>
                        <th className="px-4 py-2 border whitespace-nowrap">Is Pre-Order</th>
                        <th className="px-4 py-2 border whitespace-nowrap">Is Archived</th>
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
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.createdDateTime}</td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.orderDateTime}</td>
                            <td className="px-4 py-2 border whitespace-nowrap">
                                <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPreOrderClass(order.isPreOrder)}`}>
                                    {order.isPreOrder}
                                </span>
                            </td>
                            <td className="px-4 py-2 border whitespace-nowrap">
                                <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getArchivedClass(order.isArchived)}`}>
                                    {order.isArchived}
                                </span>
                            </td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">
                                {order.orderId}
                            </td>
                            <td className="px-4 py-2 border whitespace-nowrap">
                            <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getOrderTypeClass(order.orderType)}`}>
                                {order.orderType}
                              </span>  
                            </td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.orderStatus}</td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.amount}</td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">
                                <span className={`inline-block px-1 text-xs py-[0.3px] rounded text-white ${getPaymentStatusClass(order.paymentStatus)}`}>
                                    {order.paymentStatus}
                                </span>
                            </td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.customerName}</td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.customerMobile}</td>
                            <td className="px-4 py-2 border whitespace-nowrap text-sm">{order.customerEmail}</td>
                            <td className="px-4 py-2 border whitespace-nowrap flex space-x-2">
                                <FaEye className="text-blue-500 cursor-pointer" />
                                <MdDelete className="text-red-500 cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;
