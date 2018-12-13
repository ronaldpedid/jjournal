module.exports = function healthCheck() {
  return (req, res, next) => {
    if (req.path === '/health') {
      res.status(204);
    } else {
      next();
    }
  };
}