const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasArticulos` );

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
        con.query(`
        EXEC SVRAPPS.OP.xspVentasArticulosInsertar
        @ESTATUS = '${ data.ESTATUS }',
        @NOMBRE = '${ data.NOMBRE }',
        @CLAVE_ARTICULO = '${ data.CLAVE_ARTICULO }',
        @UNIDAD_VENTA = '${ data.UNIDAD_VENTA }',
        @CONTENIDO_UNIDAD_VENTA = ${ data.CONTENIDO_UNIDAD_VENTA },
        @MARGEN = ${ data.MARGEN },
        @CREADOR_ID = '${ data.CREADOR_ID }',
        @CREADOR = '${ data.CREADOR }'
        `);
        
        const result = await con.query( `SELECT TOP 1 * FROM SVRAPPS.OP.xvwVentasArticulos ORDER BY FECHA DESC` );
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

const _post_import = async ( req, res ) => {
    try {   
        const data = req.body.data;
        const creador = req.body.creador;
        const con = await get_connection();

        data.forEach( function ( item, index ) {
            con.query(`
            EXEC SVRAPPS.OP.xspVentasArticulosInsertar
            @NOMBRE = '${ item.NOMBRE }',
            @CLAVE_ARTICULO = '${ item.CLAVE_ARTICULO }',
            @UNIDAD_VENTA = '${ item.UNIDAD_VENTA }',
            @CONTENIDO_UNIDAD_VENTA = ${ item.CONTENIDO_UNIDAD_VENTA },
            @MARGEN = ${ item.MARGEN },
            @CREADOR_ID = '${ creador.CREADOR_ID }',
            @CREADOR = '${ creador.CREADOR }'
            `);
        });
        
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasArticulos` );
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
        const _id = req.params._id
        const data = req.body;
        const con = await get_connection();

        await con.query( `
        EXEC SVRAPPS.OP.xspVentasArticulosActualizar
        @ARTICULO_ID = '${ _id }',
        @ESTATUS = '${ data.ESTATUS }',
        @NOMBRE = '${ data.NOMBRE }',
        @UNIDAD_VENTA = '${ data.UNIDAD_VENTA }',
        @CONTENIDO_UNIDAD_VENTA = '${ data.CONTENIDO_UNIDAD_VENTA }',
        @MARGEN = '${ data.MARGEN }'
        ` );

        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasArticulos WHERE _id = ${ _id }` );
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
    _post,
    _post_import,
    _update,
}