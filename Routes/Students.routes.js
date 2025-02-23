const express = require("express")
const { registerStudent, loginStudent, getAllStudent } = require("../Controllers/Students.controllers")
const router = express.Router()

router.post("/register", registerStudent)

router.post("/login", loginStudent)

router.get("/allstudents", getAllStudent)

module.exports = router