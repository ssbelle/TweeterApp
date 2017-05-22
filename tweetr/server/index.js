'use strict';

// Basic express setup:

const PORT          = 8080;
const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const userHelper    = require('./lib/util/user-helper')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017/tweeter';


MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err){
    console.error(`sailed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.log(`woot connected to mongodb: ${MONGODB_URI}`);

  // The `data-helpers` module provides an interface to the database of tweets.
  // This simple interface layer has a big benefit: we could switch out the
  // actual database it uses and see little to no changes elsewhere in the code
  // (hint hint).
  //
  // Because it exports a function that expects the `db` as a parameter, we can
  // require it and pass the `db` parameter immediately:
  const DataHelpers = require('./lib/data-helpers.js')(db);

  // The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
  // so it can define routes that use it to interact with the data layer.
  const tweetsRoutes = require('./routes/tweets')(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use('/tweets', tweetsRoutes);


  //register process needs to be polished
  app.post('/register', (req, res) =>{
    const users = db.collection("users");
    const tryUser = {name : req.body.name, password: req.body.password};
    users.findOne({name: tryUser.name}, function(err, doc) {
      if(doc){
        res.status(400).json({
          type: 'error',
          message: 'This username is already registered. Please choose another username or login.',
        })
      } else if(tryUser.name.length === 0){
        res.status(400).json({
          type: 'error',
          message: 'Please enter a valid username.',
        })
      } else if(tryUser.password.length < 6){
        res.status(400).json({
          type: 'error',
          message: 'Passwords must be a minimum of six characters.',
        })
      } else {
          res.status(200).json({
            type: 'success',
            message: 'Thanks for registering. You are already logged in, click Compose to begin tweeting!',
          })
        const newUser = userHelper.generateRandomUser({userName: tryUser.name});
        console.log('newUser generated @ index.tweets', newUser);
        newUser.password = tryUser.password;
        db.collection('users').insertOne(newUser)
        console.log('post from register', {name : req.body.name, password: req.body.password})
      }
    })
  });


  //login process needs to be polished
  //need to add encryption  etc
  app.post('/login', (req, res) => {
    const users = db.collection("users");
    const loginInfo = {name: req.body.name, password: req.body.password};

    users.findOne({name: loginInfo.name, password: loginInfo.password}, function(err, doc){
      if(doc){
        delete doc.password
        res.status(200).json({
          type: 'success',
          message: 'Congrats you are logged in! Tweet away!',
          user: doc
        })
      } else {
        res.status(400).json({
          type: 'error',
          message: 'sorry try again logged in',
        })
      }
    });
  });


  app.get('/login', (req, res) => {
    console.log('get from login')
    .res.send('get login some string').end();
  })

  app.get('/register', (req, res) =>{
    console.log('get from register')
    res.send('get some string').end();
  });
})


app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
