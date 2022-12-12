const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./util/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Chat';

io.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        socket.emit('message', formatMessage(botName, "Welcome to chat!"));
        socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    });

    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('USER', msg));
    });

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));