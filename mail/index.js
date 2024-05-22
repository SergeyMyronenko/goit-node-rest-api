import "dotenv/config";
import nodemailer from "nodemailer";

const { MAIL_USERNAME, MAIL_PASSWORD } = process.env;

console.log(MAIL_USERNAME);
console.log(MAIL_PASSWORD);

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  type: "LOGIN",
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

const message = {
  to: "mironych1987@gmail.com",
  from: "mironych1987@gmail.com",
  subject: "Learn backend it easy",
  html: "<h1>Hello on Goit courses</h1>",
  text: "Hello on Goit courses",
};

transport.sendMail(message).then(console.log).catch(console.error);
