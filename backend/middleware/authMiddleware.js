const jwt = require("jsonwebtoken");


const authenticate = (allowedRoles = []) => (req, res, next) => {
  const token = req.cookies?.token; // Get token from cookies
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET); // Verify token
    console.log("Decoded JWT:", verified);

    // Check if user's role is among the allowed roles
    if (allowedRoles.length > 0 && !allowedRoles.includes(verified.role)) {
      return res.status(403).json({ message: `Access restricted to: ${allowedRoles.join(", ")} only.` });
    }

    req.user = verified; // Store decoded token payload in req.user
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
