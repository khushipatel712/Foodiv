// src/api.js
export const fetchOrderTypes = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Takeaway' },
                { id: 2, name: 'Delivery' },
                { id: 3, name: 'Table/Room' },
                { id: 4, name: 'Dine In' },
            ]);
        }, 1000);
    });
};

export const fetchOrderStatuses = (orderTypeId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const statuses = {
                1: ['New Order', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Order Completed', 'Cancelled'],
                2: ['New Order', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
                3: ['New Order', 'Confirmed', 'Preparing', 'Ready for Serve', 'Order Completed', 'Cancelled'],
                4: ['New Order', 'Confirmed', 'Preparing', 'Ready for Serve', 'Order Completed', 'Cancelled'],
            };
            resolve(statuses[orderTypeId]);
        }, 1000);
    });
};

export const fetchOrderDetails = (status) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const orderDetails = {
                'New Order': {
                    id: 'ORDER_118631723631140',
                    name: 'Shivi',
                    date: '14 August 2024, 03:55 PM',
                    amount: '₹ 50.00',
                    items: [{ name: 'Fries', price: '₹ 50.00', quantity: 1 }],
                    status: 'UnPaid',
                },
                'Confirmed': null,  // Example of no order available
                // Add more dummy data for other statuses if needed
            };
            resolve(orderDetails[status]);
        }, 1000);
    });
};
