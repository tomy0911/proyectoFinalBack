import { CartService } from "../services/cartService.js";
import { ProductService } from "../services/productService.js";

const cartService = CartService.getInstance();
const productService = ProductService.getInstance();

export async function createCart(req, res) {
  const { body } = req;
  const result = await cartService.createCart(body);
  result
    ? res.status(200).json({ success: "Carrito creado con ID " + result._id })
    : res.status(500).json({ error: "Error al crear el carrito" });
}

export async function deleteCart(req, res) {
  const { id } = req.params;
  const result = await cartService.deleteCart(id);
  result
    ? res.status(200).json({ success: "Carrito Borrado" })
    : res.status(400).json({ error: "ID Inexistente" });
}

export async function getProducts(req, res) {
  const { id } = req.params;
  const result = await cartService.getById(id);
  result
    ? res.status(200).json({ success: "Carrito Encontrado", result })
    : res.status(404).json({ error: "ID Carrito Inexistente" });
}

export async function addToCart(req, res) {
  const { id } = req.params;
  const { body } = req;
  const newProd = await productService.getById(body._id);
  if (newProd) {
    const result = await cartService.addToCart(id, newProd);
    result !== null
      ? res.status(200).json({ success: "Producto Agregado" })
      : res.status(400).json({ error: "Carrito no encontrado ID Inexistente" });
  } else {
    res.status(400).json({ error: "ID Ingresado Inexistente" });
  }
}

export async function delFromCart(req, res) {
  const { id, id_prod } = req.params;
  const exists = await cartService.getById(id);
  if (exists) {
    const result = await cartService.deleteById(id, id_prod);
    result
      ? res.status(200).json({ success: "Producto Borrado" })
      : res.status(404).json({ error: "ID Producto Inexistente" });
  } else {
    res.status(404).json({ error: "ID Carrito Inexistente" });
  }
}
