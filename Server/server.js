//server.js

// isDebug links to UAT Database instead of production
var isDebug = true;
var database = "uat"
if (!isDebug){
    var database = "production"
}

// Import Modules
const express = require('express');
const apiRoutes = require('./api-routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());
app.use ('/api', apiRoutes)


// Connecting to MongoDB
mongoose.connect("mongodb://jp:admin12345@52.14.226.1/" + database, { 
    useCreateIndex: true,
    useNewUrlParser: true
});


app.get('/', (_req, res) => {
	res.status(200).send({
        success: "Welcome to the root directory"
    });
});


// Listen at port
var PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
});
