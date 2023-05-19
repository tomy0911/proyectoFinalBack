import { sendMail } from "../middleware/notifications/emailSender.js";

export async function getLogin(req, res) {
  res.render("login");
}

export async function getErrorlogin(req, res) {
  res.render("errorLogin");
}

export async function getSignup(req, res) {
  res.render("signup");
}

export async function getSuccSign(req, res) {
  let [name, address, email] = [
    req.user.name,
    req.user.address,
    req.user.email,
  ];
  const newUser = { name, address, email };
  sendMail(newUser);
  res.render("succSign");
}

export async function getErrorSignup(req, res) {
  res.render("errorSignup");
}

export async function getLogout(req, res) {
  req.session.destroy((error) => {
    error
      ? res.json(error)
      : res.render("logout", { status: false, user: req.user.name });
  });
}
