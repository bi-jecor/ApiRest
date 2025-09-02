const { response } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');


const login = async(req, res = response) => {
    const { user, password } = req.body;
    // console.log(user, password);

    try {
        const userDB = await Usuario.findOne({user, active: true})
        .populate('departament')
        .populate('store', 'name')
        .populate('role', 'name');
        
        if(!userDB)  {
            console.log( 'user invalid' );
            return res.status(404).json({
            // return res.json({
                ok: false,
                msg: 'user invalid'
            });
        }

        // Verificar Contraseña
        const validadPassword = bcrypt.compareSync(password, userDB.password);
        if(!validadPassword)  {
            console.log( 'Password no valido' )
            return res.status(404).json({
            // return res.json({
                ok: false,
                msg: 'Password no valido'
            });
        }
        
        console.log( "[ LOGIN ] " + user + " WAS LOGIN " + new Date() );
        res.json({
            ok: true,
            user: userDB._id,
            store: userDB.store,
            role: userDB.role,
            userDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: error
        });
    }
} 


module.exports = {
    login,
}