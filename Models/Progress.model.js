const mongoose = require("mongoose")

const progressSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user", 
        required : true
    },

    testId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Test",
        required : true
    },

    answers : {
        type : Map,
        of : String
    },

    lastUpdated : {
        type : Date, 
        default : Date.now
    }
})

const progressModel = mongoose.model("Progress", progressSchema)

module.exports = progressModel