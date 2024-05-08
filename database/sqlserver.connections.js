const mssql = require( 'mssql' );

let pool = null;
const sql_connection = {
    user: "sa",
    password: "SqlBij3c0r",
   database: "SVRJECORBI",
    // database: "SVRBIDES",
    server: "192.168.10.206",
    requestTimeout: 300000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

async function get_connection(){
    if( pool === null ) pool = await mssql.connect( sql_connection ); 
    return pool
}

module.exports = { sql_connection, get_connection }