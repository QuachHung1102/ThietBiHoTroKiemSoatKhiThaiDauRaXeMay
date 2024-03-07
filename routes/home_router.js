const path = require("path");

const express = require("express");

const {
  getControlPage,
  updateEmission,
  getEmissionToRender,
} = require("../controllers/controll_controllers");

const { authenticate } = require("../middlewares/auth/authenticate");

const homeRouter = express.Router();
//TODO: add a redirect from "/" to "/controll"
homeRouter.get("/controll", getControlPage);
homeRouter.post("/controll/:id", authenticate, getControlPage);
homeRouter.post("/update-emission/:id", updateEmission);
homeRouter.get("/get-data-to-render/:id", getEmissionToRender);

module.exports = {
  homeRouter,
};
