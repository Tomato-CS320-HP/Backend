
// Implement your server in this file.
// We should be able to run your server with node src/server.js
// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');


app.use('/mongo_express', mongo_express(mongo_express_config));
app.use(express.static('../Frontend/index.html'));

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/TomatoBase';

MongoClient.connect(url, function(err, db) {

function getCompanyData(callback){
  db.collection('companies').find().toArray(function(err,items){
    if(err) callback(err);
    else callback(null, items);
}
);
}

app.get('/company/:cid/devices/:type', function(req, res){
  getCompanyData(function(err, data) {
    if(err) {
      res.status(500).send("Database error: " + err);
    } else if (data === null) {
      res.status(400).send("Could not find request");
    } else {
      // Send data.
      res.send(data);
    }
  });
});


  // Starts the server on port 3000!
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
