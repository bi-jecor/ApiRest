const { response } = require('express')
const Application = require('../models/application');

// ============================================================
// Crear/Registrar aplicacion
// ============================================================
const createApplication = async (req, res=response) => {
    console.log(req);
    try {
        const application = new Application({
            // ...req.body
            name : req.body.nombre,
            url : req.body.url,
            img : req.body.img,
        });

        const applicationDB = await application.save();

        return res.json({
            ok: true,
            application : applicationDB
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to register Application, check with your system administrator'
        });
    }
}

// ============================================================
// Obtener Aplicacion
// ============================================================
const getApplication = async(req, res=response) => {
    const idApplication = req.params.idApplication;
    try {
        const applicationDB = await Application.findById(idApplication);
        if(!applicationDB){
            return res.status(404).json({
                ok:false,
                msg: 'Application not found'
            })
        }

        return res.status(200).json({
            ok: true,
            application: applicationDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Application, check with your system administrator'
        });
    }
}

// ============================================================
// Obtener Aplicaciones
// ============================================================
const getApplications = async(req, res=response) => {
    try {
        const applications = await Application.find().sort('name');
        return res.status(200).json({
            ok: true,
            applications
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Applications, check with your system administrator'
        });
    }
}

// ============================================================
// Actualizar Aplicaciones
// ============================================================
const updateApplication = async(req, res=response) => {
    
    try {
        const idApplication = req.params.idApplication;
        const newApplication = req.body;
        // console.log('APP',newApplication);
        const applicationDB = await Application.findOneAndUpdate({_id: idApplication}, newApplication, {
            new: true
        });
        
        return res.json({
            ok: true,
            application: applicationDB,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to update Applications, check with your system administrator',
            error

        });
    }
}


// ============================================================
// Eliminar Aplicacin
// ============================================================

const deleteApplication = async(req, res=response) => {
    
    try {
        const idApplication = req.params.idApplication;
        const applicationDB = await Application.findOneAndRemove({_id: idApplication})
        
        return res.json({
            ok: true,
            msg: applicationDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to delete Application, check with your system administrator',
            error

        });
    }
}

module.exports = {
    createApplication,
    getApplication,
    getApplications,
    updateApplication,
    deleteApplication
}
