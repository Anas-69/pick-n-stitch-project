const router = require('express').Router();

const Chat = require('../models/chat');

// Create a new chat
router.post('/create', async (req, res) => {
    try {
        console.log('Creating chat:', req.body);
        const { sender, receiver, message } = req.body;
        const chat = new Chat({
            sender,
            receiver,
            message
        });

        const newChat = await chat.save();
        res.status(201).json(newChat);
    }
    catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);

// find chat by sender and receiver
router.get('/messages/:sender/:receiver', async (req, res) => {
    try {
        console.log('Getting chat:', req.params.sender, req.params.receiver);
        const chat = await Chat.find({
            $or: [
                { sender: req.params.sender, receiver: req.params.receiver },
                { sender: req.params.receiver, receiver: req.params.sender }
            ]
        });
        res.json(chat);
    } catch (error) {
        console.error('Error getting chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// find chat by receiver
router.get('/messages/:receiver', async (req, res) => {
    try {
        console.log('Getting chat:', req.params.receiver);
        const chat = await Chat.find({ receiver: req.params.receiver });
        res.json(chat);
    }
    catch (error) {
        console.error('Error getting chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
);


module.exports = router;
