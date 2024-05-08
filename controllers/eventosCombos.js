const { get_connection } = require( '../database/sqlserver.connections' );
const { BOOLEAN_TO_INT, GET_EXT } = require( '../middlewares/data' );
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');


const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosCombos` );

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
        const image = req.body.IMAGE_FILE;
        const con = await get_connection();

        if( image === null ){
            await con.query ( 
                `INSERT INTO SVRAPPS.OP.EventosCombos ( NOMBRE, DESCRIPCION, PRECIO, ESTATUS ) 
                VALUES ( '${ data.NOMBRE }', '${ data.DESCRIPCION }', ${ data.PRECIO }, ${ BOOLEAN_TO_INT( data.ESTATUS ) } )` 
            );
        } else {
            const name = uuidv4() + "" + GET_EXT( image.type );
            const buffer = Buffer.from( image.data, 'base64' );

            fs.writeFile( `./uploads/${ name }`, buffer, ( err ) => {
                if ( err ) {
                    console.error( err );
                    res.status( 500 ).send( 'Error saving the image.' );
                }
            });

            await con.query ( 
                `INSERT INTO SVRAPPS.OP.EventosCombos ( NOMBRE, DESCRIPCION, PRECIO, ESTATUS, IMAGE ) 
                VALUES ( '${ data.NOMBRE }', '${ data.DESCRIPCION }', ${ data.PRECIO }, ${ BOOLEAN_TO_INT( data.ESTATUS ) }, '${ `http://localhost:5550/jecor/api/uploads/getFile/${ name }` }' )` 
            );
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

        await con.query( `UPDATE SVRAPPS.OP.EventosCombos SET IMAGE = ${ null } WHERE COMBO_ID = '${ id }'` );

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

        await con.query( `DELETE FROM SVRAPPS.OP.EventosCombos WHERE COMBO_ID = ${ id }` );
        await con.query( `DELETE FROM SVRAPPS.OP.EventosCombosArticulos WHERE COMBO_ID = ${ id }` );
        
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

const _put = async ( req, res ) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const image = req.body.IMAGE_FILE;
    
        const con = await get_connection();

        if( image === null ){
            await con.query ( 
                `UPDATE SVRAPPS.OP.EventosCombos 
                SET NOMBRE = '${ data.NOMBRE }', DESCRIPCION = '${ data.DESCRIPCION }', PRECIO = ${ data.PRECIO }, ESTATUS = ${ BOOLEAN_TO_INT( data.ESTATUS ) }
                WHERE COMBO_ID = ${ id }` 
            );
        } 
        else {
            const name = uuidv4() + "" + GET_EXT( image.type );
            const buffer = Buffer.from( image.data, 'base64' );

            fs.writeFile( `./uploads/${ name }`, buffer, ( err ) => {
                if ( err ) {
                    console.error( err );
                    res.status( 500 ).send( 'Error saving the image.' );
                }
            });
            
            await con.query ( 
                `UPDATE SVRAPPS.OP.EventosCombos 
                SET NOMBRE = '${ data.NOMBRE }', DESCRIPCION = '${ data.DESCRIPCION }', PRECIO = ${ data.PRECIO }, ESTATUS = ${ BOOLEAN_TO_INT( data.ESTATUS ) }, IMAGE = '${ `http://localhost:5550/jecor/api/uploads/getFile/${ name }` }'
                WHERE COMBO_ID = ${ id }` 
            );
        }        
        
        const result = await con.query( `SELECT COMBO_ID AS _id, NOMBRE, DESCRIPCION, PRECIO, ESTATUS, IMAGE FROM SVRAPPS.OP.EventosCombos WHERE COMBO_ID = ${ id }` );

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
    _post,
    _post_delete_image,
    _post_delete,
    _put,
}