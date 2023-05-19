import { ChatService } from "../services/chatService.js";
import { UserService } from "../services/userService.js";

const chatService = ChatService.getInstance();
const userService = UserService.getInstance();

export async function getAll(req, res) {
  const user = req.session.passport;
  if (user) {
    const persona = req.user.name;
    res.render("chat", { persona });
  } else {
    req.session.login = false;
    res.redirect("/");
  }
}

export async function getByEmail(req, res) {
  const { email } = req.params;
  const user = await userService.getById(email);
  if (user) {
    const result = await chatService.getByEmail(email);
    res.render("chatUser", { msj: result });
  } else {
    res.status(400).json({ error: "Usuario Inexistente" });
  }
}
