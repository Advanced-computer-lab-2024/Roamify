const jwt = require("jsonwebtoken");

const authenticateTourist = (req, res, next) => {
  const token = req.cookies?.token; // Get token from cookies
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET); 
    console.log("Decoded JWT:", verified);
    if (verified.role !== "tourist") {
      console.log(verified.role);
      return res.status(403).json({ message: "Only tourists can access this route." });
    }

    req.user = verified; // Store the decoded token payload in req.user
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
const authenticateAdvertiser = (req, res, next) => {
  const token = req.cookies?.token; // Get token from cookies
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET); 
    console.log("Decoded JWT:", verified);
    if (verified.role !== "advertiser") {
      console.log(verified.role);
      return res.status(403).json({ message: "Only advertisers can access this route." });
    }

    req.user = verified; // Store the decoded token payload in req.user
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {authenticateTourist,authenticateAdvertiser};

