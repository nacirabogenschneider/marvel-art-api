
const jtw = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jtw.verify(token, "2f8[{a]-d!(");
    req.user = decode;
    next();
  } catch (error) {}
};

module.exports = authenticate;