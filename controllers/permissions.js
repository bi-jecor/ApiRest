const {response} = require('express')
const Permission = require('../models/permission');
// const permission = require('../models/permission');


// ============================================================
// Crear Permiso
// ============================================================
const createPermission = async (req, res=response) => {
    const permission = new Permission({ ...req.body });
    try {
        const permissionDB = await permission.save();
        const permissionResult = await Permission.findOne({ _id: permissionDB._id })
        .populate('application', "name")
    
        return res.json({
            ok: true,
            permission: permissionResult
        });
        
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to create Application, check with your system Administrator'
        });
    }
}

// ============================================================
// Obtener todos los permisos
// ============================================================
const getPermissions = async (req, res=response) => {
    try {

        const permissions = await Permission.find();

        return res.json({
            ok: true,
            permissions
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get Permissions, check with your system Administrator'
        });
    }
}

// ============================================================
// Obtener permisos por aplicacion
// ============================================================
const getPermissionsbyApp = async (req, res=response) => {
    const appId = req.params.appId;
    try {
        const permissions = await Permission.find({"application": appId})
        .populate('application', "name")

        return res.json({
            ok: true,
            permissions
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get Permissions, check with your system Administrator'
        });
    }
}

// ============================================================
// Obtener un permiso por id
// ============================================================
const getPermission = async (req, res=response) => {
    const permissionId = req.params.permissionId;
    
    try {
        const permission = await Permission.findById(permissionId)
        .populate('application', "name")

        return res.json({
            ok: true,
            permission
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get Permission, check with your system Administrator'
        });
    }
}

// ============================================================
// Actualizar Permiso por Id
// ============================================================
const updatePermission = async(req, res = response) => {
    // console.log(req.body);
    try {
        const permissionId = req.params.permissionId;
        const permission = req.body;

        const permissionDB = await Permission.findOneAndUpdate({_id: permissionId}, permission, {
            new: true
        })
        .populate('application', "name")

        return res.status(200).json({
            ok:true,
            permission: permissionDB
        })

        
    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg: 'Error to update Permission, check with your system Administrator'
        });
    }
}

// ============================================================
// Eliminar Permiso por Id
// ============================================================
const deletePermission = async (req, res = response) => {
    const permissionId = req.params.permissionId;

    try {
        const permissionDB = await Permission.findOneAndDelete({_id: permissionId})
        .populate('application', "name")

        return res.status(200).json({
            ok: true,
            permissionDeleted: permissionDB
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to delete Permission, check with your system Administrator'
        });
    }
}

module.exports = {
    createPermission,
    getPermissions,
    getPermissionsbyApp,
    getPermission,
    updatePermission,
    deletePermission
}