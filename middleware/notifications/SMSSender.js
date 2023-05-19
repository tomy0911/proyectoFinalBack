import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";
import twilio from "twilio";
import { __dirname } from "../../views/dirpath.js";
import logger from "../../utils/Log4jsLogger.js";

dotenv.config();

export async function sendOrderSMS(order) {
  try {
    const twilioAccount = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    twilioAccount.messages.create({
      body: `
                Hola ${order.name} tu pedido sera enviado a ${order.address}
                    `,
      from: "+18787686333",
      to: `${order.phone}`,
    });
  } catch (error) {
    logger.error("Error al enviar el SMS de orden", error);
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
