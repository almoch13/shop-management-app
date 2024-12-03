import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer", "");

  if (!token)
    return res.status(401).json({ message: "Authorization token is required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;