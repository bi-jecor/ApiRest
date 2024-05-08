const TRANSPORTER = require('./transporters');
const TEMPLATES = require('./templates');
const ACTIONS = require('./actions');

function GET_TRANSPORTER( type ){
    switch( type ){
        case "PRUEBAS": return TRANSPORTER.PRUEBAS
        case "NOTIFICACIONES_TI": return TRANSPORTER.NOTIFICACIONES_TI
        default: return TRANSPORTER.PRUEBAS
    }
}

function GET_TEMPLATES( type, options ){
    switch( type ){
        case "NOTIFICATION": {
            if( options.title === undefined || options.message === undefined ){
                throw new Error( "PARAMS ARE NEEDED { title: String, message: String }" );
            }
            return TEMPLATES.NOTIFICATION( options.title, options.message )
        }
        default: return TEMPLATES.NOTIFICATION
    }
}

async function GET_EXCEL_FROM_JSON( name = "prueba.xlsx", data = [] ){
    const content = await ACTIONS.CREATE_EXCEL( data );
    return  [{
        filename: name,
        content: content,
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    },]
}

function SEND_MAIL( transporter, template, options, attachments = null ){
    if( options.to === undefined || options.subject === undefined ) {
        throw new Error( "PARAMS ARE NEEDED { to: String, subject: String, message: message }" );
    }
    
    var mailOptions = {
        from: transporter.options.auth.user,
        to: options.to,
        subject: options.subject,
        text: 'For clients with plaintext support only',
        html: template,
        attachments: attachments === null ? null : attachments,
    };
    
    transporter.sendMail( mailOptions, function ( error, info ) {
        if (error) {
            console.log(error);
        } else {
            console.log( 'Email enviado: ' + info.response );
        }
    });
}

// EXAMPLE OF HOW TO SEND EMAIL
// async function sendEmail(){
//     // to: "eduardo.rubio@jecor.com.mx",
//     const to = "francisco.becerra@jecor.com.mx";
//     const subject = "Notificacion de prueba";
//     const message = "El centro de notificaciones de jecor te ha enviado el ultimo reporte del TRASPASOS PENDIENTES, si tienes alguna duda, comunicate con el departamento comercial. Si no deberías de recibir este correo, favor de notificar al departamento de TI al correo de sistemasgroup@jecor.com.mx.";
    
//     const transporter = GET_TRANSPORTER( "PRUEBAS" );
//     const template = GET_TEMPLATES( "NOTIFICATION", { title: subject, message: message } );
    
//     let data = [{firstName: 'John',lastName: 'Bailey',purchasePrice: 1000,paymentsMade: 100,}, {firstName: 'Leonard', lastName: 'Clark', purchasePrice: 1000, paymentsMade: 150,} ];
//     const file = await GET_EXCEL_FROM_JSON( "nombre.xlsx", data );

//     SEND_MAIL( transporter, template, { to, subject }, file )
// }
// sendEmail();

module.exports = { GET_TEMPLATES, GET_TRANSPORTER, GET_EXCEL_FROM_JSON, SEND_MAIL }