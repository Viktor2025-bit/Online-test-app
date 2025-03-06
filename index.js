const express = require("express")
const app = express()
const mongoose = require("mongoose")
const authMiddleware = require("./Middleware/AuthMiddleware")
const studentRoute = require("./Routes/Students.routes")
const testRoute = require("./Routes/Test.routes")
const crypto = require("crypto")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use("/api/view", authMiddleware, testRoute)
app.use("/api/auth", studentRoute)

mongoose.connect(process.env.URI)
.then(() => {
    console.log("Connected!")
})
.catch((err) => {
    console.error(err.message)
})


app.listen(port, () => {
    console.log(`App is active on port ${port}`)
})
