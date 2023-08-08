const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../module/users')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email',passwordField:"password" }, (email, password, done) => {
    User.findOne({ email: email }) 
     .then((user)=>{
      if(!user){ return done(null,false) }
      
      
      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          console.log("pass is right")
          return done(null, user)
        }
        
        return done(null, false)
       
      })
    // }
   
    })
  }))
  

  passport.serializeUser((user, done) => {
    
    done(null, user.id)
    
  })
  passport.deserializeUser(async (id, done) => {
    try {
      console.log("Deserializing user with his id:", id);
      const user = await User.findById(id);
      if (!user) {
        console.log("User not found");
        return done(null, false);
      }
      console.log("User found:", user);
      done(null, user);
    } catch (err) {
      console.error("Error deserializing user:", err);
      done(err, null);
    }
  });
  
  
  
  
  
  
  
  
  
  

//  passport.deserializeUser((id, done) => {
//   User.findById(id)
//   .then((user) => done(null, user))
//   .catch((err) => done(err, null));
//   })
}