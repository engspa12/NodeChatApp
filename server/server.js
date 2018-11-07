const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);

//We use app to Create Routes, Add Middleware, Start up the server
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//Register a Default Event Listener
//We normally use only io.on, and then we work with the socket
io.on('connection',(socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', {
  //   from: 'Paul Heyman',
  //   text: 'Hello again from WWE',
  //   createdAt: new Date().getTime()
  // });

  socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  //Custom Event Listener
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    //socket.emit() emits an event to a single connection
    //io.emit() emits an event to every single connection
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    //io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude }`));
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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
