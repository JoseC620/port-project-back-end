const checkProductName = (req, res, next) => {
    if (req.body.name) {
      next()
    } else {
      res.status(400).json({ error: "Name is required" });
    }
  };
  

  module.exports = { checkProductName };