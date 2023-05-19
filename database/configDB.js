import dotenv from "dotenv";
import mongoose from "mongoose";
import logger from "../utils/Log4jsLogger.js";

dotenv.config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.1vxmmjy.mongodb.net/${process.env.MONGO_DBASE}?retryWrites=true&w=majority`,
  (error) => {
    error
      ? logger.error("Error al conectarse con MongoDB Atlas")
      : logger.info("Conectado a MongoDB Atlas");
  }
);

export default mongoose;
