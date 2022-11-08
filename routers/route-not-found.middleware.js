function routeNotFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: "The route you're looking for could not be found",
  });
}

module.exports = { routeNotFound };
