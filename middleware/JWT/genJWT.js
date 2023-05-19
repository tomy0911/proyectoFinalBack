import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function genToken(payload) {
  return jwt.sign(payload, process.env.PRIVATE_KEY_JWT, { expiresIn: "1h" });
}
