const express = require("express")  //imports express framework
const cors = require("cors") //imports cors middleware to connect frontend with backend


const app = express() //creates express application instance

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=> {res.send("LMS API running")}) //visiting homepage shows message
//get request is used when we want to retireve info froms erver
//post request is used to send data to server
//request object comes from client
//response object comes from server
app.listen(5000,()=>{ console.log("Server running on port 5000")}) 
//starts server on port 5000

app.post("/register",(req,res)=>{ 
    console.log(req.body)
    res.json({message:"User registered successfully"})
})

