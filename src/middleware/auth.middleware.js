const jwt=require('jsonwebtoken')

async function authArtist(req,res,next) {
    const token=req.cookies.token
    
    if(!token){
        return res.status(401).json({
            message:'unauthorized'
        })
    }
    
    try{
    const decoded= jwt.verify(token,process.env.JWT_SECRET)
    
    if(decoded.role!=='artist'){
        return res.status(403).json({
            message:'YOU ARE NOT THE ARTIST!!!'
        })
    }
    req.user=decoded
    next()
}
catch(err){
console.log(err)
res.status(401).json({
    message:'unauthorized!!'
})
}   
}

async function authUser(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:'rs'
        })
    }
    try{
jwt.verify(token,process.env.JWT_SECRET)

next()

    }catch(err){
        console.log(err)
        res.status(403).json({
            message:'unauthorized!!!'
        })
}
}



module.exports={authArtist,authUser}