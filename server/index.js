const express = require("express")  //imports express framework
const cors = require("cors") //imports cors middleware to connect frontend with backend
const User = require("./models/User")
const connectDB = require("./db")
const app = express() //creates express application instance

app.use(cors())
app.use(express.json())

connectDB()

app.get("/",(req,res)=> {res.send("LMS API running")}) //visiting homepage shows message
//get request is used when we want to retireve info froms erver
//post request is used to send data to server
//request object comes from client
//response object comes from server


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
    if(user.password != password)
    {
        return res.status(400).json({message:"Invalid password"})
        //400 =bad request
    }

    res.json({message : "Login successful",
        user
    })

})

app.listen(5000,()=>{ console.log("Server running on port 5000")}) 
//starts server on port 5000



