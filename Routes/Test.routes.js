const express = require("express")
const router = express.Router()
const authMiddleware = require("../Middleware/AuthMiddleware")
const { getAllSubjects, getTestPage, submitTest, saveProgress } = require("../Controllers/Test.controllers")


router.get("/subjects", authMiddleware, getAllSubjects)

router.get("/testpage", authMiddleware, getTestPage)

router.post("/submit", authMiddleware, submitTest)

router.post("/progress", authMiddleware, saveProgress)

module.exports = router