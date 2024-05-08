const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasDoctosDetallesTemporales` );

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
        const result = await con.query( `SELECT * FROM SVRAPPS.op.xvwVentasDoctosDetallesTemporales WHERE APERTURA_CIERRE_ID = ${ _id }` );

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

const _post = async (req, res) => {
    try {
        const data = req.body;
        const con = await get_connection();

        await con.query( `
            EXEC SVRAPPS.OP.xspVentasExistenciasActualizar
            @TIENDA_ID = '${ data.TIENDA_ID }', 
            @ARTICULO_ID = ${ data.ARTICULO_ID }, 
            @UNIDADES = ${ data.UNIDADES }, 
            @TIPO_MOVIMIENTO_ID = 'S'
        ` );
        
        await con.query( `
            EXEC SVRAPPS.OP.xspVentasDoctosDetallesTemporalesInsertar
            @APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID },
            @ARTICULO_ID = ${ data.ARTICULO_ID },
            @UNIDADES = ${ data.UNIDADES },
            @COSTO_UNITARIO = ${ data.COSTO_UNITARIO },
            @SUBTOTAL = ${ data.SUBTOTAL }
        ` );
        
        const result = await con.query( `
            SELECT TOP 1 *
            FROM SVRAPPS.OP.xvwVentasDoctosDetallesTemporales 
            WHERE APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID }
            ORDER BY FECHA DESC
        ` );

        return res.json({
            ok: true,
            result: result.recordset[0]
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const _detele = async ( req, res ) => {
    try {
        const _id = req.params._id;
        const data = req.body;
        const con = await get_connection();

        await con.query( `
            EXEC SVRAPPS.OP.xspVentasExistenciasActualizar
            @TIENDA_ID = '${ data.TIENDA_ID }', 
            @ARTICULO_ID = ${ data.ARTICULO_ID }, 
            @UNIDADES = ${ data.UNIDADES }, 
            @TIPO_MOVIMIENTO_ID = 'E'
        ` );
        
        await con.query( `
            DELETE FROM SVRAPPS.OP.VentasDoctosDetallesTemporales
            WHERE DOCTO_DETALLE_TEMPORAL_ID = ${ _id }
        ` );
        
        return res.json({
            ok: true,
            result: { _id: parseInt( _id ) }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

module.exports = { 
    _get,
    _getOne,
    _post,
    _detele,
}