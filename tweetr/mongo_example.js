"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

///look up const {MongoClient} = require("mongodb");
// This is called "destructuring assignmen

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  //connection to test-tweets db starting here
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  //get all tweets
  var col = db.collection("tweets");

 ////this exanpe returns object
  // col.find({}, (err, results) => {
  //   if (err) throw err;
  //   console.log("for each item:" );
  //   results.each((err, item) => console.log(" ", item));

  //   db.close();




  // //vs     // ==> We could instead just slurp the items into an array:
  //   results.toArray((err, resultsArray) => {
  //     if (err) throw err;

  //     console.log("results.toArray:", resultsArray);
  //   });

///this exanpe returns array
  col.find({}).toArray((err, result) => {
    if (err) throw err;
    console.log("for each item:", result );
    console.log("type of find result:", typeof result);

    db.close();
  });
});





////same as in function form
// function getTweets(callback) {
//     db.collection("tweets").find().toArray((err, tweets) => {
//       if (err) {
//         return callback(err);
//       }
//       callback(null, tweets);
//     });
//   }

//   // ==> Later it can be invoked. Remember even if you pass
//   //     `getTweets` to another scope, it still has closure over
//   //     `db`, so it will still work. Yay!

//   getTweets((err, tweets) => {
//     if (err) throw err;

//     console.log("Logging each tweet:");
//     for (let tweet of tweets) {
//       console.log(tweet);
//     }

//     db.close();
//   });

});

//In typical node-callback style, any program
  //     logic that needs to use the connection needs
  //     to be invoked from within here.
  //
  //     Another way to say: this is an "entry point" for
  //     a database-connected application!