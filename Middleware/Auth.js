const jwt = require('jsonwebtoken');
require('dotenv').config
const validateUserData = (req, res, next) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        if (name.length < 4) {
            return res.json({ error: "Name should be at least 4 characters" });
        }
        if (password.length < 8) {
            return res.json({ error: "Length of password is not enough" });
        }
        next();
    } catch (error) {
        return res.json({ error: "There are some error" });
    }
};
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const token = bearer[1];
      req.token = token;
      console.log(req.token);
      jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
          console.log(err);
          return res.json("invalid Token");
        } else {
          console.log(authData);
          next();
        }
      });
    } else {
      return res.send("Token is invalid");
    }
  };
  
module.exports = {validateUserData,verifyToken};