

module.exports = function middleTest(req, res, next) {
  somethingDarkSide(req, res, () => {
    console.log('Something something something dark side.');
    next();
  })
}

