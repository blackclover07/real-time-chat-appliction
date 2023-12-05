const express = require('express');
const http = require('http');
// const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors({origin:'http://localhost:5500'})); // Enable CORS for all routes
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
// const io = socket(server);


// ... rest of your socket.io server setup ...

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});



// const io = require('socket.io')(8000)

const users = {}

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        // console.log(socket.id);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})