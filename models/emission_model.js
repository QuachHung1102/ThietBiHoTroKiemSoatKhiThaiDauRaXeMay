const fs = require("fs");
const path = require("path");
const { rootDir1, rootDir2 } = require("../utilities/path");

const pathP = path.join(rootDir1, "data", "emissionsData.json");
const pathP1 = path.join(rootDir1, "data", "emissonsLogSave.json");

const getEmissionsFromFile = (cb) => {
  fs.readFile(pathP, (err, fileContent) => {
    if (err) {
      console.log(err);
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const getEmissionsLogFromFile = (cb) => {
  fs.readFile(pathP1, (err, fileContent) => {
    if (err) {
      console.log(err);
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const Emission = class {
  constructor(id, location, labels, emissions) {
    this.id = id;
    this.location = location;
    this.labels = labels;
    this.emissions = emissions;
  }

  save() {
    getEmissionsFromFile((emissionList) => {
      const flag = emissionList.findIndex((emission) => emission.id == this.id);
      console.log(flag);
      if (flag !== -1) {
        emissionList[flag] = this;
        fs.writeFile(pathP, JSON.stringify(emissionList), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Update success emission: ${this.id}`);
          }
        });
      } else {
        // this.id = (parseFloat(emissionList.at(-1).id) + 1).toString();
        emissionList.push(this);
        fs.writeFile(pathP, JSON.stringify(emissionList), (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`Write success emission: ${this.id}`);
          }
        });
      }
    });
  }

  static saveLog(id, timeLabel, emissiondt) {
    getEmissionsLogFromFile((emissionLogList) => {
      console.log(`Đây là update`);
      const foundItemIndex = emissionLogList.findIndex(
        (item) => item.id === id
      );
      if (foundItemIndex !== -1) {
        // Đối tượng đã tồn tại, cập nhật dữ liệu emission mới
        // emissionLogList[foundItemIndex].emissionsData[timeLabel] = emissiondt;
        const newObj = {
          [timeLabel]: emissiondt,
        };
        let updateEmission = emissionLogList[foundItemIndex].emissionsData;
        updateEmission = { ...updateEmission, ...newObj };
        emissionLogList[foundItemIndex].emissionsData = updateEmission;
      } else {
        console.log(`Đối tượng cần update không tồn tại`);
      }
      // Lưu lại dữ liệu vào file JSON
      // fs.writeFile(pathP1, JSON.stringify(emissionLogList), (err) => {
      //   if (err) {
      //     console.log("Lỗi khi ghi file:", err);
      //   } else {
      //     console.log(`Dữ liệu đã được cập nhật thành công.`);
      //   }
      // });
      fs.writeFileSync(pathP1, JSON.stringify(emissionLogList));
    });
  }

  static findById(id, cb) {
    getEmissionsFromFile((emissionList) => {
      const emission = emissionList.find((element) => element.id === id);
      cb(emission);
    });
  }
};

module.exports = Emission;
