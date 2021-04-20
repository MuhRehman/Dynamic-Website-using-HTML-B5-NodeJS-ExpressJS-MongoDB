const mongoose = require("mongoose");

const validator = require("validator");



const userSchema = mongoose.Schema({
        email:{
            type :String,
            required:true,
          
        },
        lname:{
            type :String,
            required:true
        },
        phone:{
            type :String,
            required:true
              
        },
        filename:{
            type :String,
            required:true
              
        }
})


// we need a Collection

const User = mongoose.model("User", userSchema);

module.exports = User;