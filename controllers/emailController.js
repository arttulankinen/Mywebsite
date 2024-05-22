const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
  const { email:dataEmail, otsikko:dataOtsikko, viesti:dataViesti } = req.body;
  console.log(dataEmail);

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host:"465",
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  const mailOptions = {
    from: dataEmail, 
    to: process.env.EMAIL,
    subject: dataOtsikko,
    text: dataViesti,
  };

  
  console.log(dataEmail);
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

module.exports = sendEmail;