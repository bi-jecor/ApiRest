const { response, request } = require('express')
const Stores = require('../models/stores');

// ############################################################
// #                          GET
// ############################################################
const getAllStores = async (req, res = response) => {
    try {
        const stores = await Stores.find();
        return res.json({
            ok: true,
            stores
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const getStores = async (req, res = response) => {
    try {
        const stores = await Stores.findById( req.params.id )
        return res.json({
            ok: true,
            stores
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

// ############################################################
// #                          POST
// ############################################################
const createStores = async (req, res = response) => {
    try {
        const storesResult = await new Stores({ ...req.body }).save();
        return res.json({
            ok: true,
            storesResult
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

// ############################################################
// #                          PUT
// ############################################################
const updateStores = async (req, res = response) => {
    try {
        const update = { ...req.body };
        const stores = await Stores.findOneAndUpdate({ _id: req.params.id },  update, { new: true })
        return res.json({
            ok: true,
            stores
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

// ############################################################
// #                          DELETE
// ############################################################
const deleteStores = async (req, res = response) => {
    try {
        const stores = await Stores.findOneAndDelete({ _id: req.params.id  })
        return res.json({
            ok: true,
            stores
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

module.exports = { getAllStores ,getStores ,createStores ,updateStores ,deleteStores };