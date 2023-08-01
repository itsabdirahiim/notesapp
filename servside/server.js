const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const connectDB = require("./config/data");
require("dotenv").config({ path: "./config/.env" });
require("./config/pas")(passport);
const bodyParser = require("body-parser");
var cors = require("cors");
const homer = require("./routes/home");
const apir = require("./routes/api");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");

connectDB();
const PORT = process.env.PORT || 50000;

app.use(cors());


app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.db_string }),
    cookie: {
      maxAge: 86400000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use(flash());

app.use("/", homer);
app.use("/api", apir);

app.listen(PORT, () => {
  console.log(`its running ${PORT}`);
});
