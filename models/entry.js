var db = require('../db');
var Entry = db.model('Entry', {
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    tod: {
        type: String,
        required: true,
        default: 'Other'
    },
    nutrients: {
        type: String,
        required: true
    }
});
module.exports = Entry;
