const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end();
});

server.listen(3000);

const io = socketio.listen(server);

io.sockets.on('connection', (socket) => {
    console.log('User connected');

    socket.on('broadcastSayHello', () => {
        socket.broadcast.emit('broadcast-trigger');
    });

    socket.on('disconnect', () => {
        console.log('User disconnect');        
    });
});