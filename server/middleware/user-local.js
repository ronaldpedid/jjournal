module.exports = function () {
  return function setUserOnLocalsMiddleware(req, res, next) {
    res.locals.user = req.user;
    console.log(req.user);
    next();
  }
};