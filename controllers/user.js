const User = require('../models/user');
const bcrypt = require('bcryptjs');
const formart = require('../helpers/format');

// ============================================================
// Obtener Usuarios
// ============================================================
const getUsers = async (req, res) => {

    try {
        const users = await User.find()
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name")
        .populate('permission')
                   
        res.json({
            ok:true,
            users: users
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}
// ============================================================
// Obtener Usuarios por departamento
// ============================================================
const getUsersByDepartament = async (req, res) => {
    const value = req.params.value
    try {
        const users = await User.find({departament: value})
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name")
                                
        res.json({
            ok:true,
            users: users
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

// ============================================================
// Obtener Usuario por Id
// ============================================================
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId
        const userDB = await User.findOne({ _id: userId, active: true })
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name applications permissions")
        .populate('permissions')
        .populate('applications')
        res.json({
            ok: true,
            user: userDB === null ? false : userDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

// ============================================================
// Crear Usuario
// ============================================================
const createUser = async (req, res ) => {
    try {
            
        const user = new User({ ...req.body });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(req.body.password, salt);
        const userDB = await user.save()

        const userResult = await User.findOne({ _id: userDB._id })
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name")
        
        res.json({
            ok: true,
            usuario: userResult
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }

};

// ============================================================
// Actualizar Usuario
// ============================================================
const updateUser = async (req, res) => {
    try {
        userId = req.params.userId;
        const {...user} = req.body;
        console.log(user);

        const userDB = await User.findOneAndUpdate({_id: userId}, user, {
            new: true
        })
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name")
        console.log( userDB );

        return res.json({
            ok:true,
            user: userDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

// ============================================================
// Actualizar Contraseña
// ============================================================
const updatePasswordUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        // const user = req.body;
        console.log('body',req.body)
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);
        const userDB = await User.findOneAndUpdate({_id: userId}, {password: password}, {
            new: true
        })
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name")

        return res.json({
            ok:true,
            user: userDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

// ============================================================
// Eliminar Usuario por Id
// ============================================================
const deleteUser = async (req, res) => {
    try {
        userId = req.params.userId;
        // const userDB = await User.findById(userId);
        const userDeleted = await User.findByIdAndRemove(userId)
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name")

        return res.json({
            ok: true,
            user: userDeleted
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

// POST
const getUsersByDepartaments = async (req, res) => {
    let departament = req.body.departament;
    // console.log(departament)
    try {
        const users = await User.find({ ...formart.Or('departament', departament) })
        .populate('store', "name")
        .populate('departament', "name key")
        .populate('role', "name")
                                
        res.json({
            ok:true,
            users: users
        });

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}


module.exports = {
    getUsers,
    getUsersByDepartament,
    getUser,
    createUser,
    updateUser,
    updatePasswordUser,
    deleteUser,
    getUsersByDepartaments
}
