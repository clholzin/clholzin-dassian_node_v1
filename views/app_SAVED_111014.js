var express = require('express'),
    http = require('http'),
    connect = require('connect'),
    jade = require('jade'),
    bodyParser = require('body-parser'),
    var assert = require('assert'),
    errorhandler = require('errorhandler'),
    db = require('mongojs'),
    //Server = require('mongodb').Server,
    //Connection = require('mongodb').Connection,
    path = require('path');
    //fs = require('fs'),
    //stylus = require('stylus'),
    //nib = require('nib');

//var MongoClient = require('mongodb').MongoClient;
// the db is on a remote server (the port default to mongo)
var db = mongojs('localhost:27017/tasks', ['tasks']);
var app = express();
//var db = mongo.connect('127.0.0.1/:62124/tasks', ['tasks']);
var server = http.createServer(app);
// Connection URL
var url = 'mongodb://localhost:27017/tasks';


/**
// Connection URL
var url = 'mongodb://localhost:27017/tasks';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
  console.log("Connected correctly to server");
  var collection = db.collection('tasks', function(err, collection) {});

//  db.close();
});**/
var ObjectID = db.bson_serializer.ObjectID;

    //var mongo = require("mongojs").ObjectId;


app.set('port', process.env.PORT || 3001);
app.set('views', 'views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(bodyParser());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public/stylesheets'));
app.use(errorhandler({dumpExceptions: true, showStack: true}));

// a middleware with no mount path; gets executed for every request to the app
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.get('/', function(req, res){
  db.collection('tasks', function(err, collection) {
// Fetch all docs for rendering of list
collection.find({}).toArray(function(err, items) {
res.render('index.jade', {
  tasks: JSON.stringify(tasks),
  layout: false
});
});
});

  /**db.tasks.find().sort({ $natural: -1 }, function(err, tasks) {
    res.render('index.jade', {
      tasks: JSON.stringify(tasks),
      layout: false
    });
  });**/
});

app.get('/api/tasks', function(req, res){
  res.json(tasks);
  /**db.tasks.find().sort({ $natural: -1 }, function(err, tasks) {
    res.json(tasks);
  });**/
});

app.get('/api/tasks/:id', function(req, res){
  collection.findOne( { _id: db.ObjectId(req.params.id) } , function(err, task) {
    res.json(task);
  });
});

app.post('/api/tasks', function(req, res){
  collection.save(req.body, function(err, task) {
    res.status(201);
    res.json(task);
  });
});

app.put('/api/tasks/:id', function(req, res){
  collection.update( { _id: db.ObjectId(req.params.id) }, { $set: { title: req.body.title } }, function(err, task) {
    res.status(200);
  });
});

app.delete('/api/tasks/:id', function(req, res){
  collection.remove( { _id: db.ObjectId(req.params.id) }, function(err) {
    res.send();
  });
});
app.listen(app.get('port'), function(){
console.log("Express server listening on port " + app.get('port'));
});
