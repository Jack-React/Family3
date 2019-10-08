const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
    _id :{
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: false
    }
})

module.exports = photoSchema;