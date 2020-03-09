"use strict";

const { FROM_EMAIL, FROM_PASSWORD, TO_EMAIL } = require("./credits.js");

const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { cb_name: name, cb_email: email, cb_text: text } = req.body;
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

  console.log("AUTH params", {
    user: FROM_EMAIL,
    pass: FROM_PASSWORD
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
