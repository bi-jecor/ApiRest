const schedule = require('node-schedule');
const MIGRATION = require('../processors/migration');
const NOTIFICATIONS = require('../processors/notifications');
const MONITORING = require('../processors/monitoring');
// EJEMPLOS DE PERIODOS DE TIMEPO: https://crontab.guru/examples.html
// *:MINUTES  *:HOURS *:DAY_MONTH *MONTHS *DAY_WEEK
// */30 * * * * * each 30 seconds

const startRutines = () => {

    // *******************   MONITORING   *******************
    schedule.scheduleJob('00 06 * * *', async function(){
        await MONITORING.CHECK_SINCRONIZACION_ESTATUS();
    })

    schedule.scheduleJob('30 0 * * *', async function(){
        await MONITORING.CHECK_MONGODB_BACK_UP();
    })
    



    // *******************   NOTIFICATIONS   *******************

    schedule.scheduleJob('00 07 * * 1-5', async function(){
        await NOTIFICATIONS.SEND_COSTOS_PROMEDIOS_PENDIENTES();
    })
    
    schedule.scheduleJob('05 07 * * 1-5', async function(){
        await NOTIFICATIONS.SEND_FORECAST_COMPRAS_PENDIENTES();
    })
    
    schedule.scheduleJob('10 07 * * 1-5', async function(){
        await NOTIFICATIONS.SEND_EXISTENCIAS_NEGATIVOS('CIERRE');
    })

    schedule.scheduleJob('05 09 * * MON', async function(){
        await NOTIFICATIONS.SEND_TRASPASOS_PENDIENTES('NOTIFICACION');
    })
    
    schedule.scheduleJob('00 17 * * MON', async function(){
        await NOTIFICATIONS.SEND_TRASPASOS_PENDIENTES('CIERRE');
    })




    // *******************   MIGRATION   *******************

    schedule.scheduleJob('00 22 * * *', async function(){
        await MIGRATION.INSERT_ARTICULOS_PRECIOS();
    })

    schedule.scheduleJob('05 22 * * *', async function(){
        await MIGRATION.INSERT_ARTICULOS_CLAVES();
    })

    schedule.scheduleJob('10 22 * * *', async function(){
        await MIGRATION.INSERT_ARTICULOS_COMPRAS();
    })

    schedule.scheduleJob('15 22 * * *', async function(){
        await MIGRATION.INSERT_ARTICULOS_DEVOLUCIONES();
    })

    schedule.scheduleJob('20 22 * * *', async function(){
        await MIGRATION.INSERT_ARTICULOS_RECEPCIONES();
    })
    
    schedule.scheduleJob('25 22 * * *', async function(){
        await MIGRATION.INSERT_ARTICULOS_EXISTENCIA();
    })

    /* Prueba de codigo */
    schedule.scheduleJob('25 22 * * *', async function(){
        await MIGRATION.INSERT_ARTICULOS_EXISTENCIA();  
    })
    
}
module.exports = { startRutines }