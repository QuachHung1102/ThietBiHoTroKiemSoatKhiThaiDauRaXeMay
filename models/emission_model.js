const fs = require("fs");
const path = require("path");
const { rootDir1, rootDir2 } = require("../utilities/path");

const pathP = path.join(rootDir1, "data", "emissionsData.json");

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

  static findById(id, cb) {
    getEmissionsFromFile((emissionList) => {
      const emission = emissionList.find((element) => element.id === id);
      cb(emission);
    });
  }
};

module.exports = Emission;

/**
this.labels = ["00:00", "00:10", "00:20", "00:30", "00:40", "00:50"];
    this.emissions = [
      {
        emissonId: "1",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "2",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "3",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "4",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "5",
        data: [0, 22, 23, 62, 51, 30],
      },
      {
        emissonId: "6",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "7",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "8",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "9",
        data: [0, 0, 0, 0, 0, 0],
      },
      {
        emissonId: "10",
        data: [0, 0, 0, 0, 0, 0],
      },
    ];
 */
