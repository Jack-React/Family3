const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    create_date: {
        type: Date,
        default: Date.now
    },
    
    family: {
        type: Number,
        required: false
    },

    gender: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        required: true
    }
    
}, { _id: false });

var Account = module.exports = mongoose.model('account', accountSchema);

module.exports.get = (callback, limit) => {
    Account.find(callback).limit(limit);
}
