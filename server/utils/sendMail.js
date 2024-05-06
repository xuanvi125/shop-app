const nodemailer = require("nodemailer");

async function sendMail(options) {
  const tranporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"ShopApp Admin" <admin@example.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await tranporter.sendMail(mailOptions);
}

module.exports = sendMail;
