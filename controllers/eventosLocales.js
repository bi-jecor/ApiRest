const { get_connection } = require( '../database/sqlserver.connections' );
const { BOOLEAN_TO_INT, GET_EXT } = require( '../middlewares/data' );
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');


const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosLocales` );

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

            await con.query( `INSERT INTO SVRAPPS.OP.EventosLocales 
            ( ESTATUS, NOMBRE, DESCRIPCION, CALLE, CIUDAD, ESTADO, PRECIO, NUM_INVITADOS, DURACION_RENTA, NUM_ESTACIONAMIENTOS, CON_CANCELACION, CON_PAGO, REGLAS, NUM_EMERGENCIA ) VALUES
            ( ${ BOOLEAN_TO_INT( data.ESTATUS ) }, '${ data.NOMBRE }', '${ data.DESCRIPCION }', '${ data.CALLE }', '${ data.CIUDAD }', '${ data.ESTADO }', ${ data.PRECIO }, ${ data.NUM_INVITADOS }, ${ data.DURACION_RENTA }, ${ data.NUM_ESTACIONAMIENTOS }, '${ data.CON_CANCELACION }', '${ data.CON_PAGO }', '${ data.REGLAS }', '${ data.NUM_EMERGENCIA }' )` );
        
        } else {
            const name = uuidv4() + "" + GET_EXT( image.type );
            const buffer = Buffer.from( image.data, 'base64' );

            fs.writeFile( `./uploads/${ name }`, buffer, ( err ) => {
                if ( err ) {
                    console.error( err );
                    res.status( 500 ).send( 'Error saving the image.' );
                }
            });

            await con.query( `INSERT INTO SVRAPPS.OP.EventosLocales 
            ( ESTATUS, NOMBRE, DESCRIPCION, CALLE, CIUDAD, ESTADO, PRECIO, NUM_INVITADOS, DURACION_RENTA, NUM_ESTACIONAMIENTOS, CON_CANCELACION, CON_PAGO, REGLAS, NUM_EMERGENCIA, IMAGE ) VALUES
            ( ${ BOOLEAN_TO_INT( data.ESTATUS ) }, '${ data.NOMBRE }', '${ data.DESCRIPCION }', '${ data.CALLE }', '${ data.CIUDAD }', '${ data.ESTADO }', ${ data.PRECIO }, ${ data.NUM_INVITADOS }, ${ data.DURACION_RENTA }, ${ data.NUM_ESTACIONAMIENTOS }, '${ data.CON_CANCELACION }', '${ data.CON_PAGO }', '${ data.REGLAS }', '${ data.NUM_EMERGENCIA }', '${ `http://localhost:5550/jecor/api/uploads/getFile/${ name }` }' )` );
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

        await con.query( `DELETE FROM SVRAPPS.OP.EventosLocales WHERE LUGAR_ID = '${ id }'` );
        // const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosLocales` );

        return res.json({
            ok: true,   
            // result: result.recordset
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

        await con.query( `UPDATE SVRAPPS.OP.EventosLocales SET IMAGE = ${ null } WHERE LUGAR_ID = ${ id }` ); 
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosLocales WHERE _id = ${ id }` );

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
            
            await con.query( `UPDATE SVRAPPS.OP.EventosLocales SET 
            ESTATUS = ${ BOOLEAN_TO_INT( data.ESTATUS ) }, NOMBRE = '${ data.NOMBRE }', DESCRIPCION = '${ data.DESCRIPCION }', CALLE = '${ data.CALLE }', CIUDAD = '${ data.CIUDAD }', ESTADO = '${ data.ESTADO }', PRECIO = ${ data.PRECIO }, NUM_INVITADOS = ${ data.NUM_INVITADOS }, DURACION_RENTA = ${ data.DURACION_RENTA }, NUM_ESTACIONAMIENTOS = ${ data.NUM_ESTACIONAMIENTOS }, CON_CANCELACION = '${ data.CON_CANCELACION }', CON_PAGO = '${ data.CON_PAGO }', REGLAS = '${ data.REGLAS }', NUM_EMERGENCIA = '${ data.NUM_EMERGENCIA }'
            WHERE LUGAR_ID = '${ id }'`);

        } else {
            const name = uuidv4() + "" + GET_EXT( image.type );
            const buffer = Buffer.from( image.data, 'base64' );

            fs.writeFile( `./uploads/${ name }`, buffer, ( err ) => {
                if ( err ) {
                    console.error( err );
                    res.status( 500 ).send( 'Error saving the image.' );
                }
            });
            
            await con.query( `UPDATE SVRAPPS.OP.EventosLocales SET 
            ESTATUS = ${ BOOLEAN_TO_INT( data.ESTATUS ) }, NOMBRE = '${ data.NOMBRE }', DESCRIPCION = '${ data.DESCRIPCION }', CALLE = '${ data.CALLE }', CIUDAD = '${ data.CIUDAD }', ESTADO = '${ data.ESTADO }', PRECIO = ${ data.PRECIO }, NUM_INVITADOS = ${ data.NUM_INVITADOS }, DURACION_RENTA = ${ data.DURACION_RENTA }, NUM_ESTACIONAMIENTOS = ${ data.NUM_ESTACIONAMIENTOS }, CON_CANCELACION = '${ data.CON_CANCELACION }', CON_PAGO = '${ data.CON_PAGO }', REGLAS = '${ data.REGLAS }', NUM_EMERGENCIA = '${ data.NUM_EMERGENCIA }', IMAGE = '${ `http://localhost:5550/jecor/api/uploads/getFile/${ name }` }'
            WHERE LUGAR_ID = '${ id }'`);
        }        
        
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosLocales WHERE _id = ${ id }` );

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
    _post_delete,
    _post_delete_image,
    _put,
}