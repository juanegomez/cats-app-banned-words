const passport = require("passport"); // For handling authentication
const Strategy = require("passport-local"); // For handling email/password based logging in
const User = require("../models/userModel"); //Get user database model

passport.use(
  new Strategy(
    {
      // define the parameter in req.body that passport can use as email and password
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Match email User
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "Not User found." });
      }

      // Match Password's User
      const isMatch = await user.matchPassword(password);
      if (!isMatch)
        return done(null, false, { message: "Incorrect Password." });

      return done(null, user);
    }
  )
);

// Create the user stored inside the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retreive the user stored inside the cookie
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
