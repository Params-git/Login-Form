const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        Unique: true
    },
    email: {
        type: String,
        required: true,
        Unique: [true, "Already this Email ID present"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Studentregistration = new mongoose.model('Student-Registration', studentSchema);

module.exports = Studentregistration;