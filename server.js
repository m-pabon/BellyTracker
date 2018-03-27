var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', require('./controllers/landing-static'));
app.use('/api/entries', require('./controllers/api/entries'));
app.use('/diary', require('./controllers/diary-static'));

//Serve Multiedia
app.get('/assets/background.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, '/assets', 'background.jpg'));
});
//***************************************************************************

app.listen(3000, function () {
    console.log('Server Listening on', 3000);
});
