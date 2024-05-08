const validarToken = (req, res, next) => {
    const token = req.header('token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        });
    }else {
        next();
    }
}

module.exports = {
    validarToken
}