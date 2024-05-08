const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasDoctos` );

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
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasDoctos WHERE _id = ${ _id }` );

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

const _postOne = async ( req, res ) => {
    try {
        const data = req.body;
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasDoctosDetalles WHERE APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID } AND DOCTO_ID = ${ data.DOCTO_ID }` );

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

        await con.query(`
            EXEC SVRAPPS.OP.xspVentasDoctosInsertar
            @APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID }, 
            @TOTAL = ${ data.TOTAL }
        ` );

        const { recordset: DOCTO } = await con.query( `SELECT TOP 1 DOCTO_ID AS ID FROM SVRAPPS.OP.VentasDoctos ORDER BY FECHA DESC` );
        if ( data.DETALLE.length > 0 ) {
            data.DETALLE.forEach( async function ( item, index ) {
                await con.query(`
                    EXEC SVRAPPS.OP.xspVentasDoctosDetallesInsertar
                    @DOCTO_ID = ${ DOCTO[0].ID },
                    @ARTICULO_ID = ${ item.ARTICULO_ID },
                    @UNIDADES = ${ item.UNIDADES },
                    @COSTO_UNITARIO = ${ item.PRECIO },
                    @SUBTOTAL = ${ item.SUBTOTAL }
                `);
            });
        }

        await con.query( `
            DELETE FROM SVRAPPS.OP.VentasDoctosDetallesTemporales
            WHERE APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID }
        ` );

        const result = await con.query( 
            `SELECT * 
            FROM SVRAPPS.OP.VentasDoctos 
            WHERE DOCTO_ID = ${  DOCTO[0].ID  }` 
        );

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

const _update = async ( req, res ) => {
    try {   
        const _id = req.params._id;
        const data = req.body;
        const con = await get_connection();

        await con.query( `
            UPDATE SVRAPPS.OP.VentasDoctos SET ESTATUS = 'D'
            WHERE DOCTO_ID = ${ data.DOCTO_ID } AND APERTURA_CIERRE_ID = ${ data.APERTURA_CIERRE_ID }
        ` );

        return res.json({
            ok: true,
            result: { _id: parseInt( _id ) }
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
    _postOne,
    _post,
    _update,
}