
// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/Cardie';

// Support receiving text in HTTP request bodies
var bodyParser = require('body-parser');

MongoClient.connect(url, function(err, db) {

  app.use('/mongo_express', mongo_express(mongo_express_config));

  app.use(express.static('../Frontend/index.html'));
  app.use(bodyParser.text());
  // Support receiving JSON in HTTP request bodies
  app.use(bodyParser.json());

  function sendDatabaseError(res, err){
    res.status(500).send("A database error occurred: " + err);
  }

  // Starts the server on port 3000!
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
