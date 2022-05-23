const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_KEY, { expiresIn: "4h" }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, dataToken) => {
      if (err) reject(err);
      else resolve(dataToken);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
