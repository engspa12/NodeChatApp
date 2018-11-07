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

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>');
  //target="_blank" to open a new tab when the user clicks on the link
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

var locationButton = jQuery('#send-location');
//Click Listener
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function (position) {
    //console.log(position);
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});
