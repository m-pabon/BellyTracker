var mongoose = require('mongoose');

const mongoDbUrl = 'mongodb+srv://admin:<PASSWORD>@bellytracker-rcy2p.mongodb.net/test';

mongoose.connect(mongoDbUrl, {dbName: 'test'}, function(){
   console.log('mongodb connected') 
});

module.exports = mongoose