import { ChatService } from "../services/chatService.js";
import { UserService } from "../services/userService.js";
import { sessionMiddleware, wrap } from "../middleware/session/session.js";
import logger from "./Log4jsLogger.js";

const chatService = ChatService.getInstance();
const userService = UserService.getInstance();

export default (io) => {
  io.use(wrap(sessionMiddleware));
  io.on("connection", async (socket) => {
    logger.info("Cliente conectado", socket.id);

    const mensajes = await chatService.getAll();
    socket.emit("messages", mensajes);

    socket.on("newMessage", async (message) => {
      const user_id = socket.request.session.passport.user;
      const user = await userService.getByTest(user_id);
      const email = user.email;
      message.email = email;
      await chatService.create(message);
      const mensajes = await chatService.getAll();
      io.sockets.emit("newMessages", mensajes);
    });
  });
};
