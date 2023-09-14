const ErrorHandler = require("../../config/customErrorHandler.config");
const userdb=require("../models/user.model");
const optimisticLocking=async (req,res,next)=>{
    const {id}=req.params;
    const {user,initalVersion}=req.body;
    if(req.params.id.toString()===req.body.id.toString() && req.body.id.toString()===req.userInfo.id.toString()){
        try{
            const existingUser=await userdb.findByPk(id);
            if(!existingUser){
                return res.status(404).json({err:'User not found'});
            }
            if(existingUser.version !== initalVersion){
                return res.status(409).json({err:'Conflict - User data has been updated by another user.'})
            }
            user.version=existingUser.version+1;
            await existingUser.update(user);
            next();
        }
        catch(err){
            if(err){
                console.log(err);
            }
            next(new ErrorHandler())
        }
    }
    else{
        next(new ErrorHandler('Unauthorized',401))
    }
}
module.exports=optimisticLocking;