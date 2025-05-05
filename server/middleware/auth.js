import pkg from "jsonwebtoken";
const { verify } = pkg;

export default function auth(req, res, next) {
  try {
    console.log("Auth middleware");

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No token provided");
      return res.status(403).json({ message: "Token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = verify(token, process.env.JWT_KEY);

    req.user = decodedToken; // Now available in any protected route

    next();

  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(403).json({ message: "Unauthorized - Invalid or expired token" });
  }
}
