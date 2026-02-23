const jwt=require('jsonwebtoken')
async function authUser(req,res,next) {
     const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:'you are not logged in'})
        }
        try{
            jwt.verify(token,process.env.JWT_SECRET)
       next()
        }
        catch(err){
            
            res.status(401).json({
                message:'invalid token'
            })
        }
    
}
module.exports={authUser}