import "dotenv/config";
import nodemailer from "nodemailer";

const { MAIL_USERNAME, MAIL_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  type: "LOGIN",
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

function sendMail(message) {
  return transport.sendMail(message);
}

export default { sendMail };
