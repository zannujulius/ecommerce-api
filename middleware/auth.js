const jwt = require("jsonwebtoken");

module.exports = auth = (req, res, next) => {
  // taking the token from the request header
  const token = req.header("X-Auth-token");
  // if the request header doesnt have a token user cant access resource
  if (!token) return res.status(401).send({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.jwtSecret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ error: "Not authorized to access the resource" });
  }
};
