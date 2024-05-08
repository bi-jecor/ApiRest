const { get_connection } = require('../database/sqlserver.connections');

const _get = async (req, res) => {
    try {
        const con = await get_connection();

        const result = await con.query( 
            `SELECT * 
            FROM SVRAPPS.OP.xvwVentasMovimientos
            WHERE TIPO_MOVIMIENTO_ID != 'C'` 
        );

        return res.json({
            ok: true,
            result: result.recordset
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const _getOne = async (req, res) => {
    try {
        const _id = req.params._id;
        const con = await get_connection();

        const result = await con.query( 
            `SELECT * 
            FROM SVRAPPS.OP.xvwVentasMovimientosDetalles 
            WHERE _id = ${ _id }` 
        );

        return res.json({
            ok: true,
            result: result.recordset
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const _getOneKardex = async (req, res) => {
    try {
        const _id = req.params._id;
        const con = await get_connection();

        const result = await con.query( `
            SELECT * 
            FROM SVRAPPS.OP.VentasArticulosKardex 
            WHERE ARTICULO_ID = ${ _id } ORDER BY FECHA DESC
        ` );

        return res.json({
            ok: true,
            result: result.recordset
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
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
            EXEC SVRAPPS.OP.xspVentasMovimientosInsertar
            @TIENDA_ID = '${ data.TIENDA_ID }',
            @TIPO_MOVIMIENTO_ID = '${ data.TIPO_MOVIMIENTO_ID }',
            @TOTAL = ${ data.TOTAL },
            @USUARIO_ID = '${ data.USUARIO_ID }',
            @USUARIO = '${ data.USUARIO }'
        ` );

        const { recordset: MOVIMIENTO } = await con.query( `SELECT TOP 1 MOVIMIENTO_ID AS ID FROM SVRAPPS.OP.VentasMovimientos ORDER BY FECHA DESC` );
        if ( data.MOVIMIENTO_DETALLE.length > 0 ) {
            data.MOVIMIENTO_DETALLE.forEach( async function ( item, index ) {
                await con.query(`
                    EXEC SVRAPPS.OP.xspVentasExistenciasActualizar
                    @TIENDA_ID = '${ data.TIENDA_ID }', 
                    @ARTICULO_ID = ${ item.ARTICULO_ID }, 
                    @UNIDADES = ${ item.UNIDADES }, 
                    @TIPO_MOVIMIENTO_ID = '${ data.TIPO_MOVIMIENTO_ID }'
                ` );

                await con.query(`
                    EXEC SVRAPPS.OP.xspVentasMovimientosDetallesInsertar
                    @MOVIMIENTO_ID = ${ MOVIMIENTO[0].ID },
                    @ARTICULO_ID = ${ item.ARTICULO_ID },
                    @UNIDADES = ${ item.UNIDADES },
                    @UNIDAD_COMPRA = ${ item.UNIDAD_VENTA },
                    @CONTENIDO_UNIDAD_COMPRA = ${ item.CONTENIDO_UNIDAD_VENTA },
                    @COSTO_UNITARIO = ${ item.COSTO_UNITARIO },
                    @SUBTOTAL = ${ item.SUBTOTAL }
                `);
            });
        }

        const result = await con.query( 
            `SELECT * 
            FROM SVRAPPS.OP.xvwVentasMovimientos 
            WHERE MOVIMIENTO_ID = ${ MOVIMIENTO[0].ID }` 
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

const _update = async (req, res) => {
    try {
        const _id = req.params._id;
        const data = req.body;
        const con = await get_connection();
        
        // 1: ACTUALIZAR EXISTEMCIAS
        const { recordset: MOVIMIENTO_DETALLE_ANTERIORES } = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasMovimientosDetalles WHERE _id = ${ _id }` );
        if ( MOVIMIENTO_DETALLE_ANTERIORES.length > 0 ) {
            MOVIMIENTO_DETALLE_ANTERIORES.forEach( async function ( item, index ) {
                await con.query(`
                    EXEC SVRAPPS.OP.xspVentasExistenciasActualizar
                    @TIENDA_ID = '${ item.TIENDA_ID }', 
                    @ARTICULO_ID = ${ item.ARTICULO_ID }, 
                    @UNIDADES = ${ item.UNIDADES }, 
                    @TIPO_MOVIMIENTO_ID = '_${ item.TIPO_MOVIMIENTO_ID }'`);
            });
        }

        // 2: ACTUALIZAR MOVIMIENTO
        await con.query(`
            UPDATE SVRAPPS.OP.VentasMovimientos SET
            TIENDA_ID = '${ data.TIENDA_ID }', 
            TIPO_MOVIMIENTO_ID = '${ data.TIPO_MOVIMIENTO_ID }', 
            TOTAL = ${ data.TOTAL }, 
            FECHA_ULTIMA_ACTUALIZACION = GETDATE()
            WHERE MOVIMIENTO_ID = ${ _id }
        ` );

        // 3: DETELE ITEMS IN VentasMovimientosDetalle
        await con.query( `
            DELETE FROM SVRAPPS.OP.VentasMovimientosDetalles 
            WHERE MOVIMIENTO_ID = ${ _id }
        `);
        
        // 4: INSERT NEW ITES IN VentasMovimientosDetalle
        if ( data.MOVIMIENTO_DETALLE.length > 0 ) {
            data.MOVIMIENTO_DETALLE.forEach( async function ( item, index ) {
                await con.query(`
                    EXEC SVRAPPS.OP.xspVentasExistenciasActualizar
                    @TIENDA_ID = '${ data.TIENDA_ID }', 
                    @ARTICULO_ID = ${ item.ARTICULO_ID }, 
                    @UNIDADES = ${ item.UNIDADES }, 
                    @TIPO_MOVIMIENTO_ID = '${ data.TIPO_MOVIMIENTO_ID }'`
                );

                await con.query(`
                    EXEC SVRAPPS.OP.xspVentasMovimientosDetallesInsertar
                    @MOVIMIENTO_ID = ${ _id },
                    @ARTICULO_ID = ${ item.ARTICULO_ID },
                    @UNIDADES = ${ item.UNIDADES },
                    @UNIDAD_COMPRA = ${ item.UNIDAD_VENTA === undefined ? item.UNIDAD_COMPRA : item.UNIDAD_VENTA },
                    @CONTENIDO_UNIDAD_COMPRA = ${ item.CONTENIDO_UNIDAD_VENTA === undefined ? item.CONTENIDO_UNIDAD_COMPRA : item.CONTENIDO_UNIDAD_VENTA },
                    @COSTO_UNITARIO = ${ item.COSTO_UNITARIO },
                    @SUBTOTAL = ${ item.SUBTOTAL }
                ` );
        })};

        const result = await con.query( 
            `SELECT * 
            FROM SVRAPPS.OP.xvwVentasMovimientos 
            WHERE _id = ${ _id }` 
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

const _delete = async (req, res) => {
    try {
        const _id = req.params._id;
        const con = await get_connection();
        
        // 1: ACTUALIZAR EXISTENCIAS
        const { recordset: MOVIMIENTO_DETALLE_ANTERIORES } = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasMovimientosDetalles WHERE _id = ${ _id }` );
        if ( MOVIMIENTO_DETALLE_ANTERIORES.length > 0 ) {
            MOVIMIENTO_DETALLE_ANTERIORES.forEach( async function ( item, index ) {
                await con.query(`
                EXEC SVRAPPS.OP.xspVentasExistenciasActualizar
                @TIENDA_ID = '${ item.TIENDA_ID }', 
                @ARTICULO_ID = ${ item.ARTICULO_ID }, 
                @UNIDADES = ${ item.UNIDADES }, 
                @TIPO_MOVIMIENTO_ID = '_${ item.TIPO_MOVIMIENTO_ID }'`);
            });
        }

        // 2: ACTUALIZAR ESTATUS DEL MOVIMIENTO
        await con.query(`
            UPDATE SVRAPPS.OP.VentasMovimientos SET
            TIPO_MOVIMIENTO_ID = 'C', FECHA_ULTIMA_ACTUALIZACION = GETDATE()
            WHERE MOVIMIENTO_ID = ${ _id }
        ` );

        const result = await con.query( 
            `SELECT * 
            FROM SVRAPPS.OP.xvwVentasMovimientos 
            WHERE _id = ${ _id }` 
        );

        console.log( result.recordset[0] );

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

module.exports = {
    _get,
    _getOne,
    _getOneKardex,
    _post,
    _update,
    _delete
}