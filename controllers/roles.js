const { response, request } = require('express')
const Roles = require('../models/roles');

// ############################################################
// #                          GET
// ############################################################
const getAllRoles = async (req, res = response) => {
    try {
        const roles = await Roles.find();
        return res.json({
            ok: true,
            roles
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const getRoles = async (req, res = response) => {
    try {
        const roles = await Roles.findById( req.params.id )
        return res.json({
            ok: true,
            roles
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
const createRoles = async (req, res = response) => {
    try {
        const rolesResult = await new Roles({ ...req.body }).save();
        return res.json({
            ok: true,
            rolesResult
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
const updateRoles = async (req, res = response) => {
    try {
        const update = { ...req.body };
        const roles = await Roles.findOneAndUpdate({ _id: req.params.id },  update, { new: true })
        return res.json({
            ok: true,
            roles
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
const deleteRoles = async (req, res = response) => {
    try {
        const roles = await Roles.findOneAndDelete({ _id: req.params.id  })
        return res.json({
            ok: true,
            roles
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

module.exports = { getAllRoles ,getRoles ,createRoles ,updateRoles ,deleteRoles };