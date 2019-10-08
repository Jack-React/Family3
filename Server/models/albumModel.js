const mongoose = require("mongoose");
const photoSchema = require('./photoModel')

const albumSchema = mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    
    photos: [{photoID: Number, name: String, description: String}]
});

var Album = module.exports = mongoose.model('album', albumSchema);

module.exports.get = (callback, limit) => {
    Album.find(callback).limit(limit);
}