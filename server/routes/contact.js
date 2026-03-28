const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {

  const { name, email, subject, message } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Message: ${subject}`,
      text: `
      Name: ${name}
      Email: ${email}

      Message:
      ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: "Email sent successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }

});

module.exports = router;