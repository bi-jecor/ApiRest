// const client = require('twilio')();
const WhatsAppWeb = require('baileys')
const client = new WhatsAppWeb();

const connectApi = (req, res) => {
    client.connect()
        .then (([user, chats, contacts, unread]) => {
            console.log ("oh hello " + user.name + " (" + user.id + ")");
            chats.forEach(element => {
                console.log(element)
            });
            res.jsonp({mensaje: 'Autenticación exitosa'});
        })
        .catch (err => console.log(err) )
}

const sendWhatsApp = (req, res) => {
    options = {
        quoted: null,
        timestamp: new Date()
    }

    if(req.body.titulo) {
        client.sendTextMessage(`${req.body.phone}@g.us`, req.body.titulo.toUpperCase(), options)
        .then();
    }

    if(req.body.fecha) {
        client.sendTextMessage(`${req.body.phone}@g.us`, `Fecha: ${req.body.fecha}`, options)
        .then();
    }
    
    if(req.body.dato) {
        client.sendTextMessage(`${req.body.phone}@g.us`, req.body.dato, options)
        .then();
    }
    
    if(req.body.estimado) {
        client.sendTextMessage(`${req.body.phone}@g.us`, `Tiempo estimado: ${req.body.estimado}`, options)
        .then();
    }

    return res.json({
        ok:true,
        msg: 'Mensaje enviado correctamente'
    })
}

module.exports = {
    sendWhatsApp,
    connectApi
}