const { get_connection } = require('../database/sqlserver.connections');
const { GET_TIME, SQLSERVER_DATE } = require('../middlewares/time');
PROCEDURES = {};

PROCEDURES.get_log_of_sincronization = async () => {
    try{
        const con = await get_connection();
        const sincronizacion = await con.query( "SELECT * FROM OP.BITACORASINCRONIZACION WHERE ULTIMA_ACTUALIZACION < DATEADD(DAY, -1,  CAST( GETDATE() AS DATE ))" );
        return sincronizacion.recordset;

    } catch (error) {
        console.log(error)
        return false
    }
}

PROCEDURES.update_bitacora_sincronizacion = async ( process_name = null, date = null, add = 6 ) => {
    
    if( process_name === null ) return false;

    if( date === null ){
        date = SQLSERVER_DATE( null, -6 );
    } else {
        date = SQLSERVER_DATE( date, add );
    }
    
    try{
        const con = await get_connection();
        await con.query(`EXEC [op].[xspActualizarBitacoraSincronizacion] @PROCESS = '${ process_name }', @DATE = '${ date }'`);
        console.log(`@PROCESS: '${ process_name }' @DATE: '${ date }'`);
        return true;
    } catch ( error ) {
        console.log( error );
        return false
    }
}

PROCEDURES.get_doctos_diff_costo = async () => {
    try{
        const con = await get_connection();
        const result = await con.query(`SELECT * FROM OP.DOCTOSDIFFCOSTO`);
        return result.recordset;
    } catch ( error ) {
        console.log( error );
        return false
    }
}

PROCEDURES.get_forecast_pending_supplier = async () => {
    try{
        const con = await get_connection();
        const result = await con.query(`
            SELECT * 
            FROM op.xvwSugeridoCompra S 
            ORDER BY S.PEDIDO_PIEZAS DESC
        `);
        return result.recordset;
    } catch ( error ) {
        console.log( error );
        return false
    }
}

PROCEDURES.get_forecast_articles_in_zero = async () => {
    try{
        const con = await get_connection();
        const result = await con.query(`
            SELECT * 
            FROM op.xvwExistenciasZero Z 
            ORDER BY Z.ULTIMA_EXISTENCIA DESC
        `);
        return result.recordset;
    } catch ( error ) {
        console.log( error );
        return false
    }
}

PROCEDURES.get_doctos_inms_neg_today = async ( time = null ) => {
    try{
        const con = await get_connection();
        const today = SQLSERVER_DATE( time, -24 );
        const result = await con.query(`SELECT * FROM OP.DoctosINMS_NEG WHERE FECHA = '${ today }'`);
        return result.recordset;
    } catch ( error ) {
        console.log( error );
        return false
    }
}


module.exports = PROCEDURES;