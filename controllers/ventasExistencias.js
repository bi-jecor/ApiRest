const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasExistencias` );

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
        const result = await con.query( `SELECT * FROM SVRAPPS.op.xvwVentasExistenciasDetalles WHERE _id = '${ _id }'` );

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

const _postExistenciasProducto = async ( req, res ) => {
    try {
        const data = req.body.data;
        const con = await get_connection();

        const { recordset } = await con.query( `SELECT * FROM SVRAPPS.op.xvwVentasExistenciasDetalles WHERE TIENDA_ID = '${ data.TIENDA_ID }' AND ARTICULO_ID = '${ data.ARTICULO_ID }'` );
        const existencias = recordset[0].EXISTENCIA;

        if( existencias >= data.UNIDADES ){
            // await con.query(`
            //     EXEC SVRAPPS.OP.xspVentasExistenciasTemporalesInsertar
            //     @APERTURA_CIERRE_ID = ${ item.APERTURA_CIERRE_ID }, 
            //     @TIENDA_ID = '${ data.TIENDA_ID }', 
            //     @ARTICULO_ID = ${ item.ARTICULO_ID }, 
            //     @UNIDADES = ${ item.UNIDADES }, 
            // ` );
            return res.json({ ok: true });
        } else {
            return res.json({ ok: false });
        }

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
    _postExistenciasProducto
}