var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');

//Looks up a user from the passed-in username and then checks the password hash with bcrypt against the one
//the user sent in. If successful, it will pass back a new JWT for that user. That JWT is what the client will
//need to make all future authenticated requests
router.post('/', function (req, res, next) {
    User.findOne({
            username: req.body.username
        })
        .select('password').select('username')
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.sendStatus(401);
            }
            bcrypt.compare(req.body.password, user.password, function (err, valid) {
                if (err) {
                    return next(err);
                }
                if (!valid) {
                    return res.sendStatus(401);
                }
                var token = jwt.encode({
                    username: user.username
                }, config.secret);
                res.send(token);
            });
        });
});

module.exports = router;
