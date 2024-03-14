const path = require("path");
const fs = require("fs");
const { rootDir1, rootDir2 } = require("../utilities/path");

const User = require("../models/user_model");

const getLoginPage = async (req, res) => {
  res.status(200).render("authen/login", { pageTitle: "Đăng nhập" });
};

const getRegisterPage = async (req, res) => {
  res.status(200).render("authen/register", { pageTitle: "Đăng ký" });
};

const postAddUser = async (req, res) => {
  const { userName, numberPhone, address, password, deviceType } = req.body;
  try {
    const product = new User(null, userName, numberPhone, address, password);
    product.save();
    if (deviceType === "mobile") {
      res.status(302).send("Updated");
    } else if (deviceType === "web") {
      res.status(302).redirect("./login");
    }
  } catch (error) {
    res.status(404).send(`errrors: ${error.message}`);
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { userName, numberPhone, password, deviceType } = req.body;
  try {
    const updateUser = new User(id, userName, numberPhone, password);
    updateUser.save();
    if (deviceType === "mobile") {
      res.status(302).send("updated");
    } else if (deviceType === "web") {
      res.status(302).redirect("../");
    }
  } catch (error) {
    res.status(500).send(`error: ${error.message}`);
  }
  // userList = [...userList, user]; // bạn đang tạo ra một mảng mới (một tham chiếu mới) và gán nó lại vào userList.
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  postAddUser,
  updateUser,
};
