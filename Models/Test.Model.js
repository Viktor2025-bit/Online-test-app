const mongoose = require("mongoose");

// Define Questions Schema
const questionsSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

// Define Test Schema
const testSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
    questions: {
        type: [questionsSchema],
        required: true,
        validate: {
            validator: q => Array.isArray(q) && q.length > 0,
            message: "A test must have at least one question"
        }
    },
    duration: { type: Number, default: 60 },
    createdAt: { type: Date, default: Date.now }
});

const testModel = mongoose.model("Test", testSchema);
module.exports = testModel;
