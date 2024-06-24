const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const tailorRoutes = require("./routes/tailorRoutes");
const riderRoutes = require("./routes/riderRoutes");
const trendyDesignRoutes = require("./routes/trendyDesignRoutes");
const Order = require('./routes/orderRoutes');
const Chat  = require('./routes/chatRoutes');

const http = require('http');
const socketIO = require('socket.io');

const mongoose = require('mongoose')
// database connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/PickNstitch'
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => {
        console.log(err)
    })
// middlewares
app.use(express.json());

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
// routes
app.use("/api/user", userRoutes);
app.use("/api/tailor", tailorRoutes);
app.use("/api/rider", riderRoutes);
app.use("/api/trendy-designs", trendyDesignRoutes);
app.use("/api/order", Order);
app.use('/api/chat', Chat)

// Create a new instance of SocketIO and attach it to the HTTP server
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {

        origin:
            ['http://localhost:3000'],
        methods: '*',
    }
});

// Listen for incoming connections
io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for chat messages
    socket.on('new message', (msg) => {
        console.log('Message from client: ', msg);
        // Broadcast the message to all connected clients
        io.emit('chat', msg);
    });

    // Listen for disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = 3001;
app.listen(port, console.log(`Listening on port ${port}...`));


