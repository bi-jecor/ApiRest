const { GET_TIME, MICROSIP_DATE } = require('../middlewares/time');
const { SEND_MAIL } = require( '../middlewares/email' );
const PROCEDURES = require('../database/firebird.procedures');
const MIGRATION = {}

MIGRATION.INSERT_CURRENT_COSTOS_PROMEDIOS = async () =>  {

    const time = GET_TIME( null, -12 );
    const result = await PROCEDURES.insert_costos_promedios( time );
    
    console.log( `TIME TAKEN: ${ new Date().getTime() - time } miliseconds`  );
    return result;
}

MIGRATION.INSERT_MANY_COSTOS_PROMEDIOS_BY_DAY = async ( start, end, step = 1 ) => {
    
    const day = 86400000;
    const timer = new Date().getTime();
    const start_time = new Date( start ).getTime();
    const end_time = new Date( end ).getTime();

    try {
        for( i = start_time; i <= end_time; i = i + ( day * step ) ){
            await PROCEDURES.insert_costos_promedios( i );
            // console.log( new Date( i ) );
        }   
    } catch ( e ) {
        console.log( e );
        return new Date().getTime() - timer;
    }
    
    const finish_time =  new Date().getTime() - timer;
    console.log( `TIME TAKEN: ${ finish_time } miliseconds`  );
    return finish_time;
}

MIGRATION.INSERT_CURRENT_EXISTENCIA = async () =>  {
    const timer = new Date().getTime();
    await PROCEDURES.insert_all_existencias();
    
    const result = new Date().getTime() - timer;
    console.log( `TIME TAKEN: ${ result } miliseconds`  );
    return result;
}

MIGRATION.INSERT_MANY_EXISTENCIA_BY_DAY = async ( start, end ) => {
    
    const day = 86400000;
    const timer = new Date().getTime();
    const start_time = new Date( start ).getTime();
    const end_time = new Date( end ).getTime();

    try {
        for( i = start_time; i <= end_time; i = i + day ){
            console.log( `\n${ MICROSIP_DATE( i, 6 ) } IN PROCESS...` )
            await PROCEDURES.insert_all_existencias( i );
        }   
    } catch ( e ) {
        console.log( e );
        return new Date().getTime() - timer;
    }
    
    const finish_time =  new Date().getTime() - timer;
    console.log( `TIME TAKEN: ${ finish_time } miliseconds`  );
    return finish_time;
}

MIGRATION.INSERT_CURRENT_DOCTOS_CM = async () =>  {
    const result = await PROCEDURES.insert_all_doctos_cm();
    console.log( `TIME TAKEN: ${ result } miliseconds`  );
    return result;
}

MIGRATION.INSERT_MANY_DOCTOS_CM_BY_DAY = async ( start, end ) => {
    
    const day = 86400000;
    const timer = new Date().getTime();
    const start_time = new Date( start ).getTime();
    const end_time = new Date( end ).getTime();

    try {
        for( i = start_time; i <= end_time; i = i + day ){
            console.log( `\n${ MICROSIP_DATE( i, 6 ) } IN PROCESS...` )
            await PROCEDURES.insert_all_doctos_cm( i );
        }   
    } catch ( e ) {
        console.log( e );
        return new Date().getTime() - timer;
    }
    
    const finish_time =  new Date().getTime() - timer;
    console.log( `TIME TAKEN: ${ finish_time } miliseconds`  );
    return finish_time;
}

MIGRATION.INSERT_CURRENT_ARTICLES_PRICES = async () =>  {
    const timer = new Date().getTime();
    const response = await PROCEDURES.insert_articles_prices();

    if( response === false ){
        const to = "francisco.becerra@jecor.com.mx";
        const subject = "Notificacion de error";
        const message = "El centro de notificaciones de jecor te ha enviado un mensaje de error detectado en el proceso [ INSERT_CURRENT_ARTICLES_PRICES ]";
        SEND_MAIL( to, subject, message );
    }
    
    const result = new Date().getTime() - timer;
    console.log( `TIME TAKEN: ${ result } miliseconds`  );
    return result;
}

module.exports = MIGRATION;