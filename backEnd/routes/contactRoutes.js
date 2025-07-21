const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure your SMTP transporter (use your real email and password or an app password)
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'm.qasimtasleemofficial@gmail.com', // replace with your email
    pass: 'rmce kcjq szfi mqf'   // replace with your email password or app password
  }
});

// POST /api/contact
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  // console.log("Received contact form submission:", req.body);
  console.log(name, email, message);
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    console.log("Sending email...");
    await transporter.sendMail({
      from: `${email}`,
      to: "m.qasimtasleemofficial@gmail.com", // replace with your email
      subject: "New Contact Form Submission",
      text: message,
      
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Message sent successfully!" });
  }
});



module.exports = router;

