import Router from "express";
import * as chatControl from "../controllers/chatControl.js";
import validToken from "../middleware/JWT/authJWT.js";
import auth from "../middleware/auth/auth.js";

const router = new Router();

router.get("/", chatControl.getAll);

router.get("/:email", chatControl.getByEmail);

export default router;
