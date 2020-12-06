const jwt = require("jsonwebtoken");

const getAccessToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESSTOKEN, {
    expiresIn: "10m",
  });
  return accessToken;
};

const getRefreshToken = (payload) => {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESHTOKEN, {
    expiresIn: "7d",
  });
  return refreshToken;
};

const requireAuth = (req, res, next) => {
  // let accessToken = req.headers["authorization"];
  // console.log(accessToken);
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ msg: "Access denied, require token!" });
  }
  token = token.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_ACCESSTOKEN);
    req.user = decode.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Access denied, invalid token!" });
  }
};

module.exports = { getAccessToken, getRefreshToken, requireAuth };
