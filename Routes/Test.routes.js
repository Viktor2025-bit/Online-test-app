const express = require("express");
const authMiddleware = require("../Middleware/AuthMiddleware")
const router = express.Router();
const { getAllSubjects, getTestPage, submitTest, saveProgress } = require("../Controllers/Test.controllers")

router.get("/subjects", authMiddleware, getAllSubjects);
router.get("/testpage/:id", authMiddleware, getTestPage);
router.post("/submit/:id", authMiddleware, submitTest);
router.post("/progress/:id", authMiddleware, saveProgress);

module.exports = router;
