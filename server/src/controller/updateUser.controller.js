const ErrorHandler = require('../../config/customErrorHandler.config');
const userdb=require('../models/user.model');
const updateUser=(req,res,next)=>{
    const {id}=req.params;
    const {user}=req.body
    try{
        if(id==req.body.id && req.body.id===req.userInfo.id){
            userdb.update(user,{where:{id:req.body.id}}).then(result=>{
                if(result){
                    userdb.findOne({where:{id:req.body.id},attributes:['id','name','userName','email','version']}).then(result=>{
                        res.status(200).json({...result.dataValues});
                    }).
                    catch(err=>{
                        next(new ErrorHandler)
                    })
                }
            })
            .catch(err=>{
                next(new ErrorHandler())
            })
        }
        else{
            next(new ErrorHandler("Unauthorized",401))
        }
    }
    catch(err){
        next(new ErrorHandler())
    }
}
module.exports=updateUser;