const router = require('express').Router();
const Order = require('../models/order');

// Create a new order
router.post('/create', async (req, res) => {
    try {
        console.log('Creating order:', req.body);
        const { userName, productName, productDescription, productPrice, riderName, orderTime, orderDate, startDestination, endDestination } = req.body;
        const order = new Order({
            userName,
            productName,
            productDescription,
            productPrice,
            riderName,
            orderTime,
            orderDate,
            startDestination,
            endDestination
        });

        const newOrder = await order.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}  
);

// find order by id
router.get('/:id', async (req, res) => {
    try {
        console.log('Getting order:', req.params.id);
        const order = await Order.findById(req.params.id);
        res.json(order);
    }
    catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

// change order status from pending to ordered
router.put('/change-order-status/:id', async (req, res) => {
    try {
        console.log('Updating order:', req.params.id);
        const order = await Order.findById(req.params.id);
        order.orderStatus = 'Ordered';
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);


// Get all orders
router.get('/', async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.json(allOrders);
    }
    catch (error) {
        console.error('Error getting all orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get orders of a specific irder
router.get('/orders/:rider', async (req, res) => {
    try {
        const orders = await Order.find({ riderName: req.params.rider });
        // only return the userNames of the orders
        const orderNames = orders.map(order => order.userName);
        // check if the userName are unique
        const uniqueOrderNames = [...new Set(orderNames)];
        res.json(uniqueOrderNames);
    }
    catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

// Get order by userName and productName with riderName
router.get('/:userName/:productName', async (req, res) => {
    try {
        const order = await Order.findOne({ userName: req.params.userName, productName: req.params.productName });
        res.json(order);
    }
    catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);


module.exports = router;