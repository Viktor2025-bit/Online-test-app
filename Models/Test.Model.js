const mongoose = require("mongoose")
const { validate } = require("./Students.model")

const testSchema = new mongoose.Schema({
   title : {
    type : String,
    required : true
   },

   subject : {
    type : String,
    required : true
   },

   questions : {
    type : [questionsSchema],
    required : true,
    validate : q => q.length === 20
   },

   duration : {
    type : Number,
    default : 60
   },

   createdAt : {
    type : Date,
    default : Date.now
   }
})

const questionsSchema = new mongoose.Schema({
    questionText : {
        type : String,
        required : true
    },

    options : [{
        type : String,
        required : true
    }],

    correctAnswer : {
        type : String,
        required : true
    }
})

const testModel = mongoose.model("Test", testSchema)

module.exports = testModel