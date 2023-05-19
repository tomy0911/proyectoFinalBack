import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema({
  name: { type: String, require: true, max: 100 },
  address: { type: String, require: true, max: 100 },
  userAvatar: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true, max: 100 },
});

usuarioSchema.methods.encrypt = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

usuarioSchema.methods.verify = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const userModel = mongoose.model("usuarios", usuarioSchema);
