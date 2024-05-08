const mssql = require( 'mssql' );
const PROCEDURES = require('../database/firebird.procedures');

const { get_connection } = require('../database/sqlserver.connections');
const { CLEAR_DATA_BUFFER } = require('../middlewares/data');
const { MICROSIP_DATE, SQLSERVER_DATE } = require('../middlewares/time');

const _get = async (req, res) => {
    try {
        const result = await PROCEDURES.get_fill_rate_prov();
        res.json({
            ok: true,
            result: CLEAR_DATA_BUFFER(result)
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _get_fill_rate_range = async (req, res) => {
    try {
        const start = MICROSIP_DATE( req.body.start, -6 );
        const end = MICROSIP_DATE( req.body.end, 6 );
        const result = await PROCEDURES.get_fill_rate_prov_range( start, end );;
        
        res.json({
            ok: true,
            result: CLEAR_DATA_BUFFER( result, [ "PROVEEDOR", "ARTICULO" ])
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _get_time_invoice = async (req, res) => {
    try {
        const start = SQLSERVER_DATE( req.body.start, -6 );
        const end = SQLSERVER_DATE( req.body.end, 6 );
        const con = await get_connection();
        const result = await con.query( `SELECT * FROM OP.TIEMPOSENTREGAFILLRATE WHERE DATE BETWEEN '${ start }' AND '${ end }'` );
        
        res.json({
            ok: true,
            result: result.recordset,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _post_time_invoice = async (req, res) => {
    try {
        const data = req.body.data;
        const start = SQLSERVER_DATE( req.body.start, -6 );
        const end = SQLSERVER_DATE( req.body.end, 6 );
        const con = await get_connection();

        // 1: REMOVE FOLIOS
        await con.query( `DELETE OP.TIEMPOSENTREGAFILLRATE WHERE DATE BETWEEN '${ start }' AND '${ end }'` );

        // 2: INSERT FOLIOS
        var queries = 'INSERT INTO OP.TIEMPOSENTREGAFILLRATE ( FOLIO, DATE, TIME) ';
        data.forEach( function ( item, index ) {
            queries += `SELECT '${ item.FOLIO }', '${ item.date }', ${ item.time } `
            if( index !== data.length -1 ) { 
                queries += 'UNION ALL '
            }
        });
        await con.query( queries );

        // 3: GET DATA
        const result = await con.query( `SELECT * FROM OP.TIEMPOSENTREGAFILLRATE WHERE DATE BETWEEN '${ start }' AND '${ end }'` );
        
        res.json({
            ok: true,
            result: result.recordset,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

module.exports = {
    _get,
    _get_fill_rate_range,
    _get_time_invoice,
    _post_time_invoice
}