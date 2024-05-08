var nodemailer = require('nodemailer');
const TRANSPORTER = {}

// send emails towadrs jecor.com.mx
TRANSPORTER.pruebas = nodemailer.createTransport({
    host: "mail.jecor.com.mx",
    port: 465,
    auth: {
        user: 'pruebas@jecor.com.mx',
        pass: 'pruebasjecor'
    }
});

module.exports = TRANSPORTER;