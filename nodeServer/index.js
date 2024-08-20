const { Socket } = require('dgram');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://127.0.0.1:5500", // Change this to match your client URL
        methods: ["GET", "POST"]
    }
});

// Serve static files from the "public" directory
app.use(express.static('public'));

//list of users
const users = {};

// Handle a new connection
io.on('connection', (socket) => {
    //console.log('A user connected');

    socket.on('new-user-joined', name => {
        //console.log(name, 'connected')
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    })

    // Handle a message from the client
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });


    // Handle disconnection

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });



    // socket.on('disconnect', () => {
    //     console.log('User disconnected');
    // });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
