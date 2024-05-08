const mssql = require( 'mssql' );
const { sql_connection } = require('../database/sqlserver.connections');
const { GET_FIRST_LAST_DAY_WEEK, GET_WEEK, MICROSIP_DATE } = require('../middlewares/time');
const PROCEDURES = require('../database/firebird.procedures');

async function INSERT_COSTOS_PROMEDIOS ( DATE ){
    try {
        let ban = true;
        const date = DATE;
        const endDateWeek = GET_FIRST_LAST_DAY_WEEK( date, "LAST" );
        const week = GET_WEEK( endDateWeek ) -1;
        const year = new Date( date ).getFullYear();
        const con = await mssql.connect( sql_connection );
        
        // 1: CHECK IF IT IS NOT INSERTED IN SQL SERVER THIS WEEK
        const result = await con.query( `SELECT * FROM OP.COSTOS_PROMEDIOS WHERE SEMANA = '${ week }' AND ANIO = '${ year }'` )
        if( result.recordset.length === 0 ){
            
            // 2: GET DATA FROM MICROSIP
            const costos_promedios_microsip = await PROCEDURES.get_costos_promedios_microsip( MICROSIP_DATE( endDateWeek ) );

            // 3: INSERT DATA TO SQL SERVER
            var queries = 'INSERT INTO OP.COSTOS_PROMEDIOS ';
            costos_promedios_microsip.forEach( function ( item, index ) {
                queries += `SELECT '${ item.CLAVE_ARTICULO }', ${ item.COSTO_PROMEDIO }, ${ week }, ${ year } `
                if( index !== costos_promedios_microsip.length -1 ) { 
                    queries += 'UNION ALL '
                }
            });
            // console.log ( queries );
            await con.query( queries );
            console.log( "[ WEEK: "+ week + " YEAR: "+ year +" ]  SUCCESSFUL INSERT ✓" );
        } else {
            ban = false
            console.log( "[ WEEK: "+ week + " YEAR: "+ year +" ]  ALREADY INSERTED  X" );
        }
        await con.close();
        return ban;
    } catch (error) {
        console.log(error)
        return false;
    }
}

async function INSERT_MANY_COSTOS_PROMEDIOS( start, end ){
    let week = 604800000;
    let timer = new Date().getTime();
    let startTime = GET_FIRST_LAST_DAY_WEEK( start, "LAST" ).getTime();
    let endTime = new Date( end ).getTime();
    
    let result = null;
    let results = [];
    for( i = startTime; i <= endTime; i = i + week ){
        result = await INSERT_COSTOS_PROMEDIOS( i );
        results.push({ date: new Date( i ), result: result });
    }   
    console.log( `TIME TOTAL: ${ new Date().getTime() - timer } miliseconds`  );
    return results;
}

async function INSERT_CURRENT_COSTOS_PROMEDIOS(){
    const timer = new Date().getTime();
    const currentTime = GET_FIRST_LAST_DAY_WEEK( new Date(), "LAST" ).getTime();
    const result = await INSERT_COSTOS_PROMEDIOS( currentTime );
    console.log( `TIME TOTAL: ${ new Date().getTime() - timer } miliseconds`  );
    return result;
}

module.exports = {
    INSERT_COSTOS_PROMEDIOS,
    INSERT_MANY_COSTOS_PROMEDIOS,
    INSERT_CURRENT_COSTOS_PROMEDIOS
} 