const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization")
  if(!authHeader || !authHeader.startsWith(
    "Bearer"
  )){
      return
      res.status(401).json({ Msg : "Access denied. No token provided"})
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ Msg : "Invalid token"})
  }
}  
  module.exports = authMiddleware;