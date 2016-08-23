var express = require('express');
var request = require('request');
var env = require('node-env-file');

var app = express();
env(__dirname + '/.env');

var url = process.env.URL_API;
var user = process.env.CLIENT_ID;
var pass = process.env.CLIENT_SECRET;

app.get('/offers-method-one', function (req, res) {

	var urlOffers1 = url.replace('://', '://' + user + ":" + pass + '@');
	console.log (urlOffers1)

	request( { url : urlOffers1 }, function (error, response, body) {
				res.json(response);
	});

});

app.get('/offers-method-two', function (req, res) {

	var auth = "Basic " + new Buffer(user + ":" + pass).toString("base64");

	request( {
		url : url,
		headers : { "Authorization" : auth }
	}, function (error, response, body) {
				res.json(response);
	});

});

app.listen(3000);