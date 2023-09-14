const ErrorHandler = require("../../config/customErrorHandler.config");
const userdb=require("../models/user.model");
const getUserInfo=(req,res,next)=>{
    const {id}=req.params;
    try{
        userdb.findOne({where:{id},attributes:['id','name','userName','email','version']}).then(result=>{
            if(result)
            {
                res.status(200).send(result);
            }
            else{
                next(new ErrorHandler("User Not Found",404))
            }
        }).
        catch(err=>{
            next(new ErrorHandler());
        })
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=getUserInfo;