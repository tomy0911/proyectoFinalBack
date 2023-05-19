import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  products: [],
  email: { type: String, require: true },
  address: { type: String, require: true },
});

export const cartModel = mongoose.model("carritos", Schema);
