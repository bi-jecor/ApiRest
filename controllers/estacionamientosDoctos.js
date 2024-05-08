const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosDoctos` );
        console.log( "_get" )
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
        const _id = req.body._id;
        const con = await get_connection();
        
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosDoctos WHERE ESTATUS_KEY = 'E' AND APERTURA_CIERRE_ID = ${ _id }` );
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

const _post = async ( req, res ) => {
    try {
        const data = req.body;
        const con = await get_connection();

        await con.query( `
        INSERT INTO SVRAPPS.OP.EstacionamientosDoctos ( APERTURA_CIERRE_ID, NUM_PLACA, HORA_ENTRADA, FECHA, COMENTARIOS, ESTATUS ) VALUES 
        ( ${ data.APERTURA_CIERRE_ID }, '${ data.NUM_PLACA }', '${ data.HORA_ENTRADA }', '${ data.FECHA }', '${ data.COMENTARIOS }', 'E' )
        ` );
        
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosDoctos WHERE APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID } AND ESTATUS_KEY = 'E'` );        
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

const _post_historical = async ( req, res ) => {
    try {
        const _id = req.body._id;
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosDoctos WHERE APERTURA_CIERRE_ID = ${ _id }` );
        
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


const _update = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT TOP 1 * FROM SVRAPPS.OP.xvwEstacionamientosDoctos` );

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

const _delete = async ( req, res ) => {
    try {
        _id = req.params.id;
        const data = req.body;
        const con = await get_connection();

        await con.query( `
        UPDATE SVRAPPS.OP.EstacionamientosDoctos SET 
        HORA_SALIDA = '${ data.HORA_SALIDA }', TOTAL = '${ data.TOTAL }', ESTATUS = 'S'
        WHERE DOCTO_ID = ${ data.DOCTO_ID }
        ` );
        
        const result = { _id: parseInt( _id ) };
        return res.json({
            ok: true,
            result: result
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
    _post,
    _post_historical,
    _update,
    _delete,
}