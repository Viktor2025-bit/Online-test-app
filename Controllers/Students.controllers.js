const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const studentModel = require("../Models/Students.model")



const registerStudent = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!firstname || !lastname || !email || !password) {
            return res.status(401).json({ Msg: "All missing fields are required" })
        }


        const saltRounds = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newStudent = new studentModel({ firstname, lastname, email, password: passwordHash })
        await newStudent.save()
        res.status(201).json({ Msg: "Registeration successful!...please login to proceed" })
    } catch (error) {
        res.status(500).json({ Msg: "Internal server error" })
        console.log(error.message)
    }
}

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ Msg: "All missing fields are required" })
        }
        //check if the student data already exist
        const checkStudent = await studentModel.findOne({ email })
        if (!checkStudent) {
            return res.status(403).json({ Msg: "Invalid credentials...please register" })
        }
        const passwordCheck = await bcrypt.compare(password, checkStudent.password)
        if (passwordCheck) {
            const token = jwt.sign({ id: checkStudent._id, username: checkStudent.username }, { expiresIn: "1h" })
            return res.status(200).json("Login successful", token)
        }
    } catch (error) {
        console.log(error.message)
    }
}

const getAllStudent = async (req, res) => {
  try {
    const allStudents = await studentModel.find({})
    if(!allStudents){
        return res.status(403).json({Msg : "No student found"})
    }
    res.status(200).json(allStudents)
  } catch (error) {
    res.status(500).json({Msg : "Internal server error"})
    console.log(error.message)
  }
}

module.exports = { registerStudent, loginStudent, getAllStudent }