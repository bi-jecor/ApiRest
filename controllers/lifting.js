const { response } = require('express');
const Lifting = require('../models/lifting');

const createLifting = async (req, res) => {
    const body = req.body;
    const data = new Lifting({
        ...body
    });
    try {
        const liftingDB = await data.save();
        return res.json({
            ok: true,
            lifting: liftingDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to create inventory'
        });
    }
}

const getLiftings= async (req, res) => {
    try {
        const liftingsDB = await Lifting.find();
        return res.json({
            ok: true,
            liftings : liftingsDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get liftingsDB'
        });
    }
}

const getLiftingsByWarehouseAndUser = async (req, res) => {
    const warehouse = req.params.warehouse
    const userId = req.params.user

    try {
        const liftingsDB = await Lifting.find({'warehouse': warehouse, 'elaborated': userId});
        return res.json({
            ok: true,
            liftings: liftingsDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get liftingsDB'
        });
    }
}
const getLiftingsByWarehouseAndConcept = async (req, res) => {
    const warehouse = req.params.warehouse;
    const concept = req.params.concept;
    console.log(warehouse, concept);
    try {
        const liftingsDB = await Lifting.find({'warehouse': warehouse, 'concept': concept})
        .populate('elaborated', 'user')
        return res.json({
            ok: true,
            liftings: liftingsDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get liftingsDB'
        });
    }
}

const getLiftingsByStatus = async (req, res) => {
    const status = req.params.status
    try {
        const liftingsDB = await Lifting.find({'status': status});
        return res.json({
            ok: true,
            liftings: liftingsDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get liftingsDB'
        });
    }
}

const getLifting = async (req, res) => {
    const liftingId = req.params.liftingId
    try {
        const liftingDB = await Lifting.findOne({_id: liftingId});
        return res.json({
            ok: true,
            lifting: liftingDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error to get lifting'
        })
    } 
}

const updateLifting = async (req, res) => {
    const liftingId = req.params.liftingId
    data = {
        ...req.body
    }
    try {
        const liftingDB = await Liftings.findOneAndUpdate({_id: liftingId}, data, {new: true});
        return res.json({
            ok: true,
            lifting: liftingDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error to get liftings'
        });ñ
    }
}

const deleteLifting = async (req, res) => {
    try {
        const liftingId = req.params.liftingId;
        const data = new Report({
            ...req.body
        });

        const liftingDB = await Liftings.findOneAndDelete({ _id: liftingId })
        return res.json({
            ok: true,
            lifting: liftingDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to delete Lifting, check with your system Administrator',
            error
        });
    }
}

module.exports = {
    createLifting, 
    getLifting,
    getLiftings,
    getLiftingsByWarehouseAndUser,
    getLiftingsByWarehouseAndConcept,
    getLiftingsByStatus,
    updateLifting,
    deleteLifting
}