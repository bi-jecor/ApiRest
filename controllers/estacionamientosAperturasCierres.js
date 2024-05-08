const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosAperturasCierres` );

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
        const _id = req.params.id;
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosAperturasCierres WHERE USUARIO_ID = '${ _id }' AND ESTATUS_KEY = 'A'` );

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

const _getOneResum = async ( req, res ) => {
    try {
        const _id = req.params.id;
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosAperturasCierres WHERE _id = ${ _id }` );

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

const _post = async ( req, res ) => {
    try {
        const data = req.body;
        const con = await get_connection();

        await con.query( `
        INSERT INTO SVRAPPS.OP.EstacionamientosAperturasCierres ( TIENDA_ID, USUARIO_ID, OPERADOR, FECHA_APERTURA, ESTATUS, FONDO ) VALUES 
        ( '${ data.TIENDA_ID }', '${ data.USUARIO_ID }', '${ data.OPERADOR }', '${ data.FECHA_APERTURA }', 'A', ${ data.FONDO } )
        ` );
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosAperturasCierres WHERE USUARIO_ID = '${ data.USUARIO_ID }' AND ESTATUS_KEY = 'A'` );

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
        UPDATE SVRAPPS.OP.EstacionamientosAperturasCierres SET 
        FECHA_CIERRE = '${ data.FECHA_CIERRE }', TOTAL = ${ data.TOTAL }, TOTAL_INGRESADO = ${ data.TOTAL_INGRESADO }, ESTATUS = 'C'
        WHERE APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID }
        ` );
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEstacionamientosAperturasCierres WHERE _id = ${ _id }` );

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

module.exports = { 
    _get,
    _getOne,
    _getOneResum,
    _post,
    _delete,
}