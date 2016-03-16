var express = require('express');
var app = express();
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./lib/services/configService').config;
var logger = require('./lib/utils/logger').init(config.winston);
var api = require('./lib/api');

var mongoDb = require('./lib/utils/database');

mongoDb.connect('mongodb://localhost:27017/biltong-box')
  .then(function connected() {
    logger.info("connected to mongodb");
  })
  .catch(function connectFailed(err) {
    logger.error("error connecting to mongodb ", err);
  });

var path = __dirname + '/views/';

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.use(require('morgan')('dev'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', express.static('public'));
app.use('/views', express.static('views'));
app.use('/js', express.static('app'));
app.use('/bower_components', express.static('bower_components'));
app.use('/static', express.static('public'));

app.use('/',router);

router.post('/api/message', api.saveMessage);
router.get('/api/message', api.getMessages);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});

app.listen(3030,function(){
  console.log("Live at Port 3030");
});
