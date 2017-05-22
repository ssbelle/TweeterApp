"use strict";



// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  //console.log(makeDataHelpers)
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      //console.log(newTweet)
      db.collection("tweets").insertOne(newTweet);
      callback(null);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      var col = db.collection("tweets");
      col.find({}).toArray((err, result) => {
        if(err) {
          console.log("ERRORRRR: ", err);
        }
        // console.log("woot got the db:", result);
         //done my job pass control back to route
        callback(null, result);
      });
    }

    // saveUsers: function(newUser, callback) {
    //   callback(null);
    // }

    // createUsers: function (callback){

    //   var name = req.body.name;
    //   var password = req.body.password;
    //   db.collection("users").createUser(
    //   {
    //     name: "shaw",
    //     password: "shaw"

    //   })
    //   //console.log(createUsers)
    // },

    //  getUsers: function(callback) {
    //   var col = db.collection("users");
    //   col.find({}).toArray((err, result) =>{
    //     if (err) {
    //       console.log("usersb error:", err);
    //     }
    //     //console.log("yays got user db:", result);

    //     callback(null, result);
    //   })
    //  }



  };
}


