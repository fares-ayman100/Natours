const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Fares Ayman <${process.env.EMAIL_FROM}>`;
  }

  // Transporter
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // send GridMail
      return nodemailer.createTransport({
        host: process.env.RESEND_HOST,
        port: process.env.RESEND_PORT, // استخدام 587 هو الشائع
        secure: false, // لـ 587
        auth: {
          user: process.env.RESEND_USER || 'resend',
          pass: process.env.RESEND_PASS,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    // 1) Render Html
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
    );

    // 2) MailOption
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
    };

    // 3) Create transport and send Email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Natours Family!');
  }

  async sendResetPassword() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for 10 min)',
    );
  }
};