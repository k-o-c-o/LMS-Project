require("dotenv").config()
const express = require("express")  //imports express framework
const cors = require("cors") //imports cors middleware to connect frontend with backend
const User = require("./models/User")
const connectDB = require("./config/db")
const app = express() //creates express application instance
const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth")
const role = require("./middleware/role")
const Course = require("./models/Course")
const SECRET ="mysupersecretkey"

app.use(cors())
app.use(express.json())

connectDB()

app.get("/",(req,res)=> {res.send("LMS API running")}) //visiting homepage shows message
//get request is used when we want to retireve info froms erver
//post request is used to send data to server
//request object comes from client
//response object comes from server

app.get("/dashboard",auth,(req,res)=>{
    res.json({message:"Welcome to dashboard",
        user:req.user
        //every protected route needs user info
    })
}
)

app.post("/register",async(req,res)=>{ 
     try
     {
        const user = new User(req.body)
        //in user object the frontend data is saved from req.body
        await user.save()
        //wait till data is saved in database
        res.json( {
            message:"User saved successfully",
            user
        })
     }
     catch(err)
    {
        res.status(500).json({error:err.message})
        //we set status code as 500 which indicates server error
        //then a json response is sent to the client.
    }
})

app.post("/login",async(req,res)=> { 
    const {email,password}= req.body  //stores email and password from req.body
    const user = await User.findOne({email})  
     //await because database operations take time
     //findOne returns a document containg entire user details
    if( !user)
    {
        return res.status(404).json({message:"User not found"})
        //404- user not found
    }
    console.log("Entered password:",password)
    console.log("Password:",user.password)

    if(user.password != password)
    {
        return res.status(400).json({message:"Invalid password"})
        //400 =bad request
    }
    
    const token = jwt.sign({id:user.id,role:user.role},
        SECRET,{expiresIn:"1h"}
    )

    res.json({message : "Login successful",
        token
    })

})

//auth is middleware
app.post("/create-course",auth,role("admin"),async(req,res)=>{
    const course = new Course({
        title:req.body.title,
        description:req.body.description,
        createdBy:req.user.id
    })

    await course.save()
    //to wait till the save to finsih before sending.

    res.json({
        message:"Course created",course
    })
})

app.get("/my-courses",auth,role("student"),async(req,res)=>{
    const courses = await Course.find({studentsEnrolled:req.user.id})
    //gives all courses from courses collection
    res.json(courses)
    //sends retrieved courses back as JSON
})
app.post ("/enroll/:courseId",auth,role("student"),async(req,res)=>{
    const course = await Course.findById(req.params.courseId)
    //req.params is an object in Express.js that contains route paramters
    //findById is a built in Mongoose method

    if(!course)
        return res.status(404).json({message:"Course not found"})
    //404-Not found
    if(course.studentsEnrolled.includes(req.user.id))
        return res.status(400).json({message:"Already enrolled"})
    //400- Bad request

    course.studentsEnrolled.push(req.user.id)
    await course.save()

    res.json({message:"Enrolled successfully"})
})
//:xyz is dynamic route parameter means that part of URL will change delpending on course being enrolled to
app.listen(5000,()=>{ console.log("Server running on port 5000")}) 
//starts server on port 5000



