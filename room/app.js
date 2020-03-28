const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
    res.end();
});

server.listen(3000);
const io = socketio.listen(server);

io.on('connection', (socket) => {
    socket.on('join-room', (data) => {
        socket.join(data.name, () => {
            io.to(data.name).emit('new-join', { count: getOnlineCount(io, data) });
        });
    });

    socket.on('leave-room', (data) => {
        socket.leave(data.name, () => {
            io.to(data.name).emit('leavedRoom', { count: getOnlineCount(io, data) });
        });
    });

});

const getOnlineCount = (io, data) => {
    const room = io.sockets.adapter.rooms[data.name];
    if (room) {
        return room.length;
    } else {
        return 0;
    }
}