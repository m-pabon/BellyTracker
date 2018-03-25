var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
var Entry = require('./models/entry');

app.get('/api/entries', function(req, res, next){
    Entry.find(function(err, entries){
        if(err) { return next(err); }
        res.json(entries);
    });
});


app.post('/api/entries', function(req, res, next){
    var entry = new Entry({
        description: req.body.description,
        amount: req.body.amount,
        unit: req.body.unit,
        calories: req.body.calories
    });
    entry.save(function(err, entry){
        if(err){ return next(err); }
        res.status(201).json(entry);
    });
});

app.listen(3000, function(){
    console.log('Server Listening on', 3000);
});