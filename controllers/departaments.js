const { response, request } = require('express')
const Departments = require('../models/departaments');

// ############################################################
// #                          GET
// ############################################################
const getAllDepartments = async (req, res = response) => {
    try {
        const departments = await Departments.find();
        return res.json({
            ok: true,
            departments
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const getDepartments = async (req, res = response) => {
    try {
        const departments = await Departments.findById( req.params.id )
        return res.json({
            ok: true,
            departments
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
const createDepartments = async (req, res = response) => {
    try {
        const departmentsResult = await new Departments({ ...req.body }).save();
        return res.json({
            ok: true,
            departmentsResult
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
const updateDepartments = async (req, res = response) => {
    try {
        const update = { ...req.body };
        const departments = await Departments.findOneAndUpdate({ _id: req.params.id },  update, { new: true })
        return res.json({
            ok: true,
            departments
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
const deleteDepartments = async (req, res = response) => {
    try {
        const departments = await Departments.findOneAndDelete({ _id: req.params.id  })
        return res.json({
            ok: true,
            departments
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

module.exports = { getAllDepartments ,getDepartments ,createDepartments ,updateDepartments ,deleteDepartments };