import { chatModel } from "../models/chatModel.js";
import { baseDao } from "./baseDao.js";
import logger from "../utils/Log4jsLogger.js";

export class ChatService extends baseDao {
  ID_FIELD = "_id";

  static getInstance() {
    return new ChatService();
  }
  constructor() {
    if (typeof ChatService.instance === "object") {
      return ChatService.instance;
    }
    super();
    ChatService.instance = this;
    return this;
  }
  async create(obj) {
    try {
      return await chatModel.create(obj);
    } catch (error) {
      logger.error("Hubo un error al crear el mensaje", error);
      return false;
    }
  }
  async getAll() {
    try {
      return await chatModel.find({});
    } catch (error) {
      logger.error("Hubo un error al mostrar los mensajes", error);
      return false;
    }
  }
  async getByEmail(email) {
    try {
      return await chatModel.find({ email: { $eq: email } });
    } catch (error) {
      logger.error(
        "Hubo un error al buscar los mensajes correspondientes",
        error
      );
      return false;
    }
  }
}
