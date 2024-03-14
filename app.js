const http = require("http");
const path = require("path");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const expressHbs = require("express-handlebars");

const { rootRouter } = require("./routes/index_router");
const { rootDir1, rootDir2 } = require("./utilities/path");
const { get404Page } = require("./controllers/error");

const port = process.env.PORT || 3000;
const app = express();

// app.engine(
//   "hbs",
//   expressHbs.engine({
//     extname: "Hbs",
//     partials: {
//       head: fs
//         .readFileSync(path.join(__dirname, "views", "includes", "head.hbs"))
//         .toString(),
//     },
//   })
// );
// app.set("view engine", "hbs");
app.set("view engine", "pug");
// app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(rootDir1, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", rootRouter); // change to /
app.use(get404Page);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// const server = http.createServer(app);
// server.listen(3000);
