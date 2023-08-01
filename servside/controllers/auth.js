const passport = require("passport");
// const users = require('../module/users')
// const validator = require('validator')
const User = require("../module/users");
exports.getLogin = (req, res, next) => {
  if (req.user) {
    res.json({ success: false });
    next();
  } else {
    res.json({ sucess: true });
  }
};

exports.postLogin = (req, res, next) => {

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ success: false, err: " Invalid email or password " });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
     console.log("Success! You are logged in.",user)
      return res.json({ success: true, msg: "Success! You are logged in." });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }
  });
  return res.json({ success: true, msg: "Logout successful." });
};
exports.getSignup = (req, res) => {
  if (req.user) {
    res.json({ success: false });
    // next()
  } else {
    res.json({ sucess: true });
  }
};

exports.postSignup = (req, res, next) => {
  const user = new User({
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  User.findOne({
    $or: [{ email: req.body.email }, { userName: req.body.username }],
  })
    .then((existingUser) => {
      if (existingUser) {
        return res.json({
          success: false,
          msg: " An account with that email or username already exists.",
        });
      }

      user
        .save()
        .then(() => {
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            req.session.loggedIn = true;
            req.session.cookie.maxAge = 60000;
            res.json({ success: true });
          });
        })
        .catch((err) => {
          return next(err);
        });
    })
    .catch((err) => {
      return next(err);
    });
};
