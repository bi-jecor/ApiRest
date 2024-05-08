const {request, response} = require('express')
const NurseryProvider = require('../models/nurseryProvider');

const createNurseryProvider = async (req, res) => {
    const provider = new NurseryProvider({
        ...req.body
    });
    try {
        const providerDB = await provider.save();
        return res.json({
            ok: true,
            provider: providerDB
        })
    } catch (error) {
        return res.json({
            ok: false,
            msg:' Error to create Provider'
        });
    }
}

const getNurseryProviders = async (req, res) => {
    try {

        const providersDB = await NurseryProvider.find();
        return res.json({
            ok: true,
            providers: providersDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg:' Error to get Providers'
        });
    }
}

const getNurseryProvider = async (req, res) => {
    const providerId = req.params.providerId
    try {
        const providerDB = await NurseryProvider.findOne({_id: providerId});
        return res.json({
            ok: true,
            provider: providerDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg:' Error to get Provider'
        });
    }
}

const updateNurseryProvider = async (req, res) => {
    const providerId = req.params.providerId;
    const data = {...req.body}
    try {
        const providerDB = await NurseryProvider.findOneAndUpdate({_id: providerId}, data, {
            new: true
        });
        return res.json({
            ok: true,
            provider: providerDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg:' Error to update Providers'
        });
    }
}

module.exports = {

    createNurseryProvider,
    getNurseryProviders,
    getNurseryProvider,
    updateNurseryProvider

}