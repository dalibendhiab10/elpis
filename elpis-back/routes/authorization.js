var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = async (req, res, next) => {
  try {
    var token = req.headers.authorization;

    if (!token) return res.status(400).send({ result: "access denied !!!" });

    const user = jwt.decode(token, { comlete: true });
    const userRole = user.userRole;
    const JWT_KEY = process.env.JWT_KEY;
    if (token) {
      try {
        jwt.verify(token, JWT_KEY);
        next();
      } catch (err) {
        return res.send({ error: err.message }).status(500);
      }
    }
  } catch {
    return res.status(403).send({ result: "access denied !!!" });
  }
};
