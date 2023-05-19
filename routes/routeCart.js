import Router from "express";
import * as cartControl from "../controllers/cartControl.js";
import validToken from "../middleware/JWT/authJWT.js";
import auth from "../middleware/auth/auth.js";

const router = new Router();

router.post("/", cartControl.createCart);

router.delete("/:id", cartControl.deleteCart);

router.post("/:id/product", cartControl.addToCart);

router.get("/:id/product", cartControl.getProducts);

router.delete("/:id/product/:id_prod", cartControl.delFromCart);

export default router;
