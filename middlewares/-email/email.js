const TRANSPORTER = require('./transporters');
const TEMPLATES = require('./templates-email');

function sendNotificationEmail( transporter, email ){
    const message = TEMPLATES.notification( new Date(), email.subject, email.message )
    var mailOptions = {
        from: transporter.options.auth.user,
        to: email.to,
        subject: email.subject,
        text: 'For clients with plaintext support only',
        html: message,
        attachments: email.attachments === undefined ? null : email.attachments
    };
    
    transporter.sendMail( mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log( 'Email enviado: ' + info.response );
        }
    });
}

async function SEND_MAIL( to, subject, message, file = null ){
    sendNotificationEmail( TRANSPORTER.pruebas, { to, subject, message,
        attachments: file === null ? null : [{
            filename: file.name,
            content: file.content,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },],
    })
}

module.exports = { SEND_MAIL }