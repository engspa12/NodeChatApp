var socket = io();

//Event Listener
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage',{
  //   from: 'Dario Garlick Stone',
  //   text: 'Hey, it\'s Daniel, not Dario'
  // });
});

//Event Listener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Custom Event Listener
//The data that is emitted with your event is provided as the first
//argument to your callback function, in this case ---> message
socket.on('newMessage', function (message) {
  console.log('New message', message);
});
