var nodemailer = require('nodemailer');
const TRANSPORTER = {}

// send emails towadrs jecor.com.mx
TRANSPORTER.PRUEBAS = nodemailer.createTransport({
    host: "mail.jecor.com.mx",
    port: 465,
    auth: {
        user: 'pruebas@jecor.com.mx',
        pass: 'pruebasjecor'
    }
});

TRANSPORTER.NOTIFICACIONES_TI = nodemailer.createTransport({
    host: "mail.jecor.com.mx",
    port: 465,
    auth: {
        user: 'notificaciones.ti@jecor.com.mx',
        pass: '@-4bhuDJ4A@Z'
    }
});

module.exports = TRANSPORTER;