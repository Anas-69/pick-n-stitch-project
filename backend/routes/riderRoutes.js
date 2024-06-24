const router = require('express').Router();

const Rider = require('../models/riderModel');

router.get('/', async (req, res) => {
    res.send('Welcome to PickNstitch API');
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password, role, location, cnic, phone,license } = req.body;
        const rider = new Rider({
            username,
            email,
            password,
            role,
            location,
            cnic,
            phone,
            license
        });
        await rider.save();
        res.send(rider);
    } catch (error) {
        res.status(500).send(error);
    }
}
);

router.get('/login', async (req, res) => {
    try {
        const { email, password, role } = req.query;
        console.log(req.query);
        const rider = await Rider.findOne({ email, password, role });
        if (rider) {
            res.send(rider);
        } else {
            res.status(404).send('Rider not found');
        }
    } catch (error) {
        res.send(error);
    }
});

router.get('/riders', async (req, res) => {
    const riders = await Rider.find();
    res.send(riders);
});

// get a single rider by using email
router.get('/riders/:email', async (req, res) => {
    try {
        const rider = await Rider.findOne({ email: req.params.email });
        if (rider) {
            res.send(rider);
        } else {
            res.status(404).send('Rider not found');
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;


