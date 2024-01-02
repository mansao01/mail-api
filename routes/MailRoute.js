import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();


router.post("/v1/sendMail", (req, res) => {
    if (!req.body.destination || !isValidEmail(req.body.destination)) {
        return res.status(400).json({msg: "Invalid or missing recipient email address"});
    }

    const {email, subject, text} = req.query;
    let config = {
        host: "smtp.gmail.com",
        service: "gmail",
        auth: {
            user: process.env.GMAIL_APP_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let message = {
        from: process.env.GMAIL_APP_USER,
        to: email,
        subject: subject,
        text: text
    }

    transporter.sendMail(message).then((info) => {
        return res.status(201).json({
            msg: "Email sent",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });
    })
        .catch((err) => {
            console.error(err); // Log the error for debugging purposes
            return res.status(500).json({msg: err.message}); // Respond with the error message
        });

})

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export default router;
