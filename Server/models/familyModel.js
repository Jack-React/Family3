const mongoose = require("mongoose");

const familySchema = mongoose.Schema({
    children: {
        type: Array,
        required: true
    },

    parent: {
        type: Array,
        required: true
    },

    create_date: {
        type: Date,
        default: Date.now
    }
}, {collections: "family"});

var Family = module.exports = mongoose.model('family', familySchema);

module.exports.get = (callback, limit) => {
    Family.find(callback).limit(limit);
}
