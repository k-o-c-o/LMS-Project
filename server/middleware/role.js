const role = (allowedRole)=> {
    //role function takes one parameter
    return(req,res,next)=>{
        //returns middleware
        if(req.user.role !== allowedRole){
            return res.status(403).json({message:"Access denied"})
        //403 - forbidden
        }
        next()
    }
}
module.exports = role