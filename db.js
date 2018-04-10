var mongoose = require('mongoose');

//BEFORE PUSHING EMPTY THE PASSWORD FIELD
const mongoDbUrl = 'mongodb+srv://admin:A7x0918%21@bellytracker-rcy2p.mongodb.net/test';

mongoose.connect(mongoDbUrl, {
    dbName: 'test'
}, function () {
    console.log('mongodb connected')
});

module.exports = mongoose
