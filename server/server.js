const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);
//We use app to Create Routes, Add Middleware, Start up the server
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//Register an event listener
io.on('connection',(socket) => {
  console.log('New user connected');

  socket.on('disconnect',() => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});

// app.listen(port, () => {
//    console.log(`Server is up on port ${port}`);
// });

module.exports = {app};
