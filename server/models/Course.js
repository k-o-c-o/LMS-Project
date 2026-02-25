const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
    title :{ type:String , required:true},
    description :{type:String},
    createdBy :{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    //stores the unique id of document
    //ref:User creates relationship
    studentsEnrolled : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}]
    //[]creates an array as many students can be part of 1 course
    
})

module.exports = mongoose.model("Course",courseSchema)
//mongoose.model converts schema into model that helps to 
//create documents,save,query etc.