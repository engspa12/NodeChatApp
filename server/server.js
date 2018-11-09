const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);

//We use app to Create Routes, Add Middleware, Start up the server
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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



  socket.on('join',(params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.leave('The Office Fans');

    //io.emit() --> io.to('The Office Fans').emit()
    //socket.broadcast.emit()  --> socket.broadcast.to('The Office Fans').emit()
    //socket.emit( )

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));

    callback();
  });

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
    var user = users.removeUser(socket.id);

    if (user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});

module.exports = {app};
