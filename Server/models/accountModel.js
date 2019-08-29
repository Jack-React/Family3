var mongoose = require("mongoose");

var accountSchema = mongoose.Schema({
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
    }
});

var Account = module.exports = mongoose.model('account', accountSchema);

module.exports.get = function (callback, limit){
    Account.find(callback).limit(limit);
}
