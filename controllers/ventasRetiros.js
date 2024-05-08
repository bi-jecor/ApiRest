const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasAperturasCierres` );

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
        const _id = req.params._id;
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasTotalCortePorApertura WHERE _id = ${ _id }` );

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
            INSERT INTO SVRAPPS.OP.VentasRetiros ( APERTURA_CIERRE_ID, TOTAL, AUTORIZA_ID, AUTORIZA ) VALUES ( 
            ${ data.APERTURA_CIERRE_ID },
            ${ data.TOTAL },
            '${ data.AUTORIZA_ID }',
            '${ data.AUTORIZA }'
        )` );
        
        return res.json({
            ok: true,
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
    // try {   
    //     const _id = req.params._id;
    //     const data = req.body;
    //     const con = await get_connection();

    //     const { recordset: DOCTOS } = await con.query( `
    //         SELECT *
    //         FROM SVRAPPS.OP.xvwVentasTotalCortePorApertura
    //         WHERE _id = ${ _id }
    //     ` );

    //     await con.query( `
    //         UPDATE SVRAPPS.OP.VentasAperturasCierres SET
    //         FECHA_CIERRE = GETDATE(),
    //         TOTAL_INGRESADO = ${ data.TOTAL_INGRESADO },
    //         TOTAL = ${ DOCTOS[0].VENTAS }, 
    //         TOTAL_DEVOLUCIONES = ${ DOCTOS[0].DEVOLUCIONES }, 
    //         ESTATUS = 'C'
    //         WHERE APERTURA_CIERRE_ID  = ${ _id }
    //     ` );

    //     return res.json({
    //         ok: true,
    //         result: { _id: parseInt( _id ) }
    //     });
        
    // } catch (error) {
    //     console.log( error );
    //     return res.status( 500 ).json({
    //         ok: false,
    //         msg: 'Error, check with your system Administrator'
    //     });
    // }
}

module.exports = { 
    _get,
    _getOne,
    _post,
    _delete,
}