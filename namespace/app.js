const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end();
});

server.listen(3000);
const io = socketio.listen(server);

const nsp = io.of('/namespace');

nsp.on('connection', (socket) => {
    console.log('User connected'); 

    socket.on('broadcast', () => {
        nsp.emit('namespace-broadcast-emit');
    });

    socket.on('disconnect', () => {
        console.log('User disconnect');        
    });
});
