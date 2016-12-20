
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

function getReadData(systemid, callback){
 var data = {
  "label": systemid,
  "write": (4 * systemid) + systemid //random mock data
 }
callback(null, data);
  /*
  db.collection('reads').findOne({
    _id: systemid
  }, function (err, data) {
    console.log(data);
    if (err) return callback(err);
    else if(data === null) {
      return callback(null, null);
    }
    callback(null, data);
  });*/
}

app.get('/company/:cid/devices/:type', function(req, res){
  var systemid = req.params.cid;
  var device = req.params.type;
  console.log(systemid + " " + device);
  getReadData(systemid, function(err, data) {
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
