var socket = io();

//Default Event Listener
socket.on('connect', function () {
  console.log('Connected to server');

  // socket.emit('createMessage',{
  //   from: 'Dario Garlick Stone',
  //   text: 'Hey, it\'s Daniel, not Dario'
  // });
});

//Default Event Listener
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

//Custom Event Listener
//The data that is emitted with your event is provided as the first
//argument to your callback function, in this case ---> message
socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from: 'Frank',
//   text: 'Hi there'
// }, function (data) {
//   console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
