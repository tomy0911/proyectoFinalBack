import Router from "express";
import * as orderControl from "../controllers/orderControl.js";
import validToken from "../middleware/JWT/authJWT.js";
import auth from "../middleware/auth/auth.js";

const router = new Router();

router.post("/:id", orderControl.create);

router.get("/", orderControl.getAll);

router.get("/:email", orderControl.getByEmail);

export default router;
