// middleware/orderMiddleware.js
const orderStatuses = require('./orderStatus');

exports.validateOrderStatus = (req, res, next) => {
    const { orderType, orderStatus } = req.body;

    if (!orderStatuses[orderType]) {
        return res.status(400).json({ error: `Invalid order type: ${orderType}` });
    }

    if (!orderStatuses[orderType].includes(orderStatus)) {
        return res.status(400).json({ error: `Invalid status "${orderStatus}" for order type "${orderType}"` });
    }

    next();
};

exports.validateOrderData = (req, res, next) => {
    // Implement additional validations if needed
    next();
};
