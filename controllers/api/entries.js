var Entry = require('../../models/entry');
var router = require('express').Router();

router.get('/', function (req, res, next) {
    Entry.find()
        .sort('-date')
        .exec(function (err, entries) {
            if (err) {
                return next(err);
            }
            res.json(entries);
        });
});

router.post('/', function (req, res, next) {
    console.log(req);
    var entry = new Entry({
        description: req.body.description,
        amount: req.body.amount,
        unit: req.body.unit,
        calories: req.body.calories
    });
    entry.username = req.body.username;
    entry.save(function (err, entry) {
        if (err) {
            return next(err);
        }
        res.status(201).json(entry);
    });
});

module.exports = router;
