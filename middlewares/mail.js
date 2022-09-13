const nodemailer = require("nodemailer");

var main = async function (emailid,subject,message) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.php-training.in",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'suraj@php-training.in', // generated ethereal user
        pass: 'Suraj@#123', // generated ethereal password
      },
      name:"php-training.in",
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: ' <suraj@gmail.com>', // sender address
      to: emailid, // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html: message, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  module.exports = main;