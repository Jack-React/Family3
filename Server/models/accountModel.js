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
    DOB: {
        type: Date
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },

    create_date: {
        type: Date,
        default: Date.now
    },
    // belong to which family
    family: {
        type: String, // family id
        required: false
    },

    album: {
        type: String,
        required: false
    }
}, { _id: false });

var Account = module.exports = mongoose.model('account', accountSchema);

module.exports.get = (callback, limit) => {
    Account.find(callback).limit(limit);
}
