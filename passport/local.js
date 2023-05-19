import passport from "passport";
import { Strategy } from "passport-local";
import { userModel } from "../models/userModel.js";
import { filePath } from "../utils/functions.js";

const localStrategy = Strategy;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userDB = await userModel.findOne({ email });
      if (userDB) {
        return done(null, false);
      }
      const newUser = new userModel();
      const { name, address, areaCode, phone } = req.body;
      const prefix = req.body.prefix;
      const userAvatar = filePath(req.file.filename);
      newUser.name = name;
      newUser.address = address;
      newUser.userAvatar = userAvatar;
      newUser.phone = prefix + areaCode + phone;
      newUser.email = email;
      newUser.password = newUser.encrypt(password);
      await newUser.save();
      return done(null, newUser);
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userDB = await userModel.findOne({ email });
      if (!userDB) {
        return done(null, false, { message: "El usuario no existe" });
      }
      const match = await userDB.verify(password);
      if (!match) {
        return done(null, false, { message: "El password es incorrecto" });
      }
      return done(null, userDB);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
