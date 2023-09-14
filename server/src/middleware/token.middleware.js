const jwt=require("jsonwebtoken");
require("dotenv").config();
const ErrorHandler=require("../../config/customErrorHandler.config");
const generateToken=(req,res,next)=>{
    try{
        const {email,id}=req.userInfo;
        const rtoken=jwt.sign({email,id},process.env.REFRESHTOKEN,{expiresIn:'30d'});
        const atoken=jwt.sign({email},process.env.ACCESSTOKEN,{expiresIn:'1h'});
        res.cookie('rtk',`Bearer ${rtoken}`,{maxAge:1000*60*60*24*30});
        res.cookie('atk',`Bearer ${atoken}`,{maxAge:1000*60*15});
        res.status(200).json({id:req.userInfo.id,email:req.userInfo.email,username:req.userInfo.userName,name:req.userInfo.name,version:req.userInfo.version})
    }
    catch(err){
        next(new ErrorHandler());
    }
}
const verifyToken=(req,res,next)=>{
    let {atk,rtk}=req.cookies
    atk=atk?.split(' ')[1];
    rtk=rtk?.split(' ')[1];
    if(atk && rtk){
        jwt.verify(rtk,process.env.REFRESHTOKEN,(err,decode)=>{
            if(err){
                res.cookie('rtk',"",{maxAge:0})
                res.cookie('atk',"",{maxAge:0})
                next(new ErrorHandler("unauthorized user",401))
            }
            else if(decode){
                jwt.verify(atk,process.env.ACCESSTOKEN,(err,decoded)=>{
                    if(err){
                        res.cookie('rtk',"",{maxAge:0})
                        res.cookie('atk',"",{maxAge:0})
                        next(new ErrorHandler("unauthorized user",401))
                    }
                    else{
                        if(decoded){
                            req.userInfo={id:decode.id,email:decoded.email}
                            next()
                        }
                    }
                })
            }
        })
    }
    else if(!atk && rtk){
        jwt.verify(rtk,process.env.REFRESHTOKEN,(err,decode)=>{
            if(err){
                res.cookie('rtk',"",{maxAge:0})
                res.cookie('atk',"",{maxAge:0})
                next(new ErrorHandler("unauthorized user",401))
            }
            else{
                if(decode){
                    const atoken=jwt.sign({email:decode.email},process.env.ACCESSTOKEN)
                    res.cookie('atk',`Bearer ${atoken}`,{maxAge:1000*60*15});
                    req.userInfo={id:decode.id,email:decode.email}
                    next();
                }
            }
        })
    }
    else if(!atk && !rtk){
        next(new ErrorHandler("unauthorized user",401))
    }
}
module.exports={generateToken,verifyToken}