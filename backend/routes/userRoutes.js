const router = require('express').Router();

const User = require('../models/userModel');

router.get('/', async (req, res) => {
    res.send('Welcome to PickNstitch API');
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password, role, location, cnic } = req.body;
        const user = new User({
            username,
            email,
            password,
            role,
            location,
            cnic
        });
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}
);

router.get('/login', async (req, res) => {
    try {
        const { email, password, role } = req.query;
        console.log(req.query);
        const user = await User.findOne({ email, password, role });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.send(error);
    }
});

// get a user by email
router.get('/users/:email', async (req, res) => {
    try {
        console.log(req.params.email);
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send('User not found');
        }

    } catch (error) {
        res.send(error.response.data);
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});


module.exports = router;


