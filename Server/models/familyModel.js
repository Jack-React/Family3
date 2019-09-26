const mongoose = require("mongoose");

const relationSchema = mongoose.Schema({
    person1: {
        type: Number, // acount id
        required: true
    },
    person2: {
        type: Number, // different account id
        required: true
    },
    relationship: {
        type: String,
        required: true
    }
});

const familySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    relations: [relationSchema]
});

var Family = module.exports = mongoose.model('family', familySchema);

module.exports.get = (callback, limit) => {
    Family.find(callback).limit(limit);
}
