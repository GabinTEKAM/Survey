const localStrategy = require("passport-local").Strategy;
const passport = require("passport");
const adminDao = require('./admin_dao')

// initialize and configure passport
passport.use(new localStrategy((username, password, done) => {
      // verification callback for authentication
    adminDao.getUser(username, password).then(user => {
      if (user){
          done(null, user);}
        else
          done(null, false, { message: 'Wrong username or password' });
      }).catch(err => {
        done(err);
      });
} )
)

// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.idAdmin);
  });
  

  // starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((idAdmin, done) => {
    adminDao.getUserById(idAdmin)
      .then(user => {
        done(null, user); // this will be available in req.user
      }).catch(err => {
        done(err, null);
      });
  });
  
module.exports = passport
  
  