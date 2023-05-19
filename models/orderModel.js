import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  products: [],
  name: { type: String, require: true },
  phone: { type: String, require: true },
  email: { type: String, require: true },
  address: { type: String, require: true },
  dateOrder: { type: String, require: true },
  totalPrice: { type: String, require: true },
  state: { type: String, default: "generated" },
});

export const orderModel = mongoose.model("ordenes", Schema);
