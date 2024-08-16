var firebird = require('node-firebird');

const firebird_connection = {
    user: 'SYSDBA',
    password: "B0l@g3t1tJ",
    host: '192.168.15.201',
    port: 3050,
    database: 'E:/Bases de Datos/JECOR 2020.FDB',
}

const AC = {
    name: "AC", 
    user: 'SYSDBA',
    password: "B0l@g3t1tJ",
    host: '192.168.20.200',
    port: 3050,
    database: 'E:/Bases de Datos/JECOR 2020.FDB',
    // database: 'E:/Bases de Datos/JECOR PRUEBAS.FDB', // AC - TESTING
}

const G32 = {
    name:"G32", 
    user: 'SYSDBA',
    password:  "B0l@g3t1tJ",
    host: '192.168.15.200',
    port: 3051,
    database: 'E:/Bases Datos/JECOR 2020.FDB',
}

const G32_HISTORICA = {
    name:"G32", 
    user: 'SYSDBA',
    password:  "B0l@g3t1tJ",
    host: '192.168.15.200',
    port: 3051,
    database: 'E:/Bases datos/JECOR 2022 HISTORICA.FDB',
}

const CIMA = {
    name: "CIMA",
    user: 'SYSDBA',
    password: "B0l@g3t1tJ",
    host: '192.168.15.200',
    port: 3051,
    database: 'E:/Bases Datos/ADI 2020.FDB',
}

const TURCIO = {
    name: "TURCIO",
    user: 'SYSDBA',
    password: 'masterkey',
    host: '192.168.40.200',
    port: 3053,
    database: 'E:/Bases de datos/JECOR 2018.FDB',
}

const TIANGUIS = {
    name: "TIANGUIS",
    user: 'SYSDBA',
    password: 'masterkey',
    host: '192.168.40.200',
    port: 3053,
    database: 'E:/Bases de datos/ADI 2019.FDB',
}

const PAEZ = {
    name: "PAEZ",
    user: 'SYSDBA',
    password: 'masterkey',
    host: '192.168.30.200',
    port: 3052,
    database: 'E:/Bases de datos/JECOR PAEZ STILLE.FDB',
}

const COLIMA = {
    name: "COLIMA",
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    // host: '192.168.50.201',
    host: 'colimajec.ddns.net',
    port: 3054,
    database: 'E:/Bases de datos/JECOR SA DE CV 2018.FDB',
}

const VILLA = {
    name: "VILLA",
    user: 'SYSDBA',
    password: 'T1csyst3m@',
    host: '192.168.60.200',
    // host: 'villajecor.ddns.net',
    port: 3055,
    database: 'E:/Bases de datos/JECOR SA DE CV.FDB',
}

const COLINAS = {
    name: "COLINAS",
    user: 'SYSDBA',
    password: 'masterkey',
    host: 'villarey.ddns.net',
    port: 3056,
    database: 'E:/Bases de datos/JECOR 2020.FDB',
}

const VIVERO = {
    name: "VIVERO",
    user: 'SYSDBA',
    password: "B0l@g3t1tJ",
    host: '192.168.10.200',
    port: 3051,
    database: 'E:/Bases Datos/VIVERO 2020.FDB',
}

const GET_CONNECTIONS_CONFIGURATION = () => {
    return { AC, G32, G32_HISTORICA, CIMA, TURCIO, TIANGUIS, PAEZ, COLIMA, VILLA, COLINAS, VIVERO }
    // return { AC }
}

const GET_ALMACENES_BY_NAME = ( ALMACEN ) => {
    switch( ALMACEN ){
        case "AC": return AC 
        case "G32": return G32 
        case "TURCIO": return TURCIO 
        case "TIANGUIS": return TIANGUIS 
        case "PAEZ": return PAEZ
        case "COLIMA": return COLIMA 
        case "VILLA": return VILLA
        case "COLINAS": return COLINAS 
        default: return AC
    }
}

const GET_ALMACENES_BY_CONNECTION = ( ALMACEN ) => {
    switch( ALMACEN ){
        
        case "AC": {
            return [
                { id: 181613, name: "4-ALMACEN GENERAL CEDIS" },
                { id: 181614, name: "5-ALBERTO CARDENAS" },
                { id: 662747, name: "6-CEDIS RUTA"},
            ]
        }

        case "G32": {
            return [
                { id: 303676, name: "1-ALMACEN CENTRO" },
                { id: 303677, name: "2-ESMERALDA MATRIZ GORDOA 10" },
                { id: 359026, name: "ALMACEN LA CIMA" },
            ]
        }

        // case "CIMA": {
        //     return []
        // }
        
        case "TURCIO": {
            return [
                { id: 179263, name: "6-SUCURSAL TURCIO" },
            ]
        }
        
        case "TIANGUIS": {
            return [
                { id: 31906794, name: "LA CIMA 2 (PLASTICOS)" },
                { id: 37698592, name: "ALMACEN ADY1 TURCIO" },
                { id: 31906795, name: "ALMACEN ADY2 TURCIO" },
                { id: 31907026, name: "ALMACEN RUBEN FAJARDO" },
            ]
        }
        
        case "PAEZ": {
            return [
                { id: 186107, name: "1-PAEZ STILLE" },
            ]
        }
        
        case "COLIMA": {
            return [
                { id: 3111, name: "ALMACEN COLIMA" },
                { id: 464117, name: "REPOSTERIA COLIMA (KONFECTURE)" },
                { id: 3112, name: "INSUMOS COLIMA" },
                { id: 3113, name: "CEREALES CORTES COLIMA" },
            ]
        }
        
        case "VILLA": {
            return [
                { id: 5367, name: "ALMACEN VILLA" }
            ]
        }
        
        case "COLINAS": {
            return [
                { id: 3012, name: "VILLA REY" }
            ]
        }
        
        // case "VIVERO": {
        //     return [

        //     ]
        // }
        
        default: return []
    }
}

const GET_CONNECTION = async ( connection = AC ) => {
    try{
        const con =  await new Promise((resolve, reject) => {
            firebird.attach( connection, (err, db) => {
                // if (err) throw err;
                if (err) resolve( null )
                resolve( db )
            });
        });
        return con;
    } catch(e){
        return null;
    }
}

const SEND = async ( db, query ) => {
    if( db !== null ){
        return new Promise(( resolve, reject ) => {
            db.query( query, (err, res) => {
                if (err) throw err;
                resolve(res);
                db.detach();
            })
        })
    }else{
        return null
    }
};

const SEND_NO_DISCONNECT = async (db, query) => {
    if( db !== null ){       
        return new Promise((resolve, reject) => {         
            db.query(query, (err, res) => {
                if (err) throw err;           
                resolve(res);
            })
        })
    }else{
        return null
    }
};

const SEND_NO_DISCONNECTXSP = async (db, query) => {
    if( db !== null ){      
        return new Promise((resolve, reject) => {
            console.log(query);
            db.execute(query, (err, res) => {
                if (err) throw err;            
                resolve(res);
                db.detach();
            })
        })
    }else{
        return null
    }
};

module.exports = { 
    GET_CONNECTION, 
    SEND,
    SEND_NO_DISCONNECT,
    GET_CONNECTIONS_CONFIGURATION,
    GET_ALMACENES_BY_CONNECTION,
    GET_ALMACENES_BY_NAME,
    SEND_NO_DISCONNECTXSP 
};