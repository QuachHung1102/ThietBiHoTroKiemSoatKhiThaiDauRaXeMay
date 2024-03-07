const fs = require("fs");
const path = require("path");
const { rootDir1, rootDir2 } = require("../utilities/path");

const pathP = path.join(rootDir1, "data", "userData.json");

const getUserFromFile = (cb) => {
  fs.readFile(pathP, (err, fileContent) => {
    if (err) {
      console.log(err);
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class User {
  constructor(id, userName, numberPhone, address, password) {
    this.id = id;
    this.userName = userName;
    this.numberPhone = numberPhone;
    this.address = address;
    this.password = password;
  }
  save() {
    getUserFromFile((userList) => {
      if (this.id) {
        const existingUserIndex = userList.findIndex(
          (user) => user.id === this.id
        );
        userList[existingUserIndex].numberPhone = this.numberPhone;
        fs.writeFile(pathP, JSON.stringify(userList), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Update success: ${this.userName}`);
          }
        });
      } else {
        this.id = (parseFloat(userList.at(-1).id) + 1).toString();
        userList.push(this);
        fs.writeFile(pathP, JSON.stringify(userList), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Write success: ${this.userName}`);
          }
        });
      }
    });
  }

  // getProductById
  static findById(id, cb) {
    getUserFromFile((userList) => {
      const user = userList.find((element) => element.id === id);
      cb(user);
    });
  }
  // getProductById
  static findByUserNam(userName, cb) {
    getUserFromFile((userList) => {
      const user = userList.find((element) => element.userName === userName);
      cb(user);
    });
  }
};
