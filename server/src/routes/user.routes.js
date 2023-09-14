const {Router}=require("express");
const createController = require("../controller/createuser.controller");
const { generateToken, verifyToken } = require("../middleware/token.middleware");
const getUsers=require("../controller/getusers.controller");
const getUserInfo = require("../controller/getUserInfo.controller");
const updateUser = require("../controller/updateUser.controller");
const deleteUser = require("../controller/deleteUser.controller");
const optimisticLocking = require("../middleware/optimisticLocking.middleware");
const routes=Router();
routes.route("/").post(createController,generateToken).get(getUsers)
routes.route("/:id").get(getUserInfo).put(verifyToken,optimisticLocking,updateUser).delete(verifyToken,deleteUser)
module.exports=routes;