var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
var logger = require('morgan');

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(process.cwd()+ '/public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

mongoose.connect('mongodb://localhost/newsbooze');
var db= mongoose.connection;

db.on('error',function(err){
    console.log('Error: ', err)
});

db.once('open', function(){
    console.log('Mongoose connection worked.');
});

var comments = require('./models/comments.js');
var articles = require('./models/articles.js');
var router = require('./controllers/controller.js');
app.use('/', router);

var port =/*process.env.PORT || */3000;
app.listen(port, function(){
    console.log('port is open and listening: '+ port);
});