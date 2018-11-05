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
//We normally use only io.on, and then we work with the socket
io.on('connection',(socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey there, hi there',
  //   createdAt: 123
  // });

  socket.emit('newMessage', {
    from: 'Paul Heyman',
    text: 'Hello again from WWE',
    createdAt: new Date().getTime()
  });

  // socket.on('createEmail',(newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  //Event Listener
  socket.on('createMessage',(newMessage) => {
    console.log('createMessage', newMessage);
  });

  //Event Listener
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
