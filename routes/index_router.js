const express = require("express");

const { authRouter } = require("./auth_router");
const { homeRouter } = require("./home_router");

const rootRouter = express.Router();

rootRouter.use("", authRouter);
rootRouter.use("", homeRouter);

module.exports = {
  rootRouter,
};
