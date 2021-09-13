const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//methods: use with instances;  static: use with directly with collections
studentSchema.methods.generateAuthToken = async function() {
    try{
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        console.log("this is token: " + token + "\n" );

        return token;
        
    }catch(e){
        res.status(400).send("error part" + e);
        console.log("error part" + e);
    }
}

studentSchema.pre("save", async function(next) {

    if(this.isModified("password")){
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
        // console.log(`the current password is ${this.password}`);
        // this.confirmpassword = undefined;
    }
    next();
});

const Studentregistration = new mongoose.model('Student-Registration', studentSchema);

module.exports = Studentregistration;