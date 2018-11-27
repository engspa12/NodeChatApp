var moment = require('moment');

//Jan 1st 1970 00:00:00 am ---> 0 in timestamp
//The timestamps in javascript are stored in milliseconds

// var date = new Date();
//var months = ['Jan', 'Feb']
// console.log(date.getMonth());

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
//date.add(100,'years').subtract(14,'months');
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));
