const { get_connection } = require('../database/sqlserver.connections');
const { GET_CONNECTION, SEND, SEND_NO_DISCONNECT, GET_ALMACENES_BY_NAME,GET_CONNECTIONS_CONFIGURATION,SEND_NO_DISCONNECTXSP } = require('./firebird.connections');
const { QUERY } = require('./firebird.querys');
const { GET_CURRENT_DATE_BD, MICROSIP_DATE, SQLSERVER_DATE } = require('../middlewares/time');
const { CLEAR_DATA_BUFFER } = require('../middlewares/data');
const { TOTAL } = require('../middlewares/data');
const { GET_TIME } = require('../middlewares/time');
const { Int, VarChar } = require('mssql');

let PROCEDURES = {};

PROCEDURES.update_microsip_table = async (provId) => {
    try {
    const db = await GET_CONNECTION();
    /*Consulta la relación artículo proveedor, existencia, costo y folio */
    const stocks = await SEND_NO_DISCONNECT(db, QUERY.EXISTENCIAS(provId));
    return stocks;  
    
    }
    catch(error)
    {
        console.log(error);
        return null
    }
   
}

PROCEDURES.borraProvArt = async (provId) => {
    const db = await GET_CONNECTION();
    /*Borra el contenido de la tabla de microsip del proveedor consultado */
    const br = await SEND_NO_DISCONNECT(db, QUERY.BORRA_PROV_ART(provId));
    return br;
}

PROCEDURES.instertaRelacionProvArt = async (artsProv, res) => {
    try {
        const db = await GET_CONNECTION();      
        artsProv.forEach(async (artPro) => {
            //console.log(QUERY.INSERTA_PROV_ART(artPro.proveedorId,artPro.claveArticulo));
            await SEND(db, QUERY.INSERTA_PROV_ART(artPro.proveedorId, artPro.claveArticulo));           
        });
    } catch (error) {
        console.log(error)       
    }
}

PROCEDURES.insert_doctos_dc = async (user, supplier_MSS, data) => {
    const db = await GET_CONNECTION();

    const supplier = await SEND_NO_DISCONNECT(db, QUERY.GET_SUPPLIER_BY_NAME(supplier_MSS.NOMBRE));
    const supplier_clean = CLEAR_DATA_BUFFER(supplier);
    const next_invoice = await SEND_NO_DISCONNECT(db, QUERY.GET_NEXT_INVOICE);
    const next_docto_cm_id = await SEND_NO_DISCONNECT(db, QUERY.GET_NEXT_DOCTO_CM_ID);
    // const next_docto_cm_id = await SEND( db, QUERY.GET_NEXT_DOCTO_CM_ID );
    // console.log( supplier_clean );

    // console.log( QUERY.INSERT_DOCTOS_CM({ 
    await SEND_NO_DISCONNECT(db, QUERY.INSERT_DOCTOS_CM({
        USER: user,
        DOCTO_CM_ID: next_docto_cm_id[0].DOCTO_CM_ID,
        FOLIO: "AOC0" + next_invoice[0].CONSECUTIVO,
        FECHA: GET_CURRENT_DATE_BD(),
        CLAVE_PROV: supplier_clean[0].CLAVE_PROV,
        PROVEEDOR_ID: supplier_clean[0].PROVEEDOR_ID,
        FECHA_ENTREGA: GET_CURRENT_DATE_BD(supplier_MSS.TIEMPO_ENTREGA),
        IMPORTE_NETO: TOTAL(data),
        COND_PAGO_ID: supplier_clean[0].COND_PAGO_ID,
        FECHA_HORA_CREACION: GET_CURRENT_DATE_BD(0, 'DATETIME'),
    }))

    // UPDATE AUX TABLE 
    await SEND_NO_DISCONNECT(db, QUERY.UPDATE_NEXT_INVOICE(next_invoice[0].CONSECUTIVO + 1))
    // console.log( QUERY.UPDATE_NEXT_INVOICE( next_invoice[0].CONSECUTIVO +1 ) );

    // INSERT ARTICLES
    data.map(async (i, index) => {
        if (index !== data.length - 1) {
            await SEND_NO_DISCONNECT(db, (QUERY.INSERT_MANY_DOCTOS_CM_DET(next_docto_cm_id[0].DOCTO_CM_ID, i, index + 1)));
        } else {
            await SEND(db, (QUERY.INSERT_MANY_DOCTOS_CM_DET(next_docto_cm_id[0].DOCTO_CM_ID, i, index + 1)));
        }
    })

    return "AOC0" + next_invoice[0].CONSECUTIVO;
}

