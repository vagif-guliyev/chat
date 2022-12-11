const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socketio');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New Connection established');
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));