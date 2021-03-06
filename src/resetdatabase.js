var ObjectID = require('mongodb').ObjectID;

var databaseName = "TomatoBase";
// Put the initial mock objects here.
var initialData = {
    "companies": {
        "1": {
            "label": "Armory", //472
            "value": "0.279"
        },
        "2": {
            "label": "Murmur II", //473
            "value": "0.05"
        },
        "3": {
            "label": "Frogman", //474
            "value": "0.024"
        },
        "4": {
            "label": "Kismet", //475
            "value": "0.08"
        },
        "5": {
            "label": "Sergei Kravinoff", //477
            "value": "0.104"
        },
        "6": {
            "label": "Kl'rt", //478
            "value": "0.04"
        },
        "7": {
            "label": "Zuras", //479
            "value": "0.07"
        },
        "8": {
            "label": "Mastermind", //480
            "value": "0.02"
        },
        "9": {
            "label": "SuperPro", //482
            "value": "0.25"
        },

        "10": {
            "label": "Link", //483
            "value": "0.04"
        },

        "11": {
            "label": "SuperPro", //482
            "value": "0.25"
        },


        "12": {
            "label": "Nameless One", //486
            "value": "0.114"
        },

        "13": {
            "label": "Miss America", //487
            "value": "0.411"
        }
    }
};
/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
