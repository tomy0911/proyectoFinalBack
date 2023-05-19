import { userModel } from "../models/userModel.js";
import { baseDao } from "./baseDao.js";
import logger from "../utils/Log4jsLogger.js";

export class UserService extends baseDao {
  ID_FIELD = "_id";

  static getInstance() {
    return new UserService();
  }
  constructor() {
    if (typeof UserService.instance === "object") {
      return UserService.instance;
    }
    super();
    UserService.instance = this;
    return this;
  }
  async create(obj) {
    try {
      return await userModel.create(obj);
    } catch (error) {
      logger.error("Hubo un error al crear el usuario", error);
    }
  }
  async getById(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      logger.error("Hubo un error al buscar el usuario selecionado", error);
      return false;
    }
  }
  async getByTest(id) {
    try {
      return await userModel.findOne({ [this.ID_FIELD]: id });
    } catch (error) {
      logger.error("Hubo un error al buscar el usuario selecionado", error);
      return false;
    }
  }
}
