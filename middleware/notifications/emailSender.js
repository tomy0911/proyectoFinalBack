import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import { __dirname } from "../../views/dirpath.js";
import logger from "../../utils/Log4jsLogger.js";

dotenv.config();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

export async function sendMail(newUser) {
  try {
    await transporter.sendMail({
      from: "System Notification <system@mail.com>",
      to: process.env.ADMIN_MAIL,
      subject: "Nuevo Usuario Signup",
      html: `
                <h1>Aviso de registro</h1>
                <h3>Datos del nuevo usuario</h3>
                <p>Nombre: ${newUser.name}</p>
                <p>Direccion: ${newUser.address}</p>
                <p>E-mail: ${newUser.email}</p>
                `,
    });
  } catch (error) {
    logger.error("Error al enviar el mail de registro", error);
  }
}

export async function sendOrderMail(order) {
  try {
    const data = await ejs.renderFile(__dirname + "/orderEmail.ejs", { order });
    await transporter.sendMail({
      from: "Coder Shop <system@mail.com>",
      to: order.email,
      subject: "Orden de Compra",
      html: data,
    });
  } catch (error) {
    logger.error("Error al enviar el mail de registro", error);
  }
}
