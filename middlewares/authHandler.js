//middleware to give access to routes only if the user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Not Authorized.");
    res.redirect("/login");
  };
  
  module.exports = isAuthenticated;
  