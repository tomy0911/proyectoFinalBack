import mongoose from "mongoose";
import { cartModel } from "../models/cartModel.js";
import logger from "../utils/Log4jsLogger.js";
import { baseDao } from "./baseDao.js";

export class CartService extends baseDao {
  ID_FIELD = "_id";

  static getInstance() {
    return new CartService();
  }

  constructor() {
    if (typeof CartService.instance === "object") {
      return CartService.instance;
    }
    super();
    CartService.instance = this;
    return this;
  }

  async existsCart(id) {
    try {
      const result = await cartModel.findOne({ [this.ID_FIELD]: id });
      return result;
    } catch (error) {
      logger.error("Hubo un error al buscar el carrito", error);
      return null;
    }
  }
  async createCart(body) {
    try {
      const cart = { ...body };
      return await cartModel.create(cart);
    } catch (error) {
      logger.error("Hubo un error al crear el carrito", error);
      return null;
    }
  }
  async deleteCart(id) {
    try {
      return await cartModel.findByIdAndDelete({ [this.ID_FIELD]: id });
    } catch (error) {
      logger.error("Hubo un error al borrar el carrito", error);
      return null;
    }
  }
  async addToCart(id, obj) {
    try {
      const cartExists = await this.existsCart(id);
      const newId = obj._id.toString();
      if (cartExists !== null) {
        let existsProd = await cartModel.findOne({
          [this.ID_FIELD]: id,
          "products._id": obj._id,
        });
        if (existsProd !== null) {
          let locate = existsProd.products.find((i) => i._id == newId);
          locate.qty++;
          const res = await cartModel.updateOne(
            { [this.ID_FIELD]: id, "products._id": obj._id },
            { $set: { "products.$": locate } }
          );
          return res;
        } else {
          await cartModel.updateOne(
            { [this.ID_FIELD]: id },
            { $push: { products: obj } }
          );
          let existsProd = await cartModel.findOne({
            [this.ID_FIELD]: id,
            "products._id": obj._id,
          });
          let locate = existsProd.products.find((i) => i._id == newId);
          locate.qty = 1;
          const final = await cartModel.updateOne(
            { [this.ID_FIELD]: id, "products._id": obj._id },
            { $set: { "products.$": locate } }
          );
          return final;
        }
      } else {
        return null;
      }
    } catch (error) {
      logger.error("Hubo un error al guardar el producto seleccionado", error);
      return null;
    }
  }
  async getById(id) {
    try {
      return await cartModel
        .findById(id)
        .populate("products")
        .select({ products: 1, _id: 0 });
    } catch (error) {
      logger.error("Hubo un error al buscar el carrito seleccionado", error);
      return null;
    }
  }
  async deleteById(id, id_prod) {
    try {
      let exists = await cartModel.findById({
        [this.ID_FIELD]: id,
        "products._id": id_prod,
      });
      const locate = exists.products.find((x) => x._id == id_prod);
      if (locate) {
        if (exists.products[0].qty > 1) {
          exists.products[0].qty--;
          const res = await cartModel.updateOne(
            {
              [this.ID_FIELD]: id,
              "products._id": mongoose.Types.ObjectId(id_prod),
            },
            { $set: { "products.$.qty": exists.products[0].qty } }
          );
          return res;
        } else {
          let res = await cartModel.updateOne(
            { [this.ID_FIELD]: id },
            {
              $pull: {
                products: { [this.ID_FIELD]: mongoose.Types.ObjectId(id_prod) },
              },
            }
          );
          return res;
        }
      } else {
        return null;
      }
    } catch (error) {
      logger.error("Hubo un error al borrar el articulo seleccionado", error);
      return null;
    }
  }
}
