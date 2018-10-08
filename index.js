// get library express
const express = require('express');
// import routes api, init
const routes = require('./routes/api');
// set up body-parser, init
const bodyParser = require('body-parser');
// set up express app, init
const app = express();
// set up mongodb, init
const mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

// open public sources
app.use(express.static('public'));

// get the request body for json parse
app.use(bodyParser.json());

// use routes
app.use('/api', routes);

// how to process error, error handling middleware
app.use(function(err, req, res, next){
	// give 422 status error (Unprocessable Entity)
	res.status(422).send({error:err.message });
});

// listen to request in setup port or port 4000
app.listen(process.env.port || 4000, function(req, res){
	console.log('diemen world is rocking');
});
