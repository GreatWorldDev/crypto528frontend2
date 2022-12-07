const nodemailer = require('nodemailer');

module.exports = async (to, cc, bcc, subject, text, html, attachments) => {
  console.log('start');
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    },
    secureConnection: process.env.EMAIL_SECURE,
    tls: {
      // do not fail on invalid certs
      ciphers: 'SSLv3'
      // rejectUnauthorized: false
    }
  });
  console.log(process.env.EMAIL_HOST, process.env.EMAIL_ID);
  // Sanity check for attachments
  // if (attachments) {
  //   attachments = attachments.filter((val, i) => {
  //     if (val.filename && val.filename !== "") {
  //       return true;
  //     }
  //     return false;
  //   });
  // }
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ID,
    to,
    cc,
    bcc,
    subject,
    text,
    html,
    attachments
  });
  console.log(info);
  return info;
};
