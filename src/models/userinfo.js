const mongoose = require("mongoose");

const validator = require("validator");



const userSchema = mongoose.Schema({
        email:{
            type :String,
            required:true,
            validator(value){
                if (!validator.isEmail(value)) {
                    throw new Error("invalid email id")
                }
            }
        },
        name:{
            type :String,
            required:true
        },
        phone:{
            type :String,
            required:true
              
        },
})


// we need a Collection

const User = mongoose.model("User", userSchema);

module.exports = User;