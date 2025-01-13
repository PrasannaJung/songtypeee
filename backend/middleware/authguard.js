const jwt = require("jsonwebtoken");

const authGuard = (req, res, next) => {
  console.log(req.headers);

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      success: false,
      message: "Authorization header not found",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is missing",
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUser;
    next();
  } catch (e) {
    console.log(e);
    return res
      .status(400)
      .json({ success: false, message: "Not authenticated" });
  }
};

const adminGuard = (req, res, next) => {
  console.log(req.user)
  if (req.user.role==="Admin") {
    next();
  } else {
    return res.status(400).json({
      success: false,
      message: "You are not authorized to access this resource",
    });
  }
};

module.exports = {
  authGuard,
  adminGuard,
};