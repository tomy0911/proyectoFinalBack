import { CartService } from "../services/cartService.js";
import { OrderService } from "../services/orderService.js";
import { UserService } from "../services/userService.js";
import { sendOrderMail } from "../middleware/notifications/emailSender.js";
import { sendOrderSMS } from "../middleware/notifications/SMSSender.js";

const cartService = CartService.getInstance();
const orderService = OrderService.getInstance();
const userService = UserService.getInstance();

export async function create(req, res) {
  const { id } = req.params;
  const cartExists = await cartService.existsCart(id);
  const user = await userService.getById(cartExists.email);
  const order = await orderService.create(cartExists, user);
  sendOrderSMS(order);
  sendOrderMail(order);
  order
    ? res.status(200).json({ success: "Orden Generada", order })
    : res.status(400).json({ error: "Falla de la base de datos" });
}

export async function getAll(req, res) {
  const result = await orderService.getAll();
  result
    ? res.status(200).json({ success: "Lista de ordenes", result })
    : res.status(400).json({ error: "Falla de la base de datos" });
}

export async function getByEmail(req, res) {
  const { email } = req.params;
  const user = await userService.getById(email);
  if (user) {
    const result = await orderService.getByEmail(email);
    res.status(200).json({ success: "Lista de ordenes", result });
  } else {
    res.status(400).json({ error: "Usuario Inexistente" });
  }
}
