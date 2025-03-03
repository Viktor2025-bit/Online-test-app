const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },

    testId : {
        type : String,
        required : true
    },

    score : {
        type : Number,
        required : true
    },

    total : {
        type : Number,
        required : true
    }
})

const resultModel = mongoose.model("Result", resultSchema)

module.exports = resultModel