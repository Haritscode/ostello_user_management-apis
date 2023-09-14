const ErrorHandler = require("../../config/customErrorHandler.config");
const userdb=require("../models/user.model");
const deleteUser=(req,res,next)=>{
    try{
        if(req.params.id==req.userInfo.id){
            userdb.destroy({where:{id:req.params.id}}).then(()=>{
                res.status(200).json({msg:"success"})
            }).
            catch(err=>{
                next(new ErrorHandler())
            })
        }
    }
    catch(err){
        next(new ErrorEvent())
    }
}
module.exports=deleteUser;