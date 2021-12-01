const JWT = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const secret = process.env.JWT_SECRET;

const verifyUser = (req, res, next) => {
  try {if(!req.headers.authorization) {
    res.status(400).json({error: 'No token'});
    return
  }
  const token = (req.headers.authorization.replace('Bearer ', '').replaceAll('"', ''));
  const decodedToken = JWT.verify(token, secret)
  res.locals.decodedToken = decodedToken;
  next()
  } catch(err) {
    res.status(401).json({ error: err.message });
  }
}
module.exports = verifyUser;
