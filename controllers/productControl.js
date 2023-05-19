import { ProductService } from "../services/productService.js";

const productService = ProductService.getInstance();

export async function getAll(req, res) {
  try {
    const products = await productService.getAll();
    products
      ? res.status(200).json({ success: "Listado de productos", products })
      : res.status(400).json({ error: "Falla de la base de datos" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  const result = await productService.getById(id);
  result
    ? res.status(200).json({ success: "Producto encontrado", result })
    : res.status(400).json({ error: "Id Inexistente" });
}

export async function getByCategory(req, res) {
  const { category } = req.params;
  const result = await productService.getByCategory(category);
  result
    ? res.status(200).json({ success: "Categoria encontrada", result })
    : res.status(400).json({ error: "Id Inexistente" });
}

export async function create(req, res) {
  const newProd = req.body;
  const property = [
    "title",
    "description",
    "image",
    "price",
    "stock",
    "category",
  ];
  const verify = property.every((prop) => newProd.hasOwnProperty(prop));
  if (verify) {
    const result = await productService.create(newProd);
    res.status(200).json({ success: "Producto agregado con id " + result._id });
  } else {
    res.status(400).json({ error: "Campos Incompletos" });
  }
}

export async function updateById(req, res) {
  const { id } = req.params;
  const body = req.body;
  const property = [
    "title",
    "description",
    "image",
    "price",
    "stock",
    "category",
  ];
  const verify = property.every((prop) => body.hasOwnProperty(prop));
  if (verify) {
    const result = await productService.updateById(id, body);
    result
      ? res.status(200).json({ success: "Producto Actualizado" })
      : res.status(400).json({ error: "ID Inexistente" });
  } else {
    res.status(400).json({ error: "Campos Incompletos" });
  }
}

export async function deleteById(req, res) {
  const { id } = req.params;
  const result = await productService.deleteById(id);
  result
    ? res.status(200).json({ success: "Producto Borrado" })
    : res.status(400).json({ error: "ID Inexistente" });
}

export async function test(req, res) {
  const { result } = req.user;
  result
    ? res.status(200).json({ result })
    : res.status(400).json({ error: "ID Inexistente" });
}
