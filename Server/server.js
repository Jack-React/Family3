//server.js

const express = require('express');
const apiRoutes = require('./api-routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());
app.use ('/api', apiRoutes)


mongoose.connect("mongodb://localhost/comp30022", { useNewUrlParser: true});


app.get('/', function(req, res) {
	res.status(200).send(
        "Hello World!"
    );
});


// Listen at port
app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});
