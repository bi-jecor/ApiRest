const { get_connection } = require( '../database/sqlserver.connections' );

const _get = async ( req, res ) => {
    try {
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosAgenda` ); 

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

const _post_one = async ( req, res ) => {
    try {
        const user = req.body.user;
        
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosAgenda WHERE USUARIO = '${ user }'` ); 

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

const _post_one_details = async ( req, res ) => {
    try {
        const id = req.body._id;
        
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosAgendaDetalles WHERE AGENDA_ID = ${ id }` ); 

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
        const agenda = req.body.agenda;
        const agenda_det = req.body.agenda_det;
        
        const con = await get_connection();
        await con.query( `
        INSERT INTO SVRAPPS.OP.EventosAgenda ( USUARIO, FECHA_EVENTO, TOTAL, TIPO_ENTREGA, FECHA_CREACION, TIPO_ESTATUS, IMPUESTO ) 
        VALUES ( '${ agenda.USUARIO }', ${ agenda.FECHA_EVENTO === null ? agenda.FECHA_EVENTO : `'${ agenda.FECHA_EVENTO }'` }, ${ agenda.TOTAL }, '${ agenda.TIPO_ENTREGA }', '${ agenda.FECHA_CREACION }', 'P', ${ agenda.IMPUESTO } )` 
        )

        const AGENDA_ID = await con.query( `
        SELECT TOP 1 MAX( AGENDA_ID ) AS AGENDA_ID FROM SVRAPPS.OP.xvwEventosAgenda WHERE 
        USUARIO = '${ agenda.USUARIO }' AND TOTAL = ${ agenda.TOTAL } AND FECHA_CREACION = '${ agenda.FECHA_CREACION }' 
        `)
        
        var queries = `INSERT INTO SVRAPPS.OP.EventosAgendaDetalles ( AGENDA_ID, PRODUCTO_ID, TIPO_PRODUCTO, UNIDADES, PRECIO ) `;
        agenda_det.forEach( function ( item, index ) {
            queries += `SELECT ${ AGENDA_ID.recordset[0].AGENDA_ID }, ${ item.ID }, '${ item.TIPO_PRODUCTO }', ${ item.UNIDADES }, ${ item.PRECIO } `
            if( index !== agenda_det.length -1 ) { 
                queries += 'UNION ALL '
            }
        });
        
        await con.query( queries );
        const result = await con.query( `SELECT * FROM SVRAPPS.OP.xvwEventosAgenda` );

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
    // try {
    //     const id = req.body._id;
    //     const selected = req.body.selected;

    //     const con = await get_connection();
    //     await con.query( `DELETE FROM SVRAPPS.OP.EVENTSCOMBOSARTICLES WHERE COMBO_ID = ${ id } AND ARTICULO_ID = ${ selected._id }` );        
    //     const result = await con.query( `SELECT * FROM SVRAPPS.OP.XVWEVENTSCOMBOSARTICLES WHERE COMBO_ID = ${ id }` );
        
    //     return res.json({
    //         ok: true,   
    //         result: result.recordset
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
    _post,
    _post_one,
    _post_one_details,
    _post_delete,
}