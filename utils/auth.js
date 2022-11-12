// Helper function to check if user is signed in
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the homepage/login route
  if (!req.session.logged_in) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = withAuth;