PROCEDURES.get_fill_rate_prov = async (start, end) => {
    const db = await GET_CONNECTION();
    return await SEND(db, QUERY.P_GET_JEC_PRV_FILL_RATE_WEB);
}

PROCEDURES.get_fill_rate_prov_range = async (START, END) => {
    const db = await GET_CONNECTION();
    return await SEND(db, QUERY.P_GET_JEC_PRV_FILL_RATE_WEB_RANGE(START, END));
}

PROCEDURES.insert_costos_promedios = async (date) => {
    try {
        const db = await GET_CONNECTION();
        const timer = GET_TIME();
        const microsip_time = MICROSIP_DATE(date, -6);
        const sqlserver_time = SQLSERVER_DATE(date, -6)
        const con = await get_connection();

        // 1: CHECK IF IT IS NOT INSERTED IN SQL SERVER THIS WEEK
        const result = await con.query(`SELECT * FROM OP.COSTOSPROMEDIOSMES WHERE FECHA = '${sqlserver_time}'`)
        if (result.recordset.length === 0) {

            // 2: GET DATA FROM MICROSIP
            // const microsip = await PROCEDURES.get_microsip( microsip_time );
            const microsip = await SEND(db, QUERY.P_GET_JEC_ARTS_ULT_COST_FULL(microsip_time));

            // 3: INSERT DATA TO SQL SERVER
            var queries = 'INSERT INTO OP.COSTOSPROMEDIOSMES ( CLAVE_ARTICULO, COSTO_PROMEDIO, FECHA ) ';
            microsip.forEach(function (item, index) {
                queries += `SELECT '${item.CLAVE_ARTICULO}', ${item.COSTO_PROMEDIO}, '${sqlserver_time}' `
                if (index !== microsip.length - 1) {
                    queries += 'UNION ALL '
                }
            });

            // console.log ( queries );
            await con.query(queries);
            console.log(`[ ✓ ][ INSERT COSTO PROMEDIO ] SUCCESSFUL INSERT ${microsip_time} IN ${GET_TIME() - timer} miliseconds`);
        } else {
            console.log(`[ X ][ INSERT COSTO PROMEDIO ] ALREADY INSERTED ${SQLSERVER_DATE(date)} IN ${GET_TIME() - timer} miliseconds`);
        }
    } catch (error) {
        console.log(error)
    }
}

PROCEDURES.insert_articles_prices = async (date = null) => {
    try {

        const timer = GET_TIME();

        if (date === null) {
            date = MICROSIP_DATE(null, -6);
        } else {
            date = MICROSIP_DATE(date, 6);
        }

        const con = await get_connection();
        const db = await GET_CONNECTION();

        // 1: GET DATA FROM MICROSIP
        const microsip = await SEND_NO_DISCONNECT(db, QUERY.GET_JEC_ARTICULOS_PRECIOS());
        if (microsip === null) {
            console.log(`[ X ][ INSERT ARTICLES PRICES ] NO DATA TO INSERT ${date} IN ${GET_TIME() - timer} miliseconds`);
            return []
        }

        const microsip_clean = await CLEAR_DATA_BUFFER(microsip);
        const articles = await SEND(db, QUERY.P_GET_JEC_ARTICULOS_PRECIO_LIM());
        const articles_clean = await CLEAR_DATA_BUFFER(articles);

        // 2 DROP TABLE 
        await con.query("DELETE OP.DOCTOSPRECIOS");

        // 3: INSERT DATA TO SQL SERVER
        var queries = 'INSERT INTO OP.DOCTOSPRECIOS ( CLAVE_ARTICULO, PRECIO_LISTA, PRECIO_MAYOREO, PRECIO_ESPECIAL, PRECIO_TIENDA, PRECIO_TIENDA_JECOR, PRECIO_MINIMO, PRECIO_CONSUMO_INTERNO ) ';
        microsip_clean.forEach(function (item, index) {
            queries += `SELECT '${item.CLAVE_ARTICULO}', ${item.PRECIO_LISTA}, ${item.PRECIO_MAYOREO}, ${item.PRECIO_ESPECIAL},  ${item.PRECIO_TIENDA}, ${item.PRECIO_TIENDA_JECOR}, ${item.PRECIO_MINIMO}, ${item.PRECIO_CONSUMO_INTERNO} `
            if (index !== microsip_clean.length - 1) {
                queries += 'UNION ALL '
            }
        });
        // console.log( queries )
        await con.query(queries);
        console.log(`[ ✓ ][ INSERT ARTICLES PRICES ] SUCCESSFUL INSERT ${date} IN ${GET_TIME() - timer} miliseconds`);

        return articles_clean;
    } catch (error) {
        console.log(error)
        return [];
    }
}

