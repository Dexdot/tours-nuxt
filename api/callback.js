"use strict";

const { FROM_EMAIL, FROM_PASSWORD, TO_EMAIL } = require("./credits.js");

const bodyParser = require("body-parser");
const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const {
    cb_city: city,
    cb_name: name,
    cb_email: email,
    cb_text: text
  } = req.body;

  if (!name && !email) {
    res.status(200).json({ message, success: false });
    return;
  }

  sendMail({
    toEmail: TO_EMAIL.spb,
    name,
    email,
    text
  })
    .then(() => {
      res.status(200).json({ message: "Message has been sent", success: true });
    })
    .catch(({ message }) => {
      res.status(200).json({ message, success: false });
    });
});

module.exports = {
  path: "/api/callback",
  handler: app
};

function sendMail({ toEmail, name, email, text }) {
  return new Promise((resolve, reject) => {
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

    const msg = {
      from: FROM_EMAIL,
      to: toEmail,
      subject: `Пешеход Тур - заявка с сайта`,
      html
    };

    transporter.sendMail(msg, error => {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });
}
