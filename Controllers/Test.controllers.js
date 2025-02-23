const express = require("express")
const testModel = require("../Models/Test.Model")
const resultModel = require("../Models/Result.model")
const studentModel = require("../Models/Students.model")
const progressModel = require("../Models/Progress.model")

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await testModel.find().select("title subject")
    if(!subjects){
        res.status(400).json({Msg : "No subjects available"})
        return;
    }
    res.status(200).json(subjects)
  } catch (error) {
    res.status(500).json({ message: "Error fetching test subjects" });
  }
}

const getTestPage = async (req, res) => {
  try {
    const testId = req.params.id
    const testSubject = await testModel.findById(testId)
    if(!testSubject){
        return res.status(404).json({Msg : "Test will start soon"})
    }
    const startTime = Date.now()
    const endTime = startTime + testModel.duration * 60 * 1000
    res.status(200).json({
        testId : testModel._id,
        title : testModel.title,
        subject : testModel.subject,
        questions : testModel.questions.map(q => ({
            _id : q._id,
            questionText : q.questionText,
            options : q.options

        })),
        startTime, endTime
    })
  } catch (error) {
    res.status(500).json({Msg : "Internal server error"})
    console.log(error.message)
  }
}

// Auto or manual submission
const submitTest = async (req, res) => {
  try {
    const { answers } = req.body
    if(!answers){
        return res.status(404).json({Msg : "No answer found"})
    }
    const testId = req.params.id
    const testSubject = await testModel.findById(testId)
    if(!testSubject){
        return res.status(404).json({ message: "Test not found" });
    }

    let score = 0
    testSubject.questions.forEach(q => {
        if(answers[q._id] === q.correctAnswer){
            score += 10 
        }
    })

    //save the result
    const result = new resultModel({
        userId : req.user._id,
        testId : testSubject._id,
        score : score,
        total : testSubject.questions.length,
        submittedAt : new Date()
    })

    await result.save()
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json({ message: "Error submitting test" });
    console.log(error.message)
  }
}

const saveProgress = async (req, res) => {
   try {
    const { answers } = req.body
    const userId = req.user.id
    const testId = req.params.id

    const progress = await progressModel.findOne({ userId, testId })
    if(!progress){
      progress = new progressModel({ userId, testId, answers })
    } else {
      progress.answers = { ...progress.answers, ...answers}
      progress.lastUpdated = new Date()
    }

    await progressModel.save()
    alert("Progress saved successfully")
   } catch (error) {
    res.status(500).json({ message: "Error saving progress" });
    console.log(error.message)
   }
}

module.exports = { getAllSubjects, getTestPage, submitTest, saveProgress }