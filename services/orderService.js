import { orderModel } from "../models/orderModel.js";
import { baseDao } from "./baseDao.js";
import logger from "../utils/Log4jsLogger.js";

export class OrderService extends baseDao {
  ID_FIELD = "_id";

  static getInstance() {
    return new OrderService();
  }
  constructor() {
    if (typeof OrderService.instance === "object") {
      return OrderService.instance;
    }
    super();
    OrderService.instance = this;
    return this;
  }
  async create(obj1, obj2) {
    try {
      const arrayDeTotales = obj1.products.map((product) => {
        return product.qty * product.price;
      });
      const totalPrice = arrayDeTotales.reduce((a, b) => a + b);
      const dateOrder = new Date().toLocaleString();
      const name = obj2.name;
      const phone = obj2.phone;
      const { products, email, address } = obj1._doc;
      const cartContent = { products, email, address, name, phone };
      const newOrder = {
        ...cartContent,
        totalPrice,
        dateOrder,
        state: "generate",
      };
      return await orderModel.create(newOrder);
    } catch (error) {
      logger.error("Hubo un error al crear la orden", error);
    }
  }
  async getAll() {
    try {
      return await orderModel.find();
    } catch (error) {
      logger.error("Hubo un error al mostrar la base de datos", error);
    }
  }
  async getByEmail(email) {
    try {
      return await orderModel.find({ email: email });
    } catch (error) {
      logger.error("Hubo un error al mostrar la base de datos", error);
    }
  }
}
