"use strict";

const FROM_EMAIL = process.env.NUXT_ENV_FROM_EMAIL;
const FROM_PASSWORD = process.env.NUXT_ENV_FROM_PASSWORD;
const TO_EMAIL = process.env.NUXT_ENV_TO_EMAIL;

const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());
app.post("/", (req, res) => {
  const { name, email, text } = req.body;

  console.log("req body", req.body);

  sendMail({ name, email, text });
  res.status(200).json({ message: "Message has been sent", success: true });
});

module.exports = {
  path: "/api/nodemailer",
  handler: app
};

async function sendMail({ name, email, text }) {
  console.log("sendMail", { name, email, text });

  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: FROM_EMAIL,
      pass: FROM_PASSWORD
    }
  });

  const html = `
  Имя: ${name}<br />
  Почта: ${email}<br />
  Сообщение: ${text}
  `;

  await transporter.sendMail({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    subject: `Пешеход Тур - заявка с сайта`,
    html
  });
}
