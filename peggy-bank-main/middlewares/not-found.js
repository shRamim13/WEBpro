const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({ message: "route does not exist" });
};

export default notFoundMiddleware;
