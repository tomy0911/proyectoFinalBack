import express from "express";
import passport from "passport";
import routeProduct from "./routes/routeProduct.js";
import routeCart from "./routes/routeCart.js";
import routeOrder from "./routes/routeOrder.js";
import routeChat from "./routes/routeChat.js";
import routeUser from "./routes/routeUser.js";
import { Server as ioServer } from "socket.io";
import http from "http";
import websockets from "./utils/websockets.js";
import "./database/configDB.js";
import "dotenv/config";
import "./passport/local.js";
import cors from "cors";
import path from "path";
import { sessionMiddleware } from "./middleware/session/session.js";
import logger from "./utils/Log4jsLogger.js";

const __dirname = path.resolve();

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
  })
);
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", routeProduct);
app.use("/api/cart", routeCart);
app.use("/api/order", routeOrder);
app.use("/api/chat", routeChat);
app.use("/", routeUser);

const httpServer = http.createServer(app);
const io = new ioServer(httpServer);

websockets(io);

const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () =>
  logger.info(`Servidor iniciado en el puerto ${PORT}`)
);
server.on("error", (error) => logger.error(error));
