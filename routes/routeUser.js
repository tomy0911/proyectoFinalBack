import Router from "express";
import passport from "passport";
import * as userControl from "../controllers/userControl.js";
import upload from "../middleware/multer/uploadImage.js";
import genToken from "../middleware/JWT/genJWT.js";

const router = new Router();

router.get("/", userControl.getLogin);

router.post(
  "/",
  passport.authenticate("login", {
    failureRedirect: "errorLogin",
    successRedirect: "succSign",
    passReqToCallback: true,
  }) /* ,(req, res) => {
        const payload={id:req.user._id,email:req.user.email};
        const token=genToken(payload);    // COMO NO TIENE UN FRONTEND COMPLETO DEPENDERA DE COMO USAR EL TOKEN
        res.status(201).json({message: "Usuario Logueado con éxito",id: req.user._id,email: req.user.email,token});
} */
);

router.get("/errorlogin", userControl.getErrorlogin);

router.get("/signup", userControl.getSignup);

router.post(
  "/signup",
  upload.single("userAvatar"),
  passport.authenticate("signup", {
    failureRedirect: "errorSignup",
    successRedirect: "succSign",
    passReqToCallback: true,
  }) /* ,(req, res) => {
        const payload={id:req.user._id,email:req.user.email};
        const token=genToken(payload);   // COMO NO TIENE UN FRONTEND COMPLETO DEPENDERA DE COMO USAR EL TOKEN
        res.status(201).json({message: "Usuario registrado con éxito",id: req.user._id,email: req.user.email,token});
} */
);

router.get("/succSign", userControl.getSuccSign);

router.get("/errorSignup", userControl.getErrorSignup);

router.get("/logout", userControl.getLogout);

export default router;
