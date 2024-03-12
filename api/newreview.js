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
    date,
    sortDate,
    score,
    text,
    clientName,
    clientEmail,
    tours
  } = req.body;

  sendMail({
    toEmail: TO_EMAIL.spb,
    date,
    sortDate,
    score,
    text,
    clientName,
    clientEmail,
    tours
  })
    .then(() => {
      res.status(200).json({ message: "Message has been sent", success: true });
    })
    .catch(({ message }) => {
      res.status(200).json({ message, success: false });
    });
});

module.exports = {
  path: "/api/newreview",
  handler: app
};

function sendMail({
  toEmail,
  date,
  sortDate,
  score,
  text,
  clientName,
  clientEmail,
  tours
}) {
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
      Имя: ${clientName}<br />
      Почта: ${clientEmail}<br />
      Дата: ${date}<br />
      Дата для сортировки: ${sortDate}<br />
      Оценка (звезд): ${score}<br />
      Выбранные туры: ${tours}<br />
      Текст отзыва: ${text}
    `;

    const msg = {
      from: FROM_EMAIL,
      to: toEmail,
      subject: `Пешеход Тур - новый отзыв`,
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
