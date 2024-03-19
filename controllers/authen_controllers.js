const path = require("path");
const fs = require("fs");
const { rootDir1, rootDir2 } = require("../utilities/path");

const User = require("../models/user_model");
const Emission = require("../models/emission_model");

const fakeData = [
  null,
  [0, 0],
  [
    "00:00",
    "00:00",
    "00:00",
    "00:00",
    "00:00",
    "00:00",
    "00:00",
    "00:00",
    "00:00",
    "00:00",
  ],
  [
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
  "0",
];

const getLoginPage = async (req, res) => {
  res.status(200).render("authen/login", { pageTitle: "Đăng nhập" });
};

const getRegisterPage = async (req, res) => {
  res.status(200).render("authen/register", { pageTitle: "Đăng ký" });
};

const postAddUser = async (req, res) => {
  const {
    userName,
    numberPhone,
    address,
    password,
    xacNhanMatKhau,
    deviceType,
  } = req.body;
  try {
    User.findByUserNam(userName, (user) => {
      if (user) {
        if (deviceType === "mobile") {
          res.status(409).send(`User đã tồn tại`);
        } else if (deviceType === "web") {
          res
            .status(409)
            .send(
              '<script>alert("User already exists!"); window.location.href = "/";</script>'
            );
        }
      } else {
        if (password === xacNhanMatKhau) {
          const product = new User(
            null,
            userName,
            numberPhone,
            address,
            password
          );
          const newEmis = new Emission(...fakeData);
          product.save();
          newEmis.save();
          Emission.saveLog({ id: null });
          if (deviceType === "mobile") {
            res.status(201).send("Created");
          } else if (deviceType === "web") {
            res.status(201).redirect("./");
          }
        } else {
          if (deviceType === "mobile") {
            res.status(409).send(`Mật khẩu xác nhận không khớp!`);
          } else if (deviceType === "web") {
            res
              .status(409)
              .send(
                '<script>alert("Mật khẩu xác nhận không khớp!"); window.location.href = "/";</script>'
              );
          }
        }
      }
    });
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
      res.status(201).send("Updated");
    } else if (deviceType === "web") {
      res.status(201).redirect("../");
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
