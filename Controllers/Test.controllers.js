const testModel = require("../Models/Test.Model")
const resultModel = require("../Models/Result.model")
const progressModel = require("../Models/Progress.model")
const axios = require("axios")
const { v4: uuidv4 } = require("axios")
// ✅ Get All Subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await testModel.find().select("title subject");
        if (!subjects.length) {
            return res.status(400).json({ message: "No subjects available" });
        }
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: "Error fetching test subjects" });
    }
};

// ✅ Get Test Page with Questions
const getTestPage = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
       
};

// ✅ Submit Test & Calculate Score
const submitTest = async (req, res) => {
    try {
        const { answers } = req.body;
        if (!answers) {
            return res.status(400).json({ message: "No answers found" });
        }

        const testId = req.params.id;
        const testSubject = await testModel.findById(testId);
        if (!testSubject) {
            return res.status(404).json({ message: "Test not found" });
        }

        let score = 0;
        testSubject.questions.forEach(q => {
            if (answers[q._id] === q.correctAnswer) {
                score += 10;
            }
        });

        const result = new resultModel({
            userId: req.user._id,
            testId: testSubject._id,
            score,
            total: testSubject.questions.length,
            submittedAt: new Date()
        });

        await result.save();
        res.status(200).json({ message: "Test submitted successfully", result });
    } catch (error) {
        res.status(500).json({ message: "Error submitting test" });
    }
};

// ✅ Save Progress
const saveProgress = async (req, res) => {
    try {
        const { answers } = req.body;
        const userId = req.user.id;
        const testId = req.params.id;

        const progress = await progressModel.findOneAndUpdate(
            { userId, testId },
            { answers, lastUpdated: new Date() },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: "Progress saved successfully", progress });
    } catch (error) {
        res.status(500).json({ message: "Error saving progress" });
    }
};

module.exports = { getAllSubjects, getTestPage, submitTest, saveProgress };
