import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  email: { type: String },
  timestamp: { type: String },
  texto: { type: String },
});

export const chatModel = mongoose.model("mensajes", messageSchema);
