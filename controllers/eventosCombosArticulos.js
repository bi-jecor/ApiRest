const { get_connection } = require( '../database/sqlserver.connections' );
const { BOOLEAN_TO_INT, GET_EXT } = require( '../middlewares/data' );
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');


const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosCombosArticulos` );

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
        const id = req.params.id;
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosCombosArticulos WHERE COMBO_ID = ${ id }` );

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
        const id = req.body._id;
        const data = req.body.data;
        const con = await get_connection();

        if( data.length > 0 ){
            var queries = `INSERT INTO SVRAPPS.OP.EventosCombosArticulos `;
            data.forEach( function ( item, index ) {
                queries += `SELECT ${ id }, '${ item._id }' `
                if( index !== data.length -1 ) { 
                    queries += 'UNION ALL '
                }
            });
            await con.query( queries );
        }
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosCombosArticulos WHERE COMBO_ID = ${ id }` );

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

const _post_delete = async ( req, res ) => {
    try {
        const id = req.body._id;
        const selected = req.body.selected;

        const con = await get_connection();
        await con.query( `DELETE FROM SVRAPPS.OP.EventosCombosArticulos WHERE COMBO_ID = ${ id } AND ARTICULO_ID = ${ selected._id }` );        
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosCombosArticulos WHERE COMBO_ID = ${ id }` );
        
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
    _post,
    _post_delete,
}