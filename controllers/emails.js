const { response, request } = require('express')
const Email = require('../models/emails');
const EmailsTemplates = require('../helpers/emails');

const createEmail = async (req, res = response) => {
    try {
        const emailDb = await new Email({ ...req.body }).save();
        const {title, message, _id, startDate} = emailDb
        EmailsTemplates.sendEmailToVerify(_id, title, message, startDate  ).then( () => {
        return res.json({
            ok: true,
            email : emailDb
        });
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const getEmail = async(req = request, res = response)=> {
    try {
        const id = req.params.id
        const emailDb = await Email.findOne({'_id': id})
        return res.json({
            ok:true,
            email : emailDb
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok:false,
            msg : 'Error to get email, check with your system Administrator'
        })
    }
}

const updateEmail = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const {title, message, _id, startDate, link, emails} = req.body
        console.log(req.body);
        EmailsTemplates.sendEmail(_id, title, message, startDate, link, emails ).then( async () => {
            const emailDb = await Email.findOneAndUpdate({'_id': id}, req.body, {
                new: true
            });
            return res.json({
                ok: true,
                email : emailDb
            })
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg : 'Error to update Email, check with your system Administrator'
        })
    }
}

module.exports = {
    createEmail,
    getEmail,
    updateEmail
}