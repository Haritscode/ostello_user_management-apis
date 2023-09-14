const errorHandler=(err,req,res,next)=>{
    err.status=err.status || 500;
    err.message=err.message || "Server Internal error"
    res.status(err.status).json({msg:err.message})
}
module.exports=errorHandler;