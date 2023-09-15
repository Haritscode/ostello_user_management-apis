const ErrorHandler = require('../../config/customErrorHandler.config')
const userdb=require('../models/user.model')
const getUsers=(req,res,next)=>{
    try{
        userdb.findAll({attributes:['email','userName','name','id']}).then(result=>{
            if(result){
                const data=[]
                result.map((user)=>{
                    data.push({...user.dataValues});
                })
                res.status(200).json(data)
            }
            else{
                res.status(200).send([])
            }
        }).catch(err=>{
            next(new ErrorHandler());
        })
    }
    catch(err){
        next(new ErrorHandler());
    }
}
module.exports=getUsers;