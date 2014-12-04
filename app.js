var express = require('express'),
    http = require('http'),
    connect = require('connect'),
    jade = require('jade'),
    //breezeMongo = require('breeze-mongodb'),
    bodyParser = require('body-parser'),
    assert = require('assert'),
    errorhandler = require('errorhandler'),
    mongojs = require('mongojs'),
    cors = require('express-cors'),
    url = require('url'),
    proxy = require('proxy-middleware'),
    //Server = require('mongodb').Server,
    //Connection = require('mongodb').Connection,
    path = require('path');
    //fs = require('fs'),
    //stylus = require('stylus'),
    //nib = require('nib');
    var process = require('process');

var app = express();

//var MongoClient = require('mongodb').MongoClient;
// the db is on a remote server (the port default to mongo)
var db = mongojs.connect('mongodb://localhost/tasks', ['tasks']);
var tasks = db.collection('tasks');

var server = http.createServer(app);



app.set('port', process.env.PORT || 3001);
app.set('views', 'views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(errorhandler({dumpExceptions: true, showStack: true}));



// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors({
    allowedOrigins: [
        'netflix.com/v2/',
        'dsn-sap-dg7.dassian.loc:8000/sap/opu/odata/sap/',
        'wddg7.dassian.com:8100/sap/opu/odata/sap/'
    ]
}))
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/views'));
app.use(express.static(__dirname + '/public/generated/'));
app.use(express.static(__dirname + '/public/javascripts'));
app.use(express.static(__dirname + '/public/stylesheets'));

console.log(process.pid);
//http://localhost:9595/api/users?$format=json --Nginx
//http://apps.dassian.com/proxy_test/sap?$format=json  --Apache
//http://wddg7.dassian.com:8100/sap/opu/odata/sap/ZUSER_SRV/USR01Set? --Original
app.use('/sap', proxy(url.parse('http://wddg7.dassian.com:8100/sap/opu/odata/sap/ZUSER_SRV/USR01Set?$sap-user=cholzinger&$sap-password=Welcome14')));
// a middleware with no mount path; gets executed for every request to the app
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');

  console.log('Time:', Date.now());
  next();
});
app.get('/',jsonParser, function(req, res){
  console.log('get collection from mongo 1111');
    db.tasks.find().sort({ $natural: -1 }, function(err, tasks) {
    res.render('index.jade', {
      tasks: JSON.stringify(tasks),
      layout: false
    });
    //console.log(tasks)
  });
});
/**
app.get('/sap',jsonParser, function(req, res){
  console.log('get collection from SAP');
    res.send(req.body).status(200);
});
**/
app.get('/api/tasks', function(req, res){
  console.log('get collection from mongo 2222');
    db.tasks.find().sort({ $natural: -1 }, function(err, tasks) {
    res.render('index.jade', {
      tasks: JSON.stringify(tasks),
      layout: false
    });
  });
});

app.get('/api/tasks/:id', function(req, res){
  console.log('get collection from mongo by id');
    db.tasks.findOne( { _id: db.ObjectId(req.params.id) }, function(err, task) {
      res.json(task);
  });
});

app.post('/api/tasks',jsonParser, function(req, res){
  var doRequest = { title: req.body.title };
  console.log(doRequest);
  console.log('post collection to mongo');
    db.tasks.save(doRequest, function(err, task) {
    res.status(201);
    res.json(task);
  });
});

app.put('/api/tasks/:id', function(req, res){
  console.log('put collection by id to mongo');
    db.tasks.update( { _id: db.ObjectId(req.params.id) }, { $set: { title: req.body.title } }, function(err, task) {
    res.status(200);
  });
});

app.delete('/api/tasks/:id', function(req, res){
  console.log('delete collection by id from mongo');
  console.log(req.body)
    db.tasks.remove( { _id: db.ObjectId(req.params.id) }, function(err) {
    res.send().status(200);
  });
});

/**
process.on('exit', function(){
    //Do something when script exits
}

process.on('uncaughtException', function(err){
    console.log('err.stack');
}**/


app.listen(app.get('port'), function(){
console.log("Express server listening on port " + app.get('port'));
});
