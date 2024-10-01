var firebird = require('node-firebird');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fir_password = process.env.FIR_PASSWORD


const AC = {
    // FIREBIRD CONFIG
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.20.200',
    port: 3050,
    database: 'E:/Bases de Datos/JECOR 2020.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
    // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 1014,
    tasa0: 1009,
    ieps8: 1017,
    ieps6: 700964,
    ieps30: 3026741,
    exento: 1018,
    keysArticlesIds : '17,18,288'

}

const G32 = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.15.200',
    port: 3051,
    database: 'E:/Bases Datos/JECOR 2020.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 213981,
    tasa0: 213974,
    ieps8: 213988,
    ieps6: 242250,
    ieps30: 483274,
    exento: 231875,
    keysArticlesIds : '17,18,4185',
    companyPriceId:3276
}
const G32H = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.15.200',
    port: 3051,
    database: 'E:/Bases Datos/JECOR 2022 HISTORICA.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 694,
    tasa0: 689,
    ieps8: 698,
    ieps6: 702,
    ieps30: 483274,
    exento: 231875,
    keysArticlesIds : '17,18,288',
    companyPriceId:3276
}

const TURCIO = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    //host: '192.168.15.202',
    host: '192.168.40.200',
    
    port: 3053,
    database: 'E:/Bases de datos/JECOR 2018.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 922,
    tasa0: 917,
    ieps8: 925,
    ieps6: 342776,
    ieps30: 543614,
    exento: 926,
    keysArticlesIds : '17,18,288',
    companyPriceId:16326
}

const TIANGUIS = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    //password: 'B0l@g3t1tJ',
    // host: '192.168.15.202',
    host: '192.168.40.200',
    port: 3053,
    database: 'E:/Bases de datos/ADI 2019.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
     // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 1014,
    tasa0: 1009,
    ieps8: 1017,
    ieps6: 342776,
    ieps30: 37732487,
    exento: 33323230,
    keysArticlesIds : '17,12465,25863515',
    // keysArticlesIds : '17,18,288',
    companyPriceId:28548960
}

const PAEZ = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.30.200',
    //host: '192.168.15.203',    
    port: 3052,
    database: 'E:/Bases de datos/JECOR PAEZ STILLE.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 1128,
    tasa0: 1123,
    ieps8: 1132,
    ieps6: 1136,
    ieps30: 579459,
    exento: 1131,
    keysArticlesIds : '17,18,288'
}

const COLIMA = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    // host: 'colima-jrczrpbtpk.dynamic-m.com',
    host: '192.168.50.201',
    port: 3054,
    database: 'E:/Bases de datos/JECOR SA DE CV 2018.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 3192,
    tasa0: 3191,
    ieps8: 5632,
    ieps6: 5636,
    ieps30: 477317,
    exento: 5631,
    keysArticlesIds : '17,18,288'
}

const COLIMAH = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    // host: 'colima-jrczrpbtpk.dynamic-m.com',
    host: '192.168.50.201',
    port: 3054,
    database: 'E:/Bases de datos/JECOR SA DE CV 2018_HISTORICA.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 391,
    tasa0: 3191,
    ieps8: 5632,
    ieps6: 5636,
    ieps30: 477317,
    exento: 5631,
    keysArticlesIds : '17,18,288'
}

const VILLA = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.60.200',
    // host: '192.168.60.200',
    port: 3055,
    database: 'E:/Bases de datos/JECOR SA DE CV.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 5806,
    tasa0: 5801,
    ieps8: 5809,
    ieps6: 5816,
    ieps30: 437718,
    exento: 5810,
    keysArticlesIds : '17,18,288'
}
const VILLAH = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.60.200',
    // host: '192.168.60.200',
    port: 3055,
    database: 'E:/Bases de datos/JECOR SA DE CV historica.FDB.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 5806,
    tasa0: 5801,
    ieps8: 5809,
    ieps6: 5816,
    ieps30: 437718,
    exento: 5810,
    keysArticlesIds : '17,18,288'
}

const COLINAS = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    // host: 'colima-jrczrpbtpk.dynamic-m.com',
    host: '192.168.80.200',
    port: 3056,
    database: 'E:/Bases de datos/JECOR 2020.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 3381,
    tasa0: 3376,
    ieps8: 3385,
    ieps6: 3389,
    ieps30: 3059918,
    exento: 3384,
    keysArticlesIds : '17,18,288'
}

const test = {
    host : '127.0.0.1',
    port : 3050,
    database : 'C:/Microsip Datos/JECOR_PRUEBAS.FDB',
    user : 'SYSDBA',
    password : 'masterkey',
    lowercase_keys : false, // set to true to lowercase key,
    role : null, // defaul,
    pageSize : 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 694,
    tasa0: 689,
    ieps8: 698,
    keysArticlesIds : '17,18,288'
    
}

const VIVERO = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.10.200',
    port: 3051,
    database: 'E:/Bases Datos/VIVERO 2020.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 694,
    tasa0: 689,
    ieps8: 698,
    keysArticlesIds : '17,18,288'
}

const CIMA = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.10.200',
    port: 3051,
    database: 'E:/Bases Datos/ADI 2020.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 694,
    tasa0: 689,
    ieps8: 698,
    keysArticlesIds : '17,12465,25863515',
    companyPriceId: 28548960,
}

const CHAVEZC = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.70.200',
    //port: 3051,
    database: 'E:/Bases de datos/JECOR CHAVEZ CARRILLO.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
        roleKeyProviderId : 49,
        conceptCpId : 51,
        iva16: 11524,
        tasa0: 12604,
        ieps8: 12606,
        ieps6: 13379,
        ieps30: 13392,
        exento: 13375,
        keysArticlesIds : '17,18,288'
}

const ESTACIONAMIENTO = {
    user: 'SYSDBA',
    password: 'B0l@g3t1tJ',
    host: '192.168.15.200',
    port: 3051,
    database: 'E:/Bases Datos/ESTACIONAMIENTO 2020.FDB',
    lowercase_keys: false, 
    role: null,
    pageSize: 4096,
        // POLIZA DATA
    roleKeyProviderId : 49,
    conceptCpId : 51,
    iva16: 213981,
    tasa0: 213974,
    ieps8: 213988,
    ieps6: 242250,
    ieps30: 483274,
    exento: 231875,
    keysArticlesIds : '17,18,4185',
    companyPriceId:3276
}
module.exports = {
    AC,
    G32,
    G32H,
    TURCIO,
    TIANGUIS,   
    PAEZ,
    COLIMA,
    COLIMAH,
    VILLA,
    VILLAH,
    COLINAS,
    VIVERO,
    test,
    CIMA,
    CHAVEZC,
    ESTACIONAMIENTO
};