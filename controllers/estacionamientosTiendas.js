const { get_connection } = require( '../database/sqlserver.connections' );
const { BOOLEAN_TO_INT } = require( '../middlewares/data' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosTiendas` );

        return res.json({
            ok: true,
            result: result.recordset
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const _getOne = async ( req, res ) => {
    try {
        const id = req.params.id
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosTiendas WHERE _id = ${ id }` );

        return res.json({
            ok: true,
            result: result.recordset[0]
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const _update = async ( req, res ) => {
    try {   
        const id = req.params.id
        const data = req.body;
        
        const con = await get_connection();
        await con.query( `UPDATE SVRAPPS.OP.EstacionamientosTiendas SET ESTATUS = ${ BOOLEAN_TO_INT( data.ESTATUS ) }, ESPACIOS = ${ data.ESPACIOS }, PRECIO = ${ data.PRECIO } WHERE TIENDA_ID = '${ id }'` );
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosTiendas WHERE _id = '${ id }'` );

        return res.json({
            ok: true,
            result: result.recordset
        });
        
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

module.exports = { 
    _get,
    _getOne,
    _update,
}