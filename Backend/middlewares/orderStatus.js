// orderStatus.js
const orderStatuses = {
    DineIn: ['New Order', 'Confirmed', 'Preparing', 'Ready for Serve', 'Order Completed', 'Cancelled'],
    Takeaway: ['New Order', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Order Completed', 'Cancelled'],
    Delivery: ['New Order', 'Confirmed', 'Preparing', 'Out for Delivery', 'Order Completed', 'Cancelled'],
    TableRoom: ['New Order', 'Confirmed', 'Preparing', 'Order Completed', 'Cancelled'],
};

module.exports = orderStatuses;
