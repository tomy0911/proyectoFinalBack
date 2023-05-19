import { productModel } from "../models/productModel.js";
import { baseDao } from "./baseDao.js";
import logger from "../utils/Log4jsLogger.js";

export class ProductService extends baseDao {
  ID_FIELD = "_id";

  static getInstance() {
    return new ProductService();
  }
  constructor() {
    if (typeof ProductService.instance === "object") {
      return ProductService.instance;
    }
    super();
    ProductService.instance = this;
    return this;
  }
  async create(obj) {
    try {
      return await productModel.create(obj);
    } catch (error) {
      logger.error("Hubo un error al crear el producto", error);
    }
  }
  async getAll() {
    try {
      return await productModel.find({});
    } catch (error) {
      logger.error("Hubo un error al mostrar la base de datos", error);
    }
  }
  async getById(id) {
    try {
      return await productModel.findOne({ [this.ID_FIELD]: id });
    } catch (error) {
      logger.error("Hubo un error al buscar el producto selecionado", error);
      return false;
    }
  }
  async getByCategory(category) {
    try {
      return await productModel.find({ category: { $eq: category } });
    } catch (error) {
      logger.error("Hubo un error al buscar la categoria selecionada", error);
      return false;
    }
  }
  async updateById(id, obj) {
    try {
      return await productModel.findByIdAndUpdate({ [this.ID_FIELD]: id }, obj);
    } catch (error) {
      logger.error("Hubo un error al modificar el producto", error);
      return false;
    }
  }
  async deleteById(id) {
    try {
      return await productModel.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (error) {
      logger.error("Hubo un error al borrar el producto", error);
      return false;
    }
  }
}
