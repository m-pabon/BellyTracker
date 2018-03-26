var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./controllers/landing-static'));
app.use('/api/entries', require('./controllers/api/entries'));
app.use('/diary', require('./controllers/diary-static'));


//***************************************************************************
//***This is the current workaround for serving what's in the 'src' folder***
//Serve CSS
app.get('/src/css/landingPage.css', function(req,res){
    res.sendFile(path.join(__dirname, '/src/css', 'landingPage.css'));
});
app.get('/src/css/diary.css', function(req,res){
    res.sendFile(path.join(__dirname, '/src/css', 'diary.css'));
});
app.get('/src/css/global.css', function(req, res){
    res.sendFile(path.join(__dirname, '/src/css', 'global.css'));
});
//Serve Js
app.get('/src/js/global.js', function(req,res){
    res.sendFile(path.join(__dirname, '/src/js', 'global.js'));
});
app.get('/src/js/landingPage.js', function(req,res){
    res.sendFile(path.join(__dirname, '/src/js', 'landingPage.js'));
});
//Serve Multiedia
app.get('/assets/background.jpg', function(req,res){
    res.sendFile(path.join(__dirname, '/assets', 'background.jpg'));
});
//***************************************************************************

app.listen(3000, function(){
    console.log('Server Listening on', 3000);
});