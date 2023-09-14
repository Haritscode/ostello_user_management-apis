const userdb = require("../models/user.model");
const { Op } = require("sequelize");
const ErrorHandler = require("../../config/customErrorHandler.config");
const createController = (req, res, next) => {
  try {
    const { name, userName, email, password } = req.body;
    if (userName.length > 0 || email.length > 0 || password.length > 0) {
      userdb
        .findOne({
          where: { [Op.or]: [{ email: email }, { userName: userName }] },
        })
        .then((result) => {
          if (result === null) {
            if (userName.length === 0) {
              next(new ErrorHandler("username should not be empty", 400));
            } else if (email.length === 0) {
              next(new ErrorHandler("email should not be empty", 400));
            } else if (
              !email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
            ) {
              next(new ErrorHandler("invalid email", 400));
            } else if (password.length === 0) {
              next(new ErrorHandler("password should not be empty", 400));
            } else {
              userdb
                .create({ name, userName, email, password })
                .then((result) => {
                  req.userInfo={...result.dataValues}
                  next();
                })
                .catch((err) => {
                  next(new ErrorHandler());
                });
            }
          } else if(email===result.email){
            next(new ErrorHandler("email already exist",409));
        }
        else if(userName===result.userName){
            next(new ErrorHandler("userName already exist",409));
        }
        })
        .catch((err) => {
          next(new ErrorHandler());
        });
    }
  } catch (err) {
    next(new ErrorHandler());
  }
};
module.exports = createController;
