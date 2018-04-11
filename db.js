var mongoose = require('mongoose');

//BEFORE PUSHING EMPTY THE PASSWORD FIELD
const mongoDbUrl = 'mongodb+srv://admin:<PASSWORD>@bellytracker-rcy2p.mongodb.net/test';

mongoose.connect(mongoDbUrl, {
    dbName: 'test'
}, function () {
    console.log('mongodb connected')
});

module.exports = mongoose
