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
const cookieParser = require('cookie-parser')
const path = require('path'); 
connectDB();
const PORT = process.env.PORT || 50000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors());
const whitelist = ['http://localhost:3000'," https://notesapp-505-app-eacf6219a989.herokuapp.com","http://localhost:50000"]
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.use(cookieParser());
// app.set('trust proxy', 1);


// Configure session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    // proxy: true,
    store: new MongoStore({ mongoUrl: process.env.db_string }),
    cookie: {
      secure: true,
      maxAge: 3600000,
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/my-app/build')));

// app.use(bodyParser.json());

app.use(flash());

app.use("/", homer);
app.use("/api", apir);
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname , "../client/my-app/build" ));
});
// if (process.env.NODE_ENV === "production") {
//   // app.use(express.static(path.join(__dirname, "../client/my-app/build")));
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname , "../client/my-app/build" ));
//   });
// }

app.listen(PORT, () => {
  console.log(`its running ${PORT}`);
});
