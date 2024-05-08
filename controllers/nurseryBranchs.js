const {request, response} = require('express')
const NurseryBranch = require('../models/nurseryBranch');

// ============================================================
// Obtener Sucursales
// ============================================================
const getNurseryBranchs = (req, res = response) => {
    try {
        const nurseryBranchs = NurseryBranch.find();

        return res.json({
            ok:true,
            nurseryBranchs
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            nurseryBranchs
        });
        
    }
}

// ============================================================
// Obtener Sucursal por Id
// ============================================================
const getNurseryBranchById = (req, res = response) => {
    const nurseryBranchId = req.params.branchId;
    try {
        const nurseryBranch = NurseryBranch.findById(nurseryBranchId);
        return res.json({
            ok: true,
            nurseryBranch
        });
    } catch (error) {
        return res.json({
            ok: false,
            err: error
        });
    }
};
// ============================================================
// Obtener Sucursal por Nombre
// ============================================================
const getNurseryBranchByName = async(req, res = response) => {
    const nurseryBranchName = req.params.branchIdName
    try {
        const nurseryBranch = await NurseryBranch.findOne({"name": nurseryBranchName});
        return res.json({
            ok: true,
            nurseryBranch,
        });
    } catch (error) {
        return res.json({
            ok: false,
            err: error
        });
    }
};

// ============================================================
// Crear Sucursal
// ============================================================
const createNurseryBranch = async (req, res = response ) => {
    const data = new NurseryBranch({
        ...req.body
    });

    try {
        const nurseryBranchDB = await data.save();
        return res.json({
            ok:true,
            nurseryBranchDB
        });
        
    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg:'Error to create Branch',
            error
        });
    }
}

// ============================================================
// Actualizar Sucursal
// ============================================================
const updateNurseryBranch = async (req = request, res = response) => {
    const nurseryBranchId = req.params.branchId;
    try {
        const data = new NurseryBranch({
            ...req.body
        });
        const nurseryBranchUpdate = await NurseryBranch.findOneAndUpdate({_id: nurseryBranchId}, data, {
            new: true
        });


        return res.json({
            ok:true,
            nurseryBranchUpdate
        });

    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg:'Error to update Branch',
            error
        });

    }
}

// ============================================================
// Eliminar Sucursal
// ============================================================
const deleteNurseryBranch = async (req= request, res= response) => {
    const nurseryBranchId = req.params.branchId;
    try {
        
        const nurseryBranchDeleted = await NurseryBranch.findOneAndRemove(nurseryBranchId);
        return res.status(500).json({
            ok:false,
            msg:'Error to update Branch',
            error
        });
        
    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg:'Error to delete Branch',
            error
        });

    }
}

module.exports = {
    getNurseryBranchs,
    getNurseryBranchById,
    getNurseryBranchByName,
    createNurseryBranch,
    updateNurseryBranch,
    deleteNurseryBranch
}