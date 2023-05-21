const User = require('../modal/userModal.js');
const jwt = require('jsonwebtoken');



const isAuthenticated = async (req, res, next) => {

  const { token } = req.headers;

  if (!token) return res.status(401).send("Please Login First");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded) {
    return res.status(500).send("Internal server error")
  }
  req.user = await User.findById(decoded.userID);


  next();
}


module.exports = isAuthenticated;