const sequelize=require("../../config/db.config");
const {DataTypes}=require("sequelize");
const userdb=sequelize.define('user',{
    name:{
      type:DataTypes.STRING,
      allowNull:false  
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true

    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    version: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
})
userdb.sync().then(()=>{
    console.log('User table created Successfully')
}).catch((err)=>{
    console.error("unable to create a user table: ",err)
})
module.exports=userdb