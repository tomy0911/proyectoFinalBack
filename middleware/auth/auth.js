export default function auth(req, res, next) {
  const isAdmin = false;

  if (isAdmin === false) {
    res
      .status(404)
      .json({ error: "Funcion Habilitada solo para Administradores" });
  } else {
    next();
  }
}