PROCEDURES.get_claves_articulos_roles = async (date = null) => {
    try {

        const timer = GET_TIME();

        if (date === null) {
            date = MICROSIP_DATE(null, -6);
        } else {
            date = MICROSIP_DATE(date, 6);
        }

        const g32 = GET_ALMACENES_BY_NAME("G32");
        const db = await GET_CONNECTION(g32);

        if (db === null) { return false }
        const con = await get_connection();

        // 1: GET DATA FROM MICROSIP
        const microsip = await SEND(db, QUERY.GET_CLAVES_ARTICULOS_ROL);
        if (microsip.length > 0) {
            const microsip_clean = await CLEAR_DATA_BUFFER(microsip);
            // console.log( microsip_clean );
            // 2 DROP TABLE 
            await con.query("DELETE SVRJECORBI.CAT.ClavesArticulos");

            // 3: INSERT DATA TO SQL SERVER
            var queries = 'INSERT INTO SVRJECORBI.CAT.ClavesArticulos ( ARTICULO_ID, ROL_CLAVE_ART_ID, CLAVE_ARTICULO ) ';
            microsip_clean.forEach(function (item, index) {
                queries += `SELECT ${item.ARTICULO_ID}, ${item.ROL_CLAVE_ART_ID}, '${item.CLAVE_ARTICULO}' `
                if (index !== microsip_clean.length - 1) {
                    queries += 'UNION ALL '
                }
            });
            // console.log( queries )
            await con.query(queries);
            console.log(`[ ✓ ][ INSERT CLAVES ARTICULOS ROLES ] SUCCESSFUL INSERT ${date} IN ${GET_TIME() - timer} miliseconds`);
        } else {
            console.log(`[ X ][ INSERT CLAVES ARTICULOS ROLES ] NO DATA TO INSERT ${date} IN ${GET_TIME() - timer} miliseconds`);
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

PROCEDURES.get_pending_receipts = async (connection) => {
    const db = await GET_CONNECTION(connection);
    const microsip = await SEND(db, QUERY.GET_PENDING_RECEIPTS);
    return await CLEAR_DATA_BUFFER(microsip);
}

PROCEDURES.get_all_pending_receipts = async () => {
    const connections = GET_CONNECTIONS_CONFIGURATION();

    const ac = await PROCEDURES.get_pending_receipts(connections.AC);
    const g32 = await PROCEDURES.get_pending_receipts(connections.G32);
    const turcio = await PROCEDURES.get_pending_receipts(connections.TURCIO);
    const tianguis = await PROCEDURES.get_pending_receipts(connections.TIANGUIS);
    const paez = await PROCEDURES.get_pending_receipts(connections.PAEZ);
    const colima = await PROCEDURES.get_pending_receipts(connections.COLIMA);
    const villa = await PROCEDURES.get_pending_receipts(connections.VILLA);
    const colinas = await PROCEDURES.get_pending_receipts(connections.COLINAS);

    return Array.prototype.concat.apply([], [ac, g32, turcio, tianguis, paez, colima, villa, colinas]);
}

PROCEDURES.insert_existencias = async (db_config, almacen, date) => {
    try {

        const timer = GET_TIME();
        const microsip_time = MICROSIP_DATE(date);
        const sqlserver_time = SQLSERVER_DATE(date);

        const con = await get_connection();

        const db = await GET_CONNECTION(db_config);
        if (db === null) {
            console.log(`[ X ][ INSERT EXISTENCIAS ] ERROR TO CONECT WITH ${db_config.name} ${almacen.name} ON ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            return { ALMACEN: almacen.name, FECHA: MICROSIP_DATE(date), ok: false };
        }

        // 1: CHECK IF IT IS NOT INSERTED IN SQL SERVER THE SAME ROW
        const result_more_0 = await con.query(`SELECT * FROM OP.DoctosINMS WHERE FECHA = '${sqlserver_time}' AND ALMACEN = '${almacen.name}'`)
        const result_less_0 = await con.query(`SELECT * FROM OP.DoctosINMS_NEG WHERE FECHA = '${sqlserver_time}' AND ALMACEN = '${almacen.name}'`)

        if (result_more_0.recordset.length === 0 || result_less_0.recordset.length === 0) {
            // 2: GET DATA FROM MICROSIP AND INSERT
            const microsip = await SEND_NO_DISCONNECT(db, QUERY.P_GET_JEC_EXISTENCIAS_X_DIA(almacen.id, microsip_time));
            const microsip_clean = await CLEAR_DATA_BUFFER(microsip);
            // console.log( microsip_clean );
            // 3: INSERT DATA TO SQL SERVER WITH EXISTENCES MORE THAT 0
            const microsip_clean_more_0 = microsip_clean.filter(i => parseInt(i.EXISTENCIA) > 0);
            if (result_more_0.recordset.length === 0 && microsip_clean_more_0.length > 0) {
                var queries = 'INSERT INTO OP.DoctosINMS ( ALMACEN, CLAVE_ARTICULO, FECHA, EXISTENCIA ) ';
                microsip_clean_more_0.forEach(function (item, index) {
                    queries += `SELECT '${item.ALMACEN}', '${item.CLAVE_ARTICULO}', '${sqlserver_time}', ${item.EXISTENCIA} `
                    if (index !== microsip_clean_more_0.length - 1) {
                        queries += 'UNION ALL '
                    }
                });
                await con.query(queries);
                console.log(`[ ✓ ][ INSERT EXISTENCIAS MORE THAT 0 ] SUCCESSFUL INSERT OF ${db_config.name} ${almacen.name} WITH ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            } else {
                console.log(`[ X ][ INSERT EXISTENCIAS MORE THAT 0 ] NO DATA TO INSERT IN ${db_config.name} ${almacen.name} WITH ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            }
            // // 4: INSERT DATA TO SQL SERVER WITH EXISTENCES LESS THAT 0
            const microsip_clean_less_0 = microsip_clean.filter(i => parseInt(i.EXISTENCIA) < 0);
            if (result_less_0.recordset.length === 0 && microsip_clean_less_0.length > 0) {
                var queries = 'INSERT INTO OP.DoctosINMS_NEG ( ALMACEN, CLAVE_ARTICULO, FECHA, EXISTENCIA ) ';
                microsip_clean_less_0.forEach(function (item, index) {
                    queries += `SELECT '${item.ALMACEN}', '${item.CLAVE_ARTICULO}', '${sqlserver_time}', ${item.EXISTENCIA} `
                    if (index !== microsip_clean_less_0.length - 1) {
                        queries += 'UNION ALL '
                    }
                });
                await con.query(queries);
                console.log(`[ ✓ ][ INSERT EXISTENCIAS LESS THAT 0 ] SUCCESSFUL INSERT OF ${db_config.name} ${almacen.name} WITH ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            } else {
                console.log(`[ X ][ INSERT EXISTENCIAS LESS THAT 0 ] NO DATA TO INSERT IN ${db_config.name} ${almacen.name} WITH ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            }
        } else {
            console.log(`[ X ][ INSERT EXISTENCIAS ] ALREADY INSERTED ${db_config.name} ${almacen.name} WITH ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        }
        return { ok: true };
    } catch (error) {
        console.log(error);
        console.log(`[ X ][ INSERT EXISTENCIAS ] ERROR TO CONECT WITH ${db_config.name} ${almacen.name} ON ${MICROSIP_DATE(date)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        return { ALMACEN: almacen.name, FECHA: MICROSIP_DATE(date), ok: false };
    }
}

PROCEDURES.insert_many_existencias = async (date = null) => {

    var problems = []

    if (date === null) {
        date = GET_TIME(null, -6);
    } else {
        date = GET_TIME(date, 6);
    }

    const connections = GET_CONNECTIONS_CONFIGURATION();

    problems.push(await PROCEDURES.insert_existencias(connections.AC, { id: 181613, name: "4- ALMACEN GENERAL CEDIS" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.AC, { id: 181614, name: "5-ALBERTO CARDENAS" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.AC, { id: 662747, name: "6-CEDIS RUTA" }, date));

    problems.push(await PROCEDURES.insert_existencias(connections.G32, { id: 303676, name: "1-ALMACEN CENTRO" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.G32, { id: 303677, name: "2-ESMERALDA MATRIZ GORDOA 10" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.CIMA, { id: 31862487, name: "LA CIMA" }, date));

    problems.push(await PROCEDURES.insert_existencias(connections.TURCIO, { id: 179263, name: "6-TURCIO" }, date));

    problems.push(await PROCEDURES.insert_existencias(connections.TIANGUIS, { id: 31906794, name: "LA CIMA 2" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.TIANGUIS, { id: 37698592, name: "ALMACEN ADY1 TURCIO" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.TIANGUIS, { id: 31906795, name: "ALMACEN ADY2 TURCIO" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.TIANGUIS, { id: 31907026, name: "ALMACEN RUBEN FAJARDO" }, date));

    problems.push(await PROCEDURES.insert_existencias(connections.PAEZ, { id: 186107, name: "1-PAEZ STILLE" }, date));

    problems.push(await PROCEDURES.insert_existencias(connections.COLIMA, { id: 3111, name: "11-ALMACEN COLIMA" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.COLIMA, { id: 464117, name: "REPOSTERIA COLIMA" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.COLIMA, { id: 3112, name: "INSUMOS COLIMA" }, date));
    problems.push(await PROCEDURES.insert_existencias(connections.COLIMA, { id: 3113, name: "12-CEREALES CORTES" }, date));

    problems.push(await PROCEDURES.insert_existencias(connections.VILLA, { id: 5367, name: "9- VILLA DE ALVAREZ" }, date));

    problems.push(await PROCEDURES.insert_existencias(connections.COLINAS, { id: 3012, name: "7-COLINAS VILLA DE ALVAREZ" }, date));

    return problems.filter(i => i.ok === false)
}

PROCEDURES.insert_doctos_cm = async (db_config, date) => {
    try {

        const timer = GET_TIME();
        const microsip_time = MICROSIP_DATE(date);
        const sqlserver_time = SQLSERVER_DATE(date);

        const db = await GET_CONNECTION(db_config);

        if (db === null) {
            console.log(`[ X ][ INSERT DOCTOS CM ] ERROR TO CONECT WITH ${db_config.name} AT ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            return { CONNECTION: db_config.name, FECHA: MICROSIP_DATE(date), ok: false };
        }

        const con = await get_connection();
        // 1: CHECK IF IT IS NOT INSERTED IN SQL SERVER THE SAME ROW
        const result = await con.query(`SELECT * FROM OP.DoctosCM_CO WHERE FECHA_CREACION = '${sqlserver_time}' AND DB = '${db_config.name}'`)
        if (result.recordset.length === 0) {

            // 2: GET DATA FROM MICROSIP AND INSERT
            const microsip = await SEND(db, QUERY.P_GET_JEC_DOCTOS_CM_SQL_SERVER(microsip_time));
            if (microsip.length > 0) {
                const microsip_clean = await CLEAR_DATA_BUFFER(microsip);
                // console.log( microsip_clean );

                // 3: INSERT DATA TO SQL SERVER
                var queries = 'INSERT INTO OP.DoctosCM_CO ( FOLIO, FECHA_CREACION, PROVEEDOR, ALMACEN, DB, CLAVE_ARTICULO, UNIDADES, PRECIO_UNITARIO, PRECIO_TOTAL_NETO ) ';
                microsip_clean.forEach(function (item, index) {
                    queries += `SELECT '${item.FOLIO}', '${sqlserver_time}', '${item.PROVEEDOR}', '${item.ALMACEN}', '${db_config.name}', '${item.CLAVE_ARTICULO}', ${item.UNIDADES}, ${item.PRECIO_UNITARIO}, ${item.PRECIO_TOTAL_NETO} `
                    if (index !== microsip_clean.length - 1) {
                        queries += 'UNION ALL '
                    }
                });
                await con.query(queries);
                console.log(`[ ✓ ][ INSERT DOCTOS CM ] SUCCESSFUL INSERT OF ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            } else {
                console.log(`[ X ][ INSERT DOCTOS CM ] NO DATA TO INSERT ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            }
        } else {
            console.log(`[ X ][ INSERT DOCTOS CM ] ALREADY INSERTED ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        }
        return { ok: true };
    } catch (error) {
        console.log(error)
        console.log(`[ X ][ INSERT DOCTOS CM ] ERROR TO CONECT WITH ${db_config.name} AT ${MICROSIP_DATE(date)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        return { CONNECTION: db_config.name, FECHA: MICROSIP_DATE(date), ok: false };
    }
}

PROCEDURES.insert_many_doctos_cm = async (date = null) => {

    var problems = []

    if (date === null) {
        date = GET_TIME(null, -6);
    } else {
        date = GET_TIME(date, 6);
    }

    const connections = GET_CONNECTIONS_CONFIGURATION();

    problems.push(await PROCEDURES.insert_doctos_cm(connections.AC, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.G32, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.CIMA, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.TURCIO, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.TIANGUIS, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.PAEZ, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.COLIMA, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.VILLA, date));
    problems.push(await PROCEDURES.insert_doctos_cm(connections.COLINAS, date));

    return problems.filter(i => i.ok === false)
}

PROCEDURES.insert_doctos_dv = async (db_config, date) => {
    try {

        const timer = GET_TIME();
        const microsip_time = MICROSIP_DATE(date);
        const sqlserver_time = SQLSERVER_DATE(date);

        const db = await GET_CONNECTION(db_config);

        if (db === null) {
            console.log(`[ X ][ INSERT DOCTOS DV ] ERROR TO CONECT WITH ${db_config.name} AT ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            return { CONNECTION: db_config.name, FECHA: MICROSIP_DATE(date), ok: false };
        }

        const con = await get_connection();
        // 1: CHECK IF IT IS NOT INSERTED IN SQL SERVER THE SAME ROW
        const result = await con.query(`SELECT * FROM OP.DoctosCM_DV WHERE FECHA_CREACION = '${sqlserver_time}' AND DB = '${db_config.name}'`)
        if (result.recordset.length === 0) {

            // 2: GET DATA FROM MICROSIP AND INSERT
            const microsip = await SEND(db, QUERY.P_GET_JEC_DOCTOS_CM_SQL_SERVER(microsip_time, 'D'));
            if (microsip.length > 0) {
                const microsip_clean = await CLEAR_DATA_BUFFER(microsip);
                // console.log( microsip_clean );

                // 3: INSERT DATA TO SQL SERVER
                var queries = 'INSERT INTO OP.DoctosCM_DV ( FOLIO, FECHA_CREACION, PROVEEDOR, ALMACEN, DB, CLAVE_ARTICULO, UNIDADES, PRECIO_UNITARIO, PRECIO_TOTAL_NETO ) ';
                microsip_clean.forEach(function (item, index) {
                    queries += `SELECT '${item.FOLIO}', '${sqlserver_time}', '${item.PROVEEDOR}', '${item.ALMACEN}', '${db_config.name}', '${item.CLAVE_ARTICULO}', ${item.UNIDADES}, ${item.PRECIO_UNITARIO}, ${item.PRECIO_TOTAL_NETO} `
                    if (index !== microsip_clean.length - 1) {
                        queries += 'UNION ALL '
                    }
                });
                await con.query(queries);
                console.log(`[ ✓ ][ INSERT DOCTOS DV ] SUCCESSFUL INSERT OF ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            } else {
                console.log(`[ X ][ INSERT DOCTOS DV ] NO DATA TO INSERT ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            }
        } else {
            console.log(`[ X ][ INSERT DOCTOS DV ] ALREADY INSERTED ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        }
        return { ok: true };
    } catch (error) {
        console.log(error)
        console.log(`[ X ][ INSERT DOCTOS DV ] ERROR TO CONECT WITH ${db_config.name} AT ${MICROSIP_DATE(date)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        return { CONNECTION: db_config.name, FECHA: MICROSIP_DATE(date), ok: false };
    }
}

PROCEDURES.insert_many_doctos_dv = async (date = null) => {

    var problems = []

    if (date === null) {
        date = GET_TIME(null, -6);
    } else {
        date = GET_TIME(date, 6);
    }

    const connections = GET_CONNECTIONS_CONFIGURATION();

    problems.push(await PROCEDURES.insert_doctos_dv(connections.AC, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.G32, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.CIMA, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.TURCIO, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.TIANGUIS, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.PAEZ, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.COLIMA, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.VILLA, date));
    problems.push(await PROCEDURES.insert_doctos_dv(connections.COLINAS, date));

    return problems.filter(i => i.ok === false)
}

PROCEDURES.insert_doctos_rc = async (db_config, date) => {
    try {

        const timer = GET_TIME();
        const microsip_time = MICROSIP_DATE(date);
        const sqlserver_time = SQLSERVER_DATE(date);

        const db = await GET_CONNECTION(db_config);

        if (db === null) {
            console.log(`[ X ][ INSERT DOCTOS RC ] ERROR TO CONECT WITH ${db_config.name} AT ${sqlserver_time} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            return { CONNECTION: db_config.name, FECHA: MICROSIP_DATE(date), ok: false };
        }

        const con = await get_connection();
        // 1: CHECK IF IT IS NOT INSERTED IN SQL SERVER THE SAME ROW
        const result = await con.query(`SELECT * FROM OP.DoctosCM_RC WHERE FECHA_CREACION = '${sqlserver_time}' AND DB = '${db_config.name}'`)
        if (result.recordset.length === 0) {

            // 2: GET DATA FROM MICROSIP AND INSERT
            const microsip = await SEND(db, QUERY.P_GET_JEC_DOCTOS_CM_SQL_SERVER(microsip_time, 'R'));
            if (microsip.length > 0) {
                const microsip_clean = await CLEAR_DATA_BUFFER(microsip);
                // console.log( microsip_clean );

                // 3: INSERT DATA TO SQL SERVER
                var queries = 'INSERT INTO OP.DoctosCM_RC ( FOLIO, FECHA_CREACION, PROVEEDOR, ALMACEN, DB, CLAVE_ARTICULO, UNIDADES, PRECIO_UNITARIO, PRECIO_TOTAL_NETO ) ';
                microsip_clean.forEach(function (item, index) {
                    queries += `SELECT '${item.FOLIO}', '${sqlserver_time}', '${item.PROVEEDOR}', '${item.ALMACEN}', '${db_config.name}', '${item.CLAVE_ARTICULO}', ${item.UNIDADES}, ${item.PRECIO_UNITARIO}, ${item.PRECIO_TOTAL_NETO} `
                    if (index !== microsip_clean.length - 1) {
                        queries += 'UNION ALL '
                    }
                });
                await con.query(queries);
                console.log(`[ ✓ ][ INSERT DOCTOS RC ] SUCCESSFUL INSERT OF ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            } else {
                console.log(`[ X ][ INSERT DOCTOS RC ] NO DATA TO INSERT ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
            }
        } else {
            console.log(`[ X ][ INSERT DOCTOS RC ] ALREADY INSERTED ${db_config.name} WITH ${SQLSERVER_DATE(date, 6)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        }
        return { ok: true };
    } catch (error) {
        console.log(error)
        console.log(`[ X ][ INSERT DOCTOS RC ] ERROR TO CONECT WITH ${db_config.name} AT ${MICROSIP_DATE(date)} | TIME TAKER: ${GET_TIME() - timer} miliseconds`);
        return { CONNECTION: db_config.name, FECHA: MICROSIP_DATE(date), ok: false };
    }
}

PROCEDURES.insert_many_doctos_rc = async (date = null) => {

    var problems = []

    if (date === null) {
        date = GET_TIME(null, -6);
    } else {
        date = GET_TIME(date, 6);
    }

    const connections = GET_CONNECTIONS_CONFIGURATION();

    problems.push(await PROCEDURES.insert_doctos_rc(connections.AC, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.G32, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.CIMA, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.TURCIO, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.TIANGUIS, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.PAEZ, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.COLIMA, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.VILLA, date));
    problems.push(await PROCEDURES.insert_doctos_rc(connections.COLINAS, date));

    return problems.filter(i => i.ok === false)
}

module.exports = PROCEDURES;