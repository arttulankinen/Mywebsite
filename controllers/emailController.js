const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
  const { email:dataEmail, otsikko:dataOtsikko, viesti:dataViesti } = req.body;
  console.log(dataEmail);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host:"smtp.gmail.com",
    port:465,
    secure: true,
    auth: {
      user:process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
    tls:{
      rejectUnauthorized:false,
    }
  });

  const message = {
    from: dataEmail, 
    to: process.env.EMAIL,
    subject: dataOtsikko,
    text: `Message from: ${dataEmail}\n\n${dataViesti}`,
    replyTo: dataEmail,
  };

  try {
     transporter.sendMail(message);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

module.exports = sendEmail;