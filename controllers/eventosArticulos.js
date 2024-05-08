const { get_connection } = require( '../database/sqlserver.connections' );
const { BOOLEAN_TO_INT, GET_EXT } = require( '../middlewares/data' );
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');


const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosArticulos` );

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

const _get_articles_actives = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosArticulos A WHERE A.ESTATUS = 1 AND IMAGE IS NOT NULL` );

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
        const data = req.body.data;
        const con = await get_connection();

        if( data.length > 0 ){    
            var queries = `INSERT INTOSVRAPPS.OP.EventosArticulos `;
            data.forEach( function ( item, index ) {
                queries += `SELECT ${ item.ARTICULO_ID }, ${ null }, 0, '' `
                if( index !== data.length -1 ) { 
                    queries += 'UNION ALL '
                }
            });
            await con.query( queries );
        }

        return res.json({
            ok: true,
            result: null
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const _post_catalogue_articles_actives = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosArticulosCatalogo` );
        
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

const _post_articles_available = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosArticulosCatalogo` );
        
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
        const data = req.body;
        const con = await get_connection();
        
        if( data.IMAGE !== null ){
            fs.unlink( `./uploads/${ GET_EXT( data.IMAGE, false ) }`,  ( err ) => {
                if ( err ) {
                    console.log('Image no founded');
                    console.error( err );
                } 
            }); 
        }

        await con.query( `DELETE FROM SVRAPPS.OP.EventosArticulos WHERE ARTICULO_ID = ${ id }` );
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosArticulos` );

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

const _post_delete_image = async ( req, res ) => {
    try {
        const id = req.body.id;
        const image = req.body.IMAGE;
        const con = await get_connection();

        fs.unlink( `./uploads/${ GET_EXT( image, false ) }`,  ( err ) => {
            if ( err ) {
                console.error( err );
                res.status( 500 ).send( 'Error deleteing the image.' );
            }
        }); 

        await con.query( `UPDATESVRAPPS.OP.EventosArticulos SET IMAGE = ${ null } WHERE ARTICULO_ID = ${ id }` );
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosArticulos WHERE _id = ${ id }` );

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



const _put = async ( req, res ) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const image = req.body.IMAGE_FILE;
    
        const con = await get_connection();

        if( image === null ){
            await con.query( `UPDATESVRAPPS.OP.EventosArticulos SET ESTATUS = ${ BOOLEAN_TO_INT( data.ESTATUS ) }, DESCRIPCION = '${ data.DESCRIPCION }' WHERE ARTICULO_ID = ${ id }` );
        } else {
            const name = uuidv4() + "" + GET_EXT( image.type );
            const buffer = Buffer.from( image.data, 'base64' );

            fs.writeFile( `./uploads/${ name }`, buffer, ( err ) => {
                if ( err ) {
                    console.error( err );
                    res.status( 500 ).send( 'Error saving the image.' );
                }
            });
            
            await con.query( `UPDATESVRAPPS.OP.EventosArticulos SET ESTATUS = ${ BOOLEAN_TO_INT( data.ESTATUS ) }, DESCRIPCION = '${ data.DESCRIPCION }', IMAGE = '${ `http://localhost:5550/jecor/api/uploads/getFile/${ name }` }' WHERE ARTICULO_ID = ${ id }` );
        }        
        
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosArticulos WHERE _id = ${ id }` );

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
    _get_articles_actives,
    _post,
    _post_catalogue_articles_actives,
    _post_articles_available,
    _post_delete,
    _post_delete_image,
    _put,
}