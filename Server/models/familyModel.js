const mongoose = require("mongoose");

const familySchema = mongoose.Schema({
    childrens: {
        type: Array,
        required: true
    },

    parents: {
        type: Array,
        required: true
    },

    create_date: {
        type: Date,
        default: Date.now
    }
});

var Family = module.exports = mongoose.model('family', familySchema);

module.exports.get = (callback, limit) => {
    Family.find(callback).limit(limit);
}
