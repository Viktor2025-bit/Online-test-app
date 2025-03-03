const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")
  if(!token){
    res.status(401).json({Msg : "Access denied. No token provided"})
    alert("Access denied")
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({Msg : "Invalid token"})
  }
}

module.exports = authMiddleware