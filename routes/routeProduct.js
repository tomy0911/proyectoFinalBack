import Router from "express";
import * as productControl from "../controllers/productControl.js";
import upload from "../middleware/multer/uploadImage.js";
import validToken from "../middleware/JWT/authJWT.js";
import auth from "../middleware/auth/auth.js";

const router = new Router();

router.get("/", productControl.getAll);

router.get("/:id", productControl.getById);

router.get("/category/:category", productControl.getByCategory);

router.post("/", upload.single("image"), auth, productControl.create);

router.put("/:id", auth, productControl.updateById);

router.delete("/:id", auth, productControl.deleteById);

export default router;
