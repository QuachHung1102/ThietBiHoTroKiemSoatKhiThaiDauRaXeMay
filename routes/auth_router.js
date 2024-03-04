const path = require("path");

const express = require("express");

const {
  getLoginPage,
  getRegisterPage,
  postAddUser,
  updateUser,
} = require("../controllers/authen_controllers");

const authRouter = express.Router();

authRouter.get("/login", getLoginPage);
authRouter.get("/register", getRegisterPage);
authRouter.post("/addUser", postAddUser);
authRouter.post("/update-user/:id", updateUser);

module.exports = {
  authRouter,
};
