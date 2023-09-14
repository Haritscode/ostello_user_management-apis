require("dotenv").config();
require('./config/db.config');
const express=require("express");
const cookieParser=require("cookie-parser");
const { verifyToken } = require("./src/middleware/token.middleware");
const app=express();
const port=process.env.PORT || 4001;
app.use(express.json());
app.use(cookieParser());
app.use('/api/users',require('./src/routes/user.routes'));
app.use(verifyToken)
app.use("*",(req,res)=>{
    res.status(404).json({msg:'Not found'})
})
app.use(require("./src/middleware/errorHandler.middleware"))
app.listen(port,()=>{
    console.log("Server created Successfully at port: ",port);
})