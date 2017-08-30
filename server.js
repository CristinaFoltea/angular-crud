var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var Schema = mongoose.Schema;                           //mongoose schema for models
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var resRouter = express.Router();
var PORT = process.env.PORT || 8080;
// var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/resourceApi';


var MONGODB_URI = 'mongodb://crisswear:i am mongo@ds141242.mlab.com:41242/resources_api?authMechanism=SCRAM-SHA-1'; ///bad practice 
mongoose.connect(MONGODB_URI);     // connect to mongoDB database


// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + MONGODB_URI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/resourceApi');     // connect to mongoDB database

//creating data model
var resModel = new Schema({
  "title" : {type : String},
  "author" : {type : String},
  "home_link" : {type : String},
  "img_link" : {type : String},
  "media_type" : {type : String},
  "category" : {type : []},
  "creation_time" : {type: Date, default: Date.now }
})
var Resource = mongoose.model("Resource", resModel);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use('/api/resources', resRouter);

// routes ======================================================================
resRouter.route('/')
         .get(function (req, res) {
           Resource.find(function (err, data) { ///get all items in db
             if (err) {res.status(500).send(err)}
             res.json(data)
           })
         })
         .post(function (req, res) { ///create a new item
            var resource = new Resource(req.body); ///a new model instance
            resource.save(function (err) { //saving item to database
              if (err) {res.status(500).send(err)}
              res.status(201).send(resource); ///sending created 201 status and send back the new created item
            });
         })

resRouter.use('/:id', function (req, res, next) {  //creating middleware to avoid repetition
  Resource.findById(req.params.id, function (err, item) { ///get item by id from db
    if (err) res.status(500).send(err)
    if (item) {
      req.item = item;
      next();
    } else {
      req.status(404).send('resource not found!!!')
    }
  })
})

resRouter.route('/:id')
         .get(function (req, res) {
           res.json(req.item)
         })
         .put(function (req, res) { ////updating an existing item
           req.item.title = req.body.title;
           req.item.author = req.body.author;
           req.item.home_link = req.body.home_link;
           req.item.img_link = req.body.img_link ;
           req.item.media_type = req.body.media_type ;
           req.item.category = req.body.category;
           req.item.save(function (err) {  ///saving the changes
             if (err) res.status(500).send(err)
             res.send(req.item); ///once saved send back the updated entry
           });
         })
         .patch(function (req, res) {
           delete req.body._id; ///to avoid rewriting the id
           delete req.body.creation_time; ///to avoid rewriting the creation_time

           for(var i in req.body){ ///looping through all the field to be updates
             req.item[i] = req.body[i]; ///updating the fields
           }
           req.item.save(function (err) {  ///saving the changes
             if (err) res.status(500).send(err)
             res.send(req.item); ///once saved send back the updated entry
           });
         })
         .delete(function (req, res) {
           req.item.remove(function (err) {
             if (err) res.status(500).send(err)
             res.status(204).send("Removed") ///send 204 remove status back
           })
         })

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
      res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });

// listen (start app with node server.js) ======================================
app.listen(PORT, function () {
  console.log('server successfully started on port '+ PORT);
});
