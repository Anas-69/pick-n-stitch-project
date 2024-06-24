const router = require('express').Router();

const Tailor = require('../models/tailorModel');

router.get('/', async (req, res) => {
    res.send('Welcome to PickNstitch API');
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password, role, location, cnic, phone } = req.body;
        const tailor = new Tailor({
            username,
            email,
            password,
            role,
            location,
            cnic,
            phone
        });
        await tailor.save();
        res.send(tailor);
    } catch (error) {
        res.status(500).send(error);
    }
}
);

router.get('/login', async (req, res) => {
    try {
        const { email, password, role } = req.query;
        console.log(req.query);
        const tailor = await Tailor.findOne({ email, password, role });
        if (tailor) {
            res.send(tailor);
        } else {
            res.status(404).send('Tailor not found');
        }
    } catch (error) {
        res.send(error);
    }
});

router.get('/tailors', async (req, res) => {
    const tailors = await Tailor.find();
    res.send(tailors);
});

router.get('/tailors/:email', async (req, res) => {
    const email = req.params.email;
    const tailor = await Tailor.findOne({ email });
    if (tailor) {
        res.send(tailor);
    } else {
        res.status(404).send('Tailor not found');
    }
}
);


module.exports = router;


