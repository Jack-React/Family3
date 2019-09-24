const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    _id: {
        type: Number,
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
        type: String,
        required: true
    },

    create_date: {
        type: Date,
        default: Date.now
    },
    // belong to which family
    family: {
        type: Number, // family id
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
