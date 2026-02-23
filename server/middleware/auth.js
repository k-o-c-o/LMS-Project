const jwt = require("jsonwebtoken")
const SECRET = "mysupersecretkey"

//middleware alway has 3 parameters: req,res,next(function to move to next step)
const auth =(req,res,next)=> {
    const token = req.headers.authorization 
    //gets token from header
    if(!token)
        return res.status(401).json({message:"No token provided"})
    //if user did not send token , then they are not logged in
    //401- unauthorized 
    try
    {
        const decoded = jwt.verify(token,SECRET)
        req.user = decoded
        //lets routes access data like req.user.id etc
        next()
        //express already knows the order of functions to execute
    }
    catch
    {
        res.status(403).json({message:"Invalid token"})
        //403- forbidden
    }
}
module.exports = auth