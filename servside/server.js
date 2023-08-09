const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const connectDB = require("./config/data");
require("dotenv").config({ path: "./config/.env" });
require("./config/pas")(passport);
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const cookieParser = require('cookie-parser')
const path = require('path');

connectDB();

const app = express();
const PORT = process.env.PORT || 50000;

// Enable CORS for specific origins
const whitelist = ['http://localhost:3000', "https://notesappjj0-f1dac4eaa1a2.herokuapp.com", "http://localhost:50000"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, {
        origin: true,
        credentials: true,
      });
    } else {
      console.log("Origin rejected");
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.set('trust proxy', 1);

// Configure session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized:true,
    proxy: true,
    store: new MongoStore({ mongoUrl: process.env.db_string }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production, false otherwise
      maxAge: 3600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../client/my-app/build')));

// // Use home route handler


// // Use API routes conditionally

const apir = require("./routes/api");
app.use("/api", apir);

// // Catch-all route handler for serving React app
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname , '../client/my-app/build/index.html' ));
//   console.log(process.env.NODE_ENV)
//   console.log(req.session.id)
// });
app.use((req, res, next) => {
  if (req.path.startsWith('/')) {
    // Use API routes
    const homer = require("./routes/home");
    app.use("/", homer);
  } 
  
});

// Catch-all route handler for serving React app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname , '../client/my-app/build/index.html' ));
  console.log(process.env.NODE_ENV)
  console.log(req.path)
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})