import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function validToken(req, res, next) {
  const token = req.headers["Authorization"] || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "No hay token" });
  } else {
    try {
      const auth = token.split(" ")[1];
      const decodeToken = jwt.verify(auth, process.env.PRIVATE_KEY_JWT);
      next();
    } catch (error) {
      res.status(400).json({ error: "Token no valido" });
    }
  }
}
