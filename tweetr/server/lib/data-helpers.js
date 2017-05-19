"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet)
          // , function(err, result) {
          // if(err) {
          //   console.log("errerrrragin", err);
          // }
          // console.log("posted a tweet?!:", result);
          callback(null);
        // };
        // db.tweets.push(newTweet);



    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      var col = db.collection("tweets");
      col.find({}).toArray((err, result) => {
        if(err) {
          console.log("ERRORRRR: ", err);
        }
        console.log("woot got the db:", result);
         //done my job pass control back to route
        callback(null, result);
        // db.close();
      });
    }
  };
}




//

//not needed because we are using a real db now
            // simulateDelay(() => {
            //   const sortNewestFirst = (a, b) => a.created_at - b.created_at;
           //   callback(null, db.tweets.sort(sortNewestFirst));




//  var col = db.collection("tweets");

// col.find({}).toArray((err, result) => {
//     if(err) throw err;
//     console.log("woot got the db:" result);

//     db.close();
