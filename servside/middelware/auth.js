
module.exports = {
  ensureAuth: function (req, res, next) {
    
    if (req.isAuthenticated()) {
      console.log("right")
      return next();
    } else {
      res.status(401).json({ success: false, msg: 'Unauthorized' });
    }
  }
};