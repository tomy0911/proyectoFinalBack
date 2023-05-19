import session from "express-session";
import MongoStore from "connect-mongo";

export const sessionMiddleware = session({
  secret: "key",
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.1vxmmjy.mongodb.net/${process.env.MONGO_DBASE}?retryWrites=true&w=majority`,
  }),
  cookie: { maxAge: 600000 }, //10 min
});

export const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);
