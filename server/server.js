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

//Register an Event Listener
//We normally use only io.on, and then we work with the socket
io.on('connection',(socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', {
  //   from: 'Paul Heyman',
  //   text: 'Hello again from WWE',
  //   createdAt: new Date().getTime()
  // });

  //Event Listener
  socket.on('createMessage',(message) => {
    console.log('createMessage', message);
    //socket.emit() emits an event to a single connection
    //io.emit() emits an event to every single connection
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  //Event Listener
  socket.on('disconnect',() => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});

module.exports = {app};
