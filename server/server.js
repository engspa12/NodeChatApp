const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

// console.log(__dirname + '/../public');
// console.log(publicPath);
//We use app to Create Routes, Add Middleware, Start up the server
var app = express();

app.use(express.static(publicPath));

app.get('/',(req, res) => {

});

app.listen(port, () => {
   console.log(`Server is up on port ${port}`);
});

module.exports = {app};
