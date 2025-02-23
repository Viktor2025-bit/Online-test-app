const mongoose = require("mongoose")

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  return passwordRegex.test(password);
}

const studentSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },

    lastname : {
        type : String,
        required : true
    },

    email : {
        type : String,
        unique : true,
        required : true
    },

    password : {
        type : String,
        unique : true,
        minLength : 8,
        validate : {
            validator: validatePassword,
            message: 
            'Password must contain at least 8 characters, including 1 uppercase, 1 lowercase, 1 number and 1 special character',
        },
    },

    role : {
        type : String,
        enum : ["student", ]
    }
},   { timestamps: true }
)

const studentModel = mongoose.model("Students", studentSchema)

module.exports = studentModel