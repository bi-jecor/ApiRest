const { get_connection } = require( '../database/sqlserver.connections' );
const { ObjectId } = require('mongodb'); 

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwSistemaTiendas` );

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
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwSistemaTiendas WHERE _id = ${ _id }` );

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
    // try {   
    //     const data = req.body;
    //     const con = await get_connection();

    //     await con.query( `
    //         INSERT INTO SVRAPPS.OP.VentasMovimientos ( TIENDA_ID, NOMBRE, DIRRECCION, ESTADO, DESCRIPCION, ESTATUS ) VALUES
    //         ( '${ new ObjectId() }', '${ data.NOMBRE }', '${ data.DIRRECCION }', '${ data.ESTADO }', '${ data.DESCRIPCION }', ${ data.ESTATUS } )
    //     ` );
        
    //     const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasMovimientos WHERE MOVIMIENTO_ID = ${ MOVIMIENTO_ID.recordset[0].MOVIMIENTO_ID }` );
    //     return res.json({
    //         ok: true,
    //         result: result.recordset[0]
    //     });
        
    // } catch (error) {
    //     console.log( error );
    //     return res.status( 500 ).json({
    //         ok: false,
    //         msg: 'Error, check with your system Administrator'
    //     });
    // }
}

const _update = async ( req, res ) => {
    // try {   
    //     const _id = req.params._id;
    //     const data = req.body;
    //     const con = await get_connection();

    //     await con.query( `
    //         UPDATE SVRAPPS.OP.VentasMovimientos SET
    //         TIENDA_ID = '${ data.TIENDA_ID }', TIPO_MOVIMIENTO_ID = '${ data.TIPO_MOVIMIENTO_ID }', TOTAL = ${ data.TOTAL }, FECHA_ULTIMA_ACTUALIZACION = GETDATE()
    //         WHERE MOVIMIENTO_ID = ${ _id }
    //     ` );

    //     await con.query( `DELETE FROM SVRAPPS.OP.VentasMovimientosDetalle WHERE MOVIMIENTO_ID = ${ _id }` );
    //     if( data.MOVIMIENTO_DETALLE.length > 0 ){
    //         var queries = `INSERT INTO SVRAPPS.OP.VentasMovimientosDetalle ( MOVIMIENTO_ID, ARTICULO_ID, UNIDADES, UNIDAD_COMPRA, COSTO_UNITARIO, COSTO_TOTAL ) `;
    //         data.MOVIMIENTO_DETALLE.forEach( function ( item, index ) {
    //             queries += `SELECT ${ _id }, ${ item.ARTICULO_ID }, ${ item.UNIDADES }, '${ item.UNIDAD_COMPRA }', ${ item.COSTO_UNITARIO }, ${ item.COSTO_TOTAL } `
    //             if( index !== data.MOVIMIENTO_DETALLE.length -1 ) { 
    //                 queries += 'UNION ALL '
    //             }
    //         });
    //         await con.query( queries );
    //     }
        
    //     const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwVentasMovimientos WHERE MOVIMIENTO_ID = ${ _id }` );
    //     return res.json({
    //         ok: true,
    //         result: result.recordset[0]
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
    _update,
}