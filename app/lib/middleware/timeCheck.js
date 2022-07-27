module.exports = {
  validTime: (req, res, next) => {
    const { scheduled_time } = req.body,
      split = scheduled_time.split(":"),
      str = split[1].match(/\d/g),
      value = parseInt(str.join(""));

    if (value === 0) {
      return next();
    } else if (value % 15 === 0) {
      return next();
    } else {
      return next(new Error("Only 15 min interval allowed"));
    }
  },
};
