const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name : String,
    role : String,
    email: String,
    password:String
})

module.exports = mongoose.model("User",userSchema)
//creates a model named "User" using the schema 
//so we can use User.create(),User.find()