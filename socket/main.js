const socketio = require('socket.io');
const Reports = require('../controllers/reports');
const fs =  require('fs')

module.exports = function socketMain(server) {
    // create server socket
    const io = socketio( server, { cors: { origin: '*' }});

    // crete socket listining
    io.on('connection', (socket) => {
        console.log("usuario connectado", socket.id);

        socket.on('messages', ( data, rooms, type = 'success' ) => {
            console.log( 'message will be sended to ' + rooms );
            io.to( rooms[0] ).emit("messages", { data, type } );
            io.to( rooms[1] ).emit("messages", { data, type } );
        })

        socket.on('join', (room) => {
            console.log(`Socket ${socket.id} joining ${room}`);
            socket.join(room);
        });

        socket.on('disconnect', () => {
            console.log("usuario salio", socket.id);
        })
    });
};