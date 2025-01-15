var firebird = require('node-firebird');
const {response, request} = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fir_password = process.env.FIR_PASSWORD
const conections =  require('../database/connections');
const firebirdQuerys = require('../helpers/firebirdQuerys');
const { connections } = require('mongoose');
const http = require('http');
const { Console } = require('console');

//Configuracion de la BDD
var options = {};
options.host = '127.0.0.1';
options.port = 3050;
options.database = 'C:/Microsip Datos/JECOR_PRUEBAS.FDB';
options.user = 'SYSDBA';
options.password =  'masterkey';
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null; // default
options.pageSize = 4096;
// NULL = null;
// False = false

const getClient =  (req, res = response) => {
    res.json({
        pass: cryptr.decrypt(fir_password)
    })
    // firebird.attach(options, function(err, db) {
 
    //     if (err)
    //         throw err;
     
    //     // db = DATABASE
    //     db.query('SELECT * FROM CLIENTES WHERE NOMBRE=?', ['INSTITUTO PRUEBA 1000'], function(err, result) {
    //         console.log(result);
    //         // IMPORTANT: close the connection
    //         db.detach();
    //     });
     
    // });
}

const getTiposClientes =  (req, res = response) => {
    res.json({
        pass: cryptr.decrypt(fir_password)
    })
    // firebird.attach(options, async function(err, db) {
    //     if (err)
    //         throw err;
    //     // db = DATABASE
    //     db.query('SELECT NOMBRE, TIPO_CLIENTE_ID FROM TIPOS_CLIENTES', async function(err, getTiposClientes) {
    //         const tiposClientes = [];
    //         getTiposClientes.forEach(element => {
    //             var tipoCliente = {
    //                 nombre: element.NOMBRE.toString('utf8'),
    //                 tipo_cliente_id: element. TIPO_CLIENTE_ID
    //             }

    //             tiposClientes.push(tipoCliente)
    //         });
    //         // IMPORTANT: close the connection
    //         db.detach();
    //         return res.json({
    //             tiposClientes
    //         });
    //     });
    // });
}

const getZonesClients = (req, res = resposne) => {
    firebird.attach(options, async function(err, db) {
        db.query('SELECT ZONA_CLIENTE_ID, NOMBRE FROM ZONAS_CLIENTES', async function(err, getZonasClientes) {
            // console.log(getTiposClientes);
            const zonasClientes = [];
            getZonasClientes.forEach(element => {
                var zona = {
                    nombre: element.NOMBRE.toString('utf8'),
                    zona_cliente_id: element.ZONA_CLIENTE_ID
                }

                zonasClientes.push(zona)
            });
            // IMPORTANT: close the connection
            db.detach();

            return res.json({
                zonasClientes
            })
        });
    });
}

const getVendors = (req, res = response) => {
    firebird.attach(options, async function(err, db) {
        db.query('SELECT NOMBRE, VENDEDOR_ID FROM VENDEDORES', async function(err, vendedoresDB) {
            // console.log(getTiposClientes);
            const vendedores = [];
            vendedoresDB.forEach(vendedor => {
                var vendedor = {
                    nombre: vendedor.NOMBRE.toString('utf8'),
                    vendedor_id: vendedor.VENDEDOR_ID
                }

                vendedores.push(vendedor)
            });
            // IMPORTANT: close the connection
            db.detach();

            return res.json({
                vendedores
            });
        });
    });
}

const getCollectors = (req, res = response) => {
    firebird.attach(options, async function(err, db) {
        db.query('SELECT NOMBRE, COBRADOR_ID FROM COBRADORES', async function(err, cobradoresDB) {
            // console.log(getTiposClientes);
            const cobradores = [];
            cobradoresDB.forEach(cobrador => {
                var cobrador = {
                    nombre: cobrador.NOMBRE.toString('utf8'),
                    cobrador_id: cobrador.COBRADOR_ID
                }

                cobradores.push(cobrador)
            });
            // IMPORTANT: close the connection
            db.detach();

            return res.json({
                cobradores
            });
        });
    });
}

const getPaymentConditions = (req, res = response) => {
    firebird.attach(options, async function(err, db) {
        db.query('SELECT NOMBRE, COND_PAGO_ID FROM CONDICIONES_PAGO', async function(err, condicionesPagoDB) {
            // console.log(getTiposClientes);
            const condicionesPago = [];
            condicionesPagoDB.forEach(condicion => {
                var COND_PAGO_ID = {
                    nombre: condicion.NOMBRE.toString('utf8'),
                    condiciones_pago_id: condicion.COND_PAGO_ID
                }

                condicionesPago.push(COND_PAGO_ID)
            });
            // IMPORTANT: close the connection
            db.detach();

            return res.json({
                condicionesPago
            });
        });
    });
}

const getCitys = (req, res = response) => {
    firebird.attach(options, async function(err, db) {
        db.query('SELECT NOMBRE, CIUDAD_ID FROM CIUDADES', async function(err, ciudadesDB) {
            
            db.detach();

            return res.json({
                ciudades: ciudadesDB
            });
        });
    });
}

const getCoins = (req, res = response) => {
    firebird.attach(conections[VILLA], async function(err, db) {
        db.query('SELECT NOMBRE, MONEDA_ID FROM Monedas', async function(err, monedasDB) {

            const monedas = [];
            monedasDB.forEach(monedaDB => {
                var moneda = {
                    nombre: monedaDB.NOMBRE.toString('utf8'),
                    moneda_id: monedaDB.MONEDA_ID
                }

                monedas.push(moneda)
            });
            // IMPORTANT: close the connection
            db.detach();

            return res.json({
                monedas
            });
        });
    });
}



const getData = (req, res = response ) => {
    firebird.attach(options, function(err, db) {
 
        if (err)
            throw err;

        // Datos Tipos de clientes   
        const typesClients = new Promise((resolve, reject) => {
            db.query('SELECT TIPO_CLIENTE_ID, Nombre FROM TIPOS_CLIENTES', async function(err, getTiposClientes) {
                // console.log(getTiposClientes);
            const tiposClientes = [];
            getTiposClientes.forEach(element => {
                var cliente = {
                    nombre: element.NOMBRE.toString('utf8'),
                    tipo_cliente_id: element.TIPO_CLIENTE_ID
                }
                tiposClientes.push(cliente);

            });

                resolve(tiposClientes)
                // IMPORTANT: close the connection
                db.detach();
            });
        });

        // Datos Zonas de Clientes
        const zonesClients = new Promise((resolve, reject) => {
            db.query('SELECT ZONA_CLIENTE_ID, NOMBRE FROM ZONAS_CLIENTES', async function(err, getZonasClientes) {
                // console.log(getTiposClientes);
                const zonasClientes = [];
                getZonasClientes.forEach(element => {
                    var zona = {
                        nombre: element.NOMBRE.toString('utf8'),
                        zona_cliente_id: element.ZONA_CLIENTE_ID
                    }

                    zonasClientes.push(zona)
                });


                resolve(zonasClientes)
                // IMPORTANT: close the connection
                db.detach();
            });
        });


        // dfdfd
        const vendores = new Promise((resolve, reject) => { 
            db.query('select * from vendedores', async function(err, vendedoresDB) {
                    console.log(vendedoresDB);
                // const vendedores = [];
                // vendedoresDB.forEach(vendedor => {
                //     var vendedor = {
                //         nombre: element.NOMBRE.toString('utf8'),
                //         vendedor_id: element.VENDEDOR_ID
                //     }
                //     vendedores.push(vendedor)
                // });
                resolve(vendedoresDB);
                // IMPORTANT: close the connection
                db.detach();
            });

        });

        const all = Promise.all([
            typesClients,
            zonesClients,
            vendores
        ]).then(([tiposDeClientes, zonasDeClientes, vendedores]) => {
            return res.json({
                tiposDeClientes,
                zonasDeClientes,
                vendedores
            });
        });



    });
}

const cretateClient =  (req, res = response) => {


    const client = { ...req.body }
    console.log(client);


    firebird.attach(options, function(err, db) {
 
        if (err)
            throw err;
     
        // db = DATABASE
        db.execute(`INSERT INTO CLIENTES (CLIENTE_ID, NOMBRE, CONTACTO1, CONTACTO2, ESTATUS, CAUSA_SUSP, FECHA_SUSP, COBRAR_IMPUESTOS, RETIENE_IMPUESTOS, SUJETO_IEPS, GENERAR_INTERESES, EMITIR_EDOCTA, DIFERIR_CFDI_COBROS, LIMITE_CREDITO, MONEDA_ID, COND_PAGO_ID, TIPO_CLIENTE_ID, ZONA_CLIENTE_ID, COBRADOR_ID, VENDEDOR_ID, NOTAS, CUENTA_CXC, CUENTA_ANTICIPOS, FORMATOS_EMAIL, RECEPTOR_CFD, NUM_PROV_CLIENTE, CAMPOS_ADDENDA, USUARIO_CREADOR, FECHA_HORA_CREACION, USUARIO_AUT_CREACION, USUARIO_ULT_MODIF, FECHA_HORA_ULT_MODIF, USUARIO_AUT_MODIF) 
                                VALUES(-1, '${client.name}', NULL, NULL, 'A', NULL, NULL, 'S', 'N', 'S', 'S', 'S', False, ${client.limit}, ${client.coin}, ${Number(client.paymentConditions)}, ${Number(client.typeClient)} ,${Number(client.zoneClient)}, ${Number(client.collector)}, ${Number(client.vendor)}, NULL, NULL, NULL, NULL, 'GENERICO', NULL, NULL, 'SYSDBA', '10-SEP-2020 11:21:02.839', NULL, 'SYSDBA', '10-SEP-2020 11:25:44.286', NULL) RETURNING CLIENTE_ID` , 
            function(err, result) {
                
                if (err) {
                    console.log(err);
                }

                if(result){
                    console.log('RESULT',result[0]);
                    return res.json({
                        result:result[0]
                    })
                }
            db.detach();
        });
    }); 
}

const addClientDir = (req, res = response) => {
    const id = req.params.id
    console.log(id);
    const client = { ...req.body }
    console.log('RESPONSE', client);
    firebird.attach(options, function(err, db) {
        if (err)
            throw err;
        db.execute(`INSERT INTO DIRS_CLIENTES (DIR_CLI_ID, CLIENTE_ID, NOMBRE_CONSIG, CALLE, NOMBRE_CALLE, NUM_EXTERIOR, NUM_INTERIOR, COLONIA, COLONIA_CLAVE_FISCAL, POBLACION, POBLACION_CLAVE_FISCAL, REFERENCIA, CIUDAD_ID, ESTADO_ID, CODIGO_POSTAL, PAIS_ID, TELEFONO1, TELEFONO2, FAX, EMAIL, RFC_CURP, TAX_ID, CONTACTO, VIA_EMBARQUE_ID, ES_DIR_PPAL, USAR_PARA_ENVIOS, USAR_PARA_FACTURAR, GLN) 
                                        VALUES (-1, ${id}, 'Dirección principal', '${client.address}', NULL, '${client.ext}', '${client.int}', '${client.neighborhood}', NULL, NULL, NULL, NULL, ${client.city}, 364, '${client.postalCode}', 363, '${client.phone}', NULL, NULL, '${client.email}', 'BALJ 371014 B75', NULL, '', 681, 'S', 'S', 'S', NULL) RETURNING DIR_CLI_ID` , 
            function(err, result) {
                
                if (err) {
                    console.log('ERROR DOC' + err);
                }

                if(result){
                    console.log('RESULT',result);
                    return res.json({
                        result
                    })
                }
            db.detach();
        });
    }); 
}

const getExistArts = (req, res= response) => {
    firebird.attach(options, function(err, db) {
 
        if (err)
            throw err;
     
        // db = DATABASE
        db.query("select * from exival_art_ur('181613', current_date, 'S')", function(err, result) {
            const existencias = [];
            result.forEach(element => {     
                var clave_articulo = '';
                var nombre = '';
                var umed  = '';
                var linea  = '';

                if(element.CLAVE_ARTICULO === null){
                    clave_articulo = 'NULL'
                }else {
                    clave_articulo = element.CLAVE_ARTICULO.toString('utf8')
                }

                if(element.NOMBRE === null){
                    nombre = 'NULL'
                }else {
                    nombre = element.NOMBRE.toString('utf8')
                }

                if(element.UMED === null){
                    umed = 'NULL'
                }else {
                    umed = element.UMED.toString('utf8')
                }

                if(element.LINEA === null){
                    linea = 'NULL'
                }else {
                    linea = element.LINEA.toString('utf8')
                    
                }

                const existencia = {
                    articulo_id: element.ARTICULO_ID,
                    clave_articulo,
                    nombre,
                    existencia : element.EXISTENCIA,
                    valor_unitario : element.VALOR_UNITARIO, 
                    valor_total : element.VALOR_TOTAL,
                    umed,
                    linea
                }
                existencias.push(existencia);
            });
            // IMPORTANT: close the connection
            db.detach();

            return res.json({
                data: existencias
            });
        });
     
    });
}

const getOrdersCm = (req, res) => {
    firebird.attach(conections.AC, function(err, db) {
        console.log(req.body.query)
        if (err)
            throw err;
        // db = DATABASE
        db.query(`Select * FROM doctos_cm ${req.body.query} and doctos_cm.tipo_docto = 'O' ORDER BY doctos_cm.fecha DESC`, function(err, ordersDB) {
            console.log(ordersDB);
            if(err){
                return res.status(500).json({
                    ok:false,
                    msg: 'Error doctos_cm',
                    error: err
                });
            }
            var orders = [];
            ordersDB.forEach(orderDB => {
                const order = {
                    id: orderDB.DOCTO_CM_ID,
                    folio: orderDB.FOLIO.toString('utf8'),
                    fecha: orderDB.FECHA
                }
                orders.push(order);
            })    
            // IMPORTANT: close the connection
            db.detach();
            return res.json({
                doctos_cm: orders
            });
        });
     
    });
}

const getPricesListCatalog = (req, res) => {
    firebird.attach(conections.AC, function(err, db) {
        console.log('err1',db);
        db.execute(`
                    select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo, getArtImpt.precio_lista, getArtImpt.precio_mayoreo
                    from get_precios_articulos_con_impto as getArtImpt
                    left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                    left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                    where claves_articulos.rol_clave_art_id in (17, 18, 288)`,
            function(err, data) {
                if(err){
                    console.log('err',err);
                }
                console.log('DATA',data);
                let catalogo = []
                if(data){
                    data.forEach(element => {

                        // element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null'
                        // console.log(element[2]);
                        const newElement = {
                            id: element[0],
                            code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                            article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                            price: element[3],
                            priceOff: element[4]
                        }
                        
                        catalogo.push(newElement)
                        // catalogo.push(newElement)
                    });
                    console.log(catalogo);
                                // IMPORTANT: close the connection
                    db.detach();
                    return res.json({
                        data: catalogo
                    })
                }
                // return res.json({
                //     data
                // })
        });
    });
}

const getOrderData = (req, res) => {
    const ids = req.body.ids.substring(0,( req.body.ids.length - 1))
    console.log(ids);
    firebird.attach(conections.AC, function(err, db) {
        if (err){
            console.log(err);
            throw err;
            // db = DATABASE
        }
        
        db.query(`
        SELECT DISTINCT
        LAST_UPDATE.CLAVE_ARTICULO,
        PRICES.ULTIMO_COSTO,
        PRICES.FECHA,
        claves_articulos.articulo_id,
        articulos.contenido_unidad_compra,
        articulos.unidad_compra

        FROM    
            ( SELECT 
                CLAVE_ARTICULO, 
                MAX(FECHA) AS FECHA
            FROM 
                DOCTOS_CM_DET DCD, DOCTOS_CM DC 
            WHERE
                DCD.DOCTO_CM_ID = DC.DOCTO_CM_ID 
                AND DCD.CLAVE_ARTICULO IS NOT NULL
                AND TIPO_DOCTO = 'C'
                AND FECHA > '2020-01-01'
            GROUP BY 
                CLAVE_ARTICULO ) AS LAST_UPDATE
        JOIN 
            ( SELECT 
                CLAVE_ARTICULO, 
                ( (PRECIO_TOTAL_NETO / UNIDADES ) / CONTENIDO_UMED ) AS ULTIMO_COSTO,
                FECHA
            FROM 
                DOCTOS_CM_DET DCD, DOCTOS_CM DC 
            WHERE
                DCD.DOCTO_CM_ID = DC.DOCTO_CM_ID 
                AND DCD.CLAVE_ARTICULO IS NOT NULL
                AND TIPO_DOCTO = 'C'
                AND FECHA > '2020-01-01' ) AS PRICES
        ON
            LAST_UPDATE.FECHA = PRICES.FECHA
            AND LAST_UPDATE.CLAVE_ARTICULO = PRICES.CLAVE_ARTICULO
        left join  claves_articulos
        on  LAST_UPDATE.CLAVE_ARTICULO = claves_articulos.clave_articulo
        left join articulos
        on claves_articulos.articulo_id = articulos.articulo_id
        where articulos.articulo_id in (${ids})`, function(err, data) {
        console.log(data);
            data = data.map (element => {
                console.log(element);
                return newElement = {
                    articulo_id: element.ARTICULO_ID,
                    clave_articulo: element.CLAVE_ARTICULO,
                    costo_ultima_compra: element.ULTIMO_COSTO,
                    contenido_unidad_compra: element.CONTENIDO_UNIDAD_COMPRA,
                    unidad_compra : element.UNIDAD_COMPRA !== null ? element.UNIDAD_COMPRA.toString('utf8') : 'Null'
                }
            });

            db.detach(); 
            return res.json({
                data
            });

        });
     
    });
}


const insertIntoOrderCm = (req, res= response) => {
    try {
        const data = [];
        data.push(...req.body.rowOrder)
        const docto_id = data[0].docto_cm_id;
        console.log('Data', docto_id);
        firebird.attach(conections.AC, function(err, db) {
            if (err) {
                throw err;
            }
            db.query(`delete from doctos_cm_det where doctos_cm_det.docto_cm_id = ${docto_id} `, function(err, result) {
                console.log(err);
                console.log(result);
                data.forEach(element => {
                    console.log(element);
        
                        db.query(`INSERT INTO DOCTOS_CM_DET (DOCTO_CM_DET_ID, DOCTO_CM_ID, CLAVE_ARTICULO, ARTICULO_ID, UNIDADES, UNIDADES_REC_DEV, UNIDADES_A_REC, UMED, CONTENIDO_UMED, PRECIO_UNITARIO, PCTJE_DSCTO, PCTJE_DSCTO_PRO, PCTJE_DSCTO_VOL, PCTJE_DSCTO_PROMO, DSCTO_ART, DSCTO_EXTRA, PRECIO_TOTAL_NETO, PCTJE_ARANCEL, NOTAS, POSICION) 
                                                VALUES(-1, '${element.docto_cm_id}', '${element.clave_articulo}', ${element.articulo_id}, ${element.unidades}, 0, 0, '${element.unidad_compra}', ${element.contenido_unidad_compra}, ${element.precio_unitario}, 0, 0, 0, 0, 0, 0, ${element.precio_total_neto}, 0, NULL, ${element.posicion})` , 
                            function(err, result) {
                                console.log('resultado',result);
                                if (err) {
                                    console.log(err);
                                    return res.json({
                                        ok:false,
                                        msg: 'Error al insertar datos'
                                    });
                                }
                                if(element.terminado){
                                    db.detach();
                                    return res.json({
                                        result: 'Insercion de datos correcta'
                                    });
                                }
                        });
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const createDoctoCm = (req, res) => {
    console.log(req.body);
    const {folio, date, provKey, provId, provFolio, warehouseId, netAmount, condPaymentId, fullDate, user} = req.body;
    firebird.attach(options, function(err, db) {
        if (err){
            throw err;
        }
                            db.execute(`
                                INSERT INTO DOCTOS_CM
                                (DOCTO_CM_ID, TIPO_DOCTO, SUBTIPO_DOCTO, SUCURSAL_ID, FOLIO, FECHA, CLAVE_PROV, PROVEEDOR_ID, FOLIO_PROV, FACTURA_DEV, CONSIG_CM_ID, ALMACEN_ID, PEDIMENTO_ID, MONEDA_ID, TIPO_CAMBIO, TIPO_DSCTO, DSCTO_PCTJE, DSCTO_IMPORTE, ESTATUS, APLICADO, FECHA_ENTREGA, DESCRIPCION, IMPORTE_NETO, FLETES, OTROS_CARGOS, TOTAL_IMPUESTOS, TOTAL_RETENCIONES, GASTOS_ADUANALES, OTROS_GASTOS, FORMA_EMITIDA, CONTABILIZADO, ACREDITAR_CXP, SISTEMA_ORIGEN, COND_PAGO_ID, FECHA_DSCTO_PPAG, PCTJE_DSCTO_PPAG, VIA_EMBARQUE_ID, IMPUESTO_SUSTITUIDO_ID, IMPUESTO_SUSTITUTO_ID, CARGAR_SUN, ENVIADO, FECHA_HORA_ENVIO, EMAIL_ENVIO, TIENE_CFD, USUARIO_CREADOR, FECHA_HORA_CREACION, USUARIO_AUT_CREACION, USUARIO_ULT_MODIF, FECHA_HORA_ULT_MODIF, USUARIO_AUT_MODIF, USUARIO_CANCELACION, FECHA_HORA_CANCELACION, USUARIO_AUT_CANCELACION)
                                VALUES
                                (-1, 'C', 'N', 26092179, '${folio}', '${date}', '${provKey}', ${provId}, '${provFolio}', NULL, NULL, ${warehouseId}, NULL, 1, 1, 'P', 0, 0, 'N', 'S', NULL, NULL, 3728.59, 0, 0, 0, 0, 0, 0, 'S', 'N', 'N', 'CM', ${condPaymentId}, NULL, 0, NULL, NULL, NULL, 'S', 'N', '${fullDate}', NULL, 'N', '${user}', '${fullDate}', NULL, '${user}', '${fullDate}', NULL, NULL, NULL, NULL) RETURNING DOCTO_CM_ID`
                                ,function(err, result) {
                                    if (err) {
                                        console.log(err);
                                        return res.json({
                                            ok:false,
                                            msg: 'Error al insertar datos'
                                        });
                                    }
                                    if(result){
                                        console.log(result);
                                        db.detach();
                                        return res.json({
                                            result: 'Insercion de datos correcta'
                                        });
                                    }
                            });
                        }); 

}

const insertDoctoVeDet = (req = request, res = response) => {
    const conection = req.params.conection;
    const docto_ve_id = req.params.docto_ve_id;
    const data = req.body;
    firebirdQuerys.insertDoctoVeDet(conection, docto_ve_id, data).then( (id) => {
        return res.json({
            ok : true,
            msg : 'Detalle Guardado correctamente',
            id
        });
    });
}


const updateDoctoCmAmount = (req, res) => {
    const docto_cm_id = req.body.docto_cm_id
    const importe_neto = req.body.importe_neto
    console.log(docto_cm_id, importe_neto)
    firebird.attach(conections.AC, function(err, db) {
        if (err){
            console.log(err);
            throw err;
        }
        // db = DATABASE
        db.transaction(firebird.ISOLATION_READ_COMMITED, function(err, transaction) {
            console.log(err);
            transaction.query(`update doctos_cm set importe_neto = ${importe_neto} where docto_cm_id = ${docto_cm_id}`, function(err, result) {
     
                if (err) {
                    console.log(err);
                    transaction.rollback();
                    return;
                }
                transaction.commit(function(err) {
                    if (err) {
                        console.log(err);

                        transaction.rollback();
                    }

                    else {
                        console.log(err);
                        db.detach();
                        return res.json({
                            result: 'Insercion de datos correcta'
                        });
                    }
                });
            });
        });
    });
}

const getJecInventarioMovil = (req, res) => {
    const consecutivo = req.params.consecutivo
    const sucursal = req.params.sucursal
    firebird.attach(options, function(err, db) {
        db.query(`SELECT * FROM GET_JEC_INVENTARIO_MOVIL
        where get_jec_inventario_movil.sucursal = 'ADI 2'
        and get_jec_inventario_movil.consecutivo = '1' `, function(err, data) {

            let inventarios = [];
            data.forEach(element => {
                let newElement = {
                    IDINVENTARIOMOVIL : element.IDINVENTARIOMOVIL,
                    IDINVENTARIO : element.IDINVENTARIO,
                    FECHA : element.FECHA.toString('utf8'),
                    CONSECUTIVO : element.CONSECUTIVO.toString('utf8'),
                    SUCURSAL : element.SUCURSAL.toString('utf8'),
                    DESC_CORREDOR : element.DESC_CORREDOR.toString('utf8'),
                    BODEGA : element.BODEGA,
                    IDARTICULO : element.IDARTICULO,
                    IDARTICULOSUCURSAL : element.IDARTICULOSUCURSAL,
                    CLAVE_ARTICULO : element.CLAVE_ARTICULO.toString('utf8'),
                    ARTICULO : element.ARTICULO.toString('utf8'),
                    CANTIDAD : element.CANTIDAD,
                    EXISTENCIA : element.EXISTENCIA,
                    COMPRAS : element.COMPRAS,
                    VENTAS : element.VENTAS,
                    IDTELEFONO : element.IDTELEFONO.toString('utf8'),
                    CERRADO : element.CERRADO.toString('utf8'),
                    CALCULADO : element.CALCULADO.toString('utf8'),
                    ACTIVO : element.ACTIVO.toString('utf8'),
                    ELABORO: element.ELABORO.toString('utf8'),
                };
                console.log(newElement);
                inventarios.push(newElement);
           });

           return res.json({
               inventarios
           })
        });
    });
}

const getJecInventariosMovil = (req, res) => {
    firebird.attach(options, function(err, db) {
        db.query(`SELECT 
        DISTINCT GET_JEC_INVENTARIO_MOVIL.sucursal, GET_JEC_INVENTARIO_MOVIL.consecutivo
        FROM
        GET_JEC_INVENTARIO_MOVIL
        ORDER BY sucursal DESC;`, function(err, data) {
            let inventarios = [];
            console.log(data);
            data.forEach(element => {
                console.log('ELementos', element.CONSECUTIVO.toString('utf8'),);
                let newElement = {
                    sucursal : element.SUCURSAL.toString('utf8'),
                    consecutivo : element.CONSECUTIVO.toString('utf8'),
                }
                inventarios.push(newElement);
            }); 

           return res.json({
            inventarios
           })


        });
    });
}

const updateJecInventarioMovil = (req, res) => {
    console.log('Entro');
    firebird.attach(conections.AC, function(err, db) {
        console.log(err);
        db.execute(`UPDATE JEC_MOVIL_INVENTARIOS
        SET IDINVENTARIO = 1,
            CONSECUTIVO = 1,
            IDARTICULO = 0,
            IDARTICULOSUCURSAL = 0,
            CLAVE_ARTICULO = '',
            ARTICULO = '',
            CANTIDAD = 1000,
            ELABORO = 'HUGOx',
            DESC_CORREDOR = 'DOCUMENTO TITULO',
            PASILLO = 0,
            BODEGA = 0,
            EXISTENCIA = 0,
            DIFERENCIA = 0,
            COMPRAS = 0,
            VENTAS = 0,
            SUCURSAL = 'SUCURSAL G32',
            IDTELEFONO = '60c7edffd0dc0e04',
            FECHA = '22.03.2021 05:40',
            CERRADO = 'N',
            CALCULADO = 'N',
            ACTIVO = 'S'
        WHERE (IDINVENTARIOMOVIL = 719);`, function(err, data) {
            if(err){
                console.log(err);
            }

            if(data){
                return res.json({
                    msg: 'Actualizado'
                })
            }


        });
    });
}


const updateJecInventarioArticuloCantidad = (req, res) => {
    const inventarioId = 1
    const cantidad = 1000
    console.log(inventarioId, cantidad);
    firebird.attach(options, function(err, db) {
        console.log(err);
        db.query(`execute procedure upd_jec_inv_art_cantidad(${inventarioId}, ${cantidad});`, function(err, data) {
            console.log('Entro');
            if(err){
                console.log(err);
            }

            if(data){
                return res.json({
                    msg: 'Actualizado'
                })
            }
        });
    });
}

const getExistencias = (req, res) => {
    const microsipName = req.params.microsipName;
    let conectionName = req.params.conectionName;
    if (conectionName === 'CHAVEZ') {
        conectionName = 'CHAVEZC'
    }
    
    const date = `${new Date().getDate()}.${new Date().getMonth() + 1 }.${new Date().getFullYear()}`
    console.log(date);
    firebird.attach(conections[conectionName], function(err, db) {
        if(err){
            console.log('error1', err);
            return res.status(500).json({
                err: 'Error'
            });
        }
        db.execute(`select articulo_id as article_id , clave_articulo as code, nombre as article, existencia as stock
        from exival_art_ur2('${microsipName}', '${date}', 'N', 'S', 'S', 'S');`,
            function(err, data) {
                console.log(data);
                if(err){
                    console.log('error2');
                    return res.status(500).json({
                        err: 'Error'
                    });
                }
                if(data){
                    let stocks = [];
                    data.forEach(element => {
                        const newElement = {
                            article_id: element[0],
                            code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                            article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                            stock: element[3]
                        }
                        stocks.push(newElement)
                    });
                                // IMPORTANT: close the connection
            db.detach();
                    return res.json({
                        data: stocks
                    })
                }
        });
    });
}

const getMovtosByArticles = (req, res) => {
    const microsipId = req.params.microsipId;
    const conectionName = req.params.conectionName;
    const {date, code} =req.body;
    let mounts = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    const dateX = new Date();
    console.log(date, code);
    // console.log(microsipName, conectionName, conections[conectionName]);
    firebird.attach(conections['AC'], function(err, db) {
        if(err){
            console.log('error1', err);
            return res.status(500).json({
                err: 'Error'
            });
        }
        db.execute(`select doctos_in.fecha_hora_creacion, doctos_in.almacen_id, doctos_in_det.clave_articulo, doctos_in_det.tipo_movto, doctos_in_det.unidades
                    from doctos_in
                    join doctos_in_det
                    on doctos_in_det.docto_in_id = doctos_in.docto_in_id
                    where doctos_in_det.clave_articulo IN ('${code}') and doctos_in.fecha_hora_creacion
                    between '${date}' and '${dateX.getDate()}-${mounts[dateX.getMonth()]}-${dateX.getFullYear()} 23:59:59.272'
                    and doctos_in.almacen_id = 181614
                    and doctos_in.cancelado = 'N' `,
            function(err, data) {
                if(err){
                    console.log('error2');
                    return res.status(500).json({
                        err: 'Error'
                    });
                }
                if(data){
                    let movtos = [];
                    data.forEach(element => {
                        const newElement = {
                            date: element[0],
                            artId: element[1] ,
                            code: element[2],
                            type: element[3] = element[3].toString('utf8') == 'S' ? 'in' : 'out',
                            amount : element[4]
                        }
                        movtos.push(newElement)
                    });

                    let movtosUnify = [];
                    movtos.forEach(movto => {
                        const exist = movtosUnify.findIndex( element => element.artId == movto.artId )
                        console.log(exist, movto.artId);
                        if (exist === -1) {
                            let newMovto = {
                                date : movto.date,
                                artId : movto.artId,
                                in : 0,
                                out : 0
                            }
                            newMovto[movto.type] += movto.amount
                            movtosUnify.push(newMovto);
                            return
                        }
                        movtosUnify[exist][movto.type] += movto.amount
                    });
                    db.detach();
                    return res.json({
                        data: movtosUnify[0]
                    });
                }
        });
    });
}


const getFullCatalog2 = (req, res) => {
    const connection = req.params.connection;
    console.log(conections[connection]);
    firebird.attach(conections[connection], function(err, db) {
        console.log(err);
        db.execute(`
                select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo, getArtImpt.precio_lista,  precios_articulos.precio,
                articulos.unidad_compra, articulos.unidad_venta, articulos.linea_articulo_id, articulos.contenido_unidad_compra,
                claves_articulos.rol_clave_art_id
                from get_precios_articulos_impto_jgb as getArtImpt
                left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                left join precios_articulos on getArtImpt.articulo_id = precios_articulos.articulo_id
                where claves_articulos.rol_clave_art_id in (${conections[connection].keysArticlesIds})
                and precios_articulos.precio_empresa_id = ${conections[connection].companyPriceId}
                    `,
            function(err, data) {
                if(err){
                    console.log('err',err);
                }
                let catalogo = []
                if(data){
                    data.forEach(element => {

                        const newElement = {
                            id: element[0],
                            code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                            article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                            price: element[3],
                            priceWithoutTax: element[4],
                            purchaseUnit: element[5] = element[5] !== null ? element[5].toString('utf8') : 'Null',
                            saleUnit: element[6] = element[6] !== null ? element[6].toString('utf8') : 'Null',
                            category: element[7] = element[7] !== null ? element[7] : 'Null',
                            cont_umed: element[9],
                        }
                        catalogo.push(newElement)
                    });
                   
                                // IMPORTANT: close the connection
                    db.detach();
                    return res.json({
                        data: catalogo
                    })
                }
        });
    });
}

const getFullCatalog3 = (req, res) => {
    firebird.attach(conections.AC, function(err, db) {
        console.log("GETFULLCATALOG3 IN AC...");
        if(err){
            console.log("Error al consultar la base AC: " + err.message);
            firebird.attach(conections.G32, function(err, db) {
                console.log("GETFULLCATALOG3 IN G32...");
                if(err){
                    console.log("Error al consultar la base G32: " + err.message);
                }else{
                    db.execute(`
                                    select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo,  round(getArtImpt.precio_lista,2),
                                    round( getArtImpt.precio_mayoreo, 2), articulos.unidad_compra, articulos.unidad_venta, articulos.linea_articulo_id,
                                    claves_articulos.rol_clave_art_id   ,  cap.clave_articulo
                                    from get_precios_articulos_con_impto as getArtImpt
                                    left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                                    left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                                    left join claves_articulos cap on getArtImpt.articulo_id = cap.articulo_id and cap.rol_clave_art_id=17
                                    where claves_articulos.rol_clave_art_id in (17, 18, 288) 
                                `,
                        function(err, data) {
                            if(err){
                                console.log('err',err);
                            }
                            console.log("[ GETFULLCATALOG3 ] CATALOG WAS REQUEST SUCCESSFULL " + new Date() );
                            console.log('data',data);
                            
                            let catalogo = []
                            if(data){
                                data.forEach(element => {
                                    const newElement = {
                                        id: element[0],
                                        code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                                        article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                                        // price: element[3],
                                        purchaseUnit: element[5] = element[5] !== null ? element[5].toString('utf8') : 'Null',
                                        saleUnit: element[6] = element[6] !== null ? element[6].toString('utf8') : 'Null',
                                        principal: element[9],
                                    }
                                    
                                    catalogo.push(newElement)
                                });
                                db.detach();
                                return res.json({
                                    data: catalogo
                                })
                            }
                    });
                }
            });
        }else{
            db.execute(`
                            select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo,  round(getArtImpt.precio_lista,2),
                            round( getArtImpt.precio_mayoreo, 2), articulos.unidad_compra, articulos.unidad_venta, articulos.linea_articulo_id,
                            claves_articulos.rol_clave_art_id   ,  cap.clave_articulo
                            from get_precios_articulos_con_impto as getArtImpt
                            left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                            left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                            left join claves_articulos cap on getArtImpt.articulo_id = cap.articulo_id and cap.rol_clave_art_id=17
                            where claves_articulos.rol_clave_art_id in (17, 18, 288) 
                        `,
                function(err, data) {
                    if(err){
                        console.log('err',err);
                    }
                    // console.log('DATA',data);
                    console.log("[ GETFULLCATALOG3 ] CATALOG WAS REQUEST SUCCESSFULL " + new Date() );
    
                    let catalogo = []
                    if(data){
                        data.forEach(element => {
    
                            // element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null'
                            // console.log(element[2]);
                            const newElement = {
                                // id: element[0],
                                code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                                article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                                // price: element[3],
                                // priceOff: element[4],
                                purchaseUnit: element[5] = element[5] !== null ? element[5].toString('utf8') : 'Null',
                                saleUnit: element[6] = element[6] !== null ? element[6].toString('utf8') : 'Null',
                                // location: '------------',
                                // category: element[7] = element[7] !== null ? element[7] : 'Null',
                                principal: element[9],
                            }
                            
                            catalogo.push(newElement)
                            // catalogo.push(newElement)
                        });
                        // console.log(catalogo);
                                    // IMPORTANT: close the connection
                        db.detach();
                        return res.json({
                            data: catalogo
                        })
                    }
                    // return res.json({
                    //     data
                    // })
            });
        }
    });
}

const getCatalogForPriceChecker = (req, res) => {
    console.log("GETFULLCATALOG_PriceChecker IN AC...");
    firebird.attach(conections.AC, function(err, db) {
        if(err){
            console.log("Error al consultar la base AC: " + err.message);
            firebird.attach(conections.G32, function(err, db) {
                console.log("GETFULLCATALOG_PriceChecker IN G32...");
                if(err){
                    console.log("Error al consultar la base G32: " + err.message);
                }else{
                    db.execute(`
                                    select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo,  round(getArtImpt.precio_lista,2),
                                    round( getArtImpt.precio_mayoreo, 2), articulos.unidad_compra, articulos.unidad_venta, articulos.linea_articulo_id,
                                    claves_articulos.rol_clave_art_id   ,  cap.clave_articulo,  articulos.contenido_unidad_compra
                                    from get_precios_articulos_con_impto as getArtImpt
                                    left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                                    left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                                    left join claves_articulos cap on getArtImpt.articulo_id = cap.articulo_id and cap.rol_clave_art_id=17
                                    where claves_articulos.rol_clave_art_id in (17, 18, 288) 
                                `,
                        function(err, data) {
                            if(err){
                                console.log('err',err);
                            }
                            console.log("[ GETFULLCATALOG3 ] CATALOG WAS REQUEST SUCCESSFULL " + new Date() );
            
                            let catalogo = []
                            if(data){
                                data.forEach(element => {
                                    const newElement = {
                                        id: element[0],
                                        code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                                        article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                                        price: element[3],
                                        purchaseUnit: element[5] = element[5] !== null ? element[5].toString('utf8') : 'Null',
                                        saleUnit: element[6] = element[6] !== null ? element[6].toString('utf8') : 'Null',
                                        principal: element[9],
                                        contenido: element[9],
                                    }
                                    
                                    catalogo.push(newElement)
                                });
                                db.detach();
                                return res.json({
                                    data: catalogo
                                })
                            }
                    });
                }
            });
        }else{
            db.execute(`
                            select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo, getArtImpt.precio_lista,
                            getArtImpt.precio_mayoreo, articulos.unidad_compra, articulos.unidad_venta, articulos.linea_articulo_id,
                            claves_articulos.rol_clave_art_id   ,  cap.clave_articulo
                            from get_precios_articulos_con_impto as getArtImpt
                            left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                            left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                            left join claves_articulos cap on getArtImpt.articulo_id = cap.articulo_id and cap.rol_clave_art_id=17
                            where claves_articulos.rol_clave_art_id in (17, 18, 288) 
                        `,
                function(err, data) {
                    if(err){
                        console.log('err',err);
                    }
                    // console.log('DATA',data);
                    console.log("[ GETFULLCATALOG3 ] CATALOG WAS REQUEST SUCCESSFULL " + new Date() );

                    let catalogo = []
                    if(data){
                        data.forEach(element => {

                            // element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null'
                            // console.log(element[2]);
                            const newElement = {
                                id: element[0],
                                code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                                article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                                price: element[3],
                                priceOff: element[4],
                                purchaseUnit: element[5] = element[5] !== null ? element[5].toString('utf8') : 'Null',
                                saleUnit: element[6] = element[6] !== null ? element[6].toString('utf8') : 'Null',
                                // location: '------------',
                                // category: element[7] = element[7] !== null ? element[7] : 'Null',
                                principal: element[9],
                            }
                            
                            catalogo.push(newElement)
                            // catalogo.push(newElement)
                        });
                        // console.log(catalogo);
                                    // IMPORTANT: close the connection
                        db.detach();
                        return res.json({
                            data: catalogo
                        })
                    }
                    // return res.json({
                    //     data
                    // })
            });
        }
    });
}


const getFullCatalog = (req, res) => {
    firebird.attach(conections.AC, function(err, db) {
        // console.log('err1',db);
        db.execute(`
                        select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo, getArtImpt.precio_lista,
                        getArtImpt.precio_mayoreo, articulos.unidad_compra, articulos.unidad_venta, articulos.linea_articulo_id,
                        claves_articulos.rol_clave_art_id   ,  cap.clave_articulo
                        from get_precios_articulos_con_impto as getArtImpt
                        left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                        left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                        left join claves_articulos cap on getArtImpt.articulo_id = cap.articulo_id and cap.rol_clave_art_id=17
                        where claves_articulos.rol_clave_art_id in (17, 18, 288)
                    `,
            function(err, data) {
                if(err){
                    console.log('err',err);
                }
                console.log('DATA',data);
                let catalogo = []
                if(data){
                    data.forEach(element => {

                        // element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null'
                        // console.log(element[2]);
                        const newElement = {
                            id: element[0],
                            code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                            article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                            // price: element[3],
                            // priceOff: element[4],
                            purchaseUnit: element[5] = element[5] !== null ? element[5].toString('utf8') : 'Null',
                            saleUnit: element[6] = element[6] !== null ? element[6].toString('utf8') : 'Null',
                            // location: '------------',
                            // category: element[7] = element[7] !== null ? element[7] : 'Null',
                            principal: element[9],
                        }
                        
                        catalogo.push(newElement)
                        // catalogo.push(newElement)
                    });
                    // console.log(catalogo);
                                // IMPORTANT: close the connection
                    db.detach();
                    return res.json({
                        data: catalogo
                    })
                }
                // return res.json({
                //     data
                // })
        });
    });
}

const obtenerListaPrecios = (req, res) => {
    firebird.attach(conections.AC, function(err, db) {
        console.log('err1',err);
        db.query(`
                        select
                            getArtImpt.articulo_id,
                            getArtImpt.clave_articulo,
                            getArtImpt.nombre_articulo,
                            round(getArtImpt.precio_lista,2) as precio_lista,
                            round( getArtImpt.precio_mayoreo, 2) as precio_mayoreo,
                            round( getArtImpt.precio_especial, 2) as precio_especial
                        from X_PRECIOS_ARTICULOS_CON_IMPTS as getArtImpt
                        left join articulos on getArtImpt.articulo_id = articulos.articulo_id
                        left join claves_articulos on getArtImpt.clave_articulo = claves_articulos.clave_articulo
                        left join claves_articulos cap on getArtImpt.articulo_id = cap.articulo_id and cap.rol_clave_art_id=17
                        where claves_articulos.rol_clave_art_id in (17, 18, 288)
                    `,
            function(err, data) {
                if(err){
                    console.log('err',err);
                }
                
                if(data){
                    let catalogo = data.map(articulo => {
                        return  {
                            clave_articulo : articulo.CLAVE_ARTICULO.toString('latin1'),
                            nombre_articulo : articulo.NOMBRE_ARTICULO.toString('latin1'),
                            precio_lista : articulo.PRECIO_LISTA,
                            precio_mayoreo : articulo.PRECIO_MAYOREO,
                            precio_especial : articulo.PRECIO_ESPECIAL,
                        }
                        
                    });
                    db.detach();
                    return res.json({
                        articulos: catalogo
                    })
                }

        });
    });
}

const getArticleCategories = ( req, res) => {
    firebird.attach(connections.AC, function(err, db) {
        console.log(err);
        db.query(`select lineas_articulos.linea_articulo_id, lineas_articulos.nombre from lineas_articulos
                order by lineas_articulos.nombre ASC`, function(err, data) {
                    const finalData = [];
                    data.forEach(element => {
                        const newElement = {
                            categoryId:  element.LINEA_ARTICULO_ID = element.LINEA_ARTICULO_ID !== null ? element.LINEA_ARTICULO_ID : 'Null',
                            name:  element.NOMBRE = element.NOMBRE !== null ? element.NOMBRE : 'Null',
                        }
                        // console.log(newElement);
                        finalData.push(newElement)
                        
                        
                    })
                    db.detach();
                    return res.json({
                        'categories': finalData
                    })
        });
    });
}

const getArticlesByCategory = ( req, res) => {
    firebird.attach(options, function(err, db) {
        console.log(err);
        db.query(`select * from articulos where articulos.linea_articulo_id = '15985' and articulos.estatus = 'A'`, function(err, data) {
                    const finalData = [];
                    data.forEach(element => {
                        const newElement = {
                            categoryId:  element.LINEA_ARTICULO_ID = element.LINEA_ARTICULO_ID !== null ? element.LINEA_ARTICULO_ID : 'Null',
                            name:  element.NOMBRE = element.NOMBRE !== null ? element.NOMBRE : 'Null',
                        }
                        // console.log(newElement);
                        finalData.push(newElement)
                        
                        
                    })
                    db.detach();
                    return res.json({
                        'categories': finalData
                    })
        });
    });
}


getReportTaces = ( req, res) => {
    firebird.attach(options, function(err, db) {
        if (err) {
            db.detach();
            return res.status(500).json({
                err: 'Error'
            });
        }
        console.log(err);
        db.execute(`select getArtImpt.articulo_id, getArtImpt.clave_articulo, getArtImpt.nombre_articulo, getArtImpt.precio_lista, getArtImpt.precio_mayoreo, articulos.unidad_compra, articulos.unidad_venta
                    from get_precios_articulos_con_impto as getArtImpt
                    join articulos on getArtImpt.articulo_id = articulos.articulo_id`,
            function(err, data) {
                if(err){
                    db.detach();
                    return res.status(500).json({
                        err: 'Error'
                    });
                }
                let catalogo = []
                if(data){
                    data.forEach(element => {
                        const newElement = {
                            id: element[0],
                            code: element[1] = element[1] !== null ? element[1].toString('utf8') : 'Null',
                            article: element[2] = element[2] !== null ? element[2].toString('utf8') : 'Null',
                            price: element[3],
                            priceOff: element[4],
                            purchaseUnit: element[5] = element[5] !== null ? element[5].toString('utf8') : 'Null',
                            saleUnit: element[6] = element[6] !== null ? element[6].toString('utf8') : 'Null',
                            // location: '------------'
                        }
                        
                        catalogo.push(newElement)
                    });
                    console.log(catalogo);
                                // IMPORTANT: close the connection
                    db.detach();
                    return res.json({
                        data: catalogo
                    })
                }
        });
    });
}

const get_jec_venta_by_date = (req, res) => {
    const initialDate = req.params.initialDate;
    const finalDate = req.params.finalDate;
    firebird.attach(conections.AC, async function(err, db) {
        if (err) {
            console.log(err);
        }
        db.query(`SELECT * FROM get_jec_venta_by_date('${initialDate}', '${finalDate}')`, async function(err, data) {
            if (err) {
                console.log(err);
            }
            let result = [];
            console.log(data);
            data.forEach((element, index) => {
                let newElement = {
                    almacenId : element.ALMACEN_ID,
                    almacen : element.ALMACEN !== null? element.ALMACEN.toString('utf8'): 'Null',
                    articuloId : element.ARTICULO_ID,
                    clave_articulo : element.CLAVE_ARTICULO !== null? element.CLAVE_ARTICULO.toString('utf8'): 'Null',
                    nombre : element.NOMBRE !== null? element.NOMBRE.toString('utf8'): 'Null',
                    unidad_compra : element.UNIDAD_COMPRA !== null? element.UNIDAD_COMPRA.toString('utf8'): 'Null',
                    contenido_unidad_compra : element.CONTENIDO_UNIDAD_COMPRA,
                    pv : element.PV,
                    ve : element.VE,
                    uVendidas : element.UVENDIDAS,
                    porComprar : element.PORCOMPRAR,
                    
                }
                result.push(newElement);


            });

            console.log(result);
            return res.json({
                ok:true,
                result
            })

        });
    });
}

const getDataToPolicy = (req, res) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;

    const all = Promise.allSettled([
        firebirdQuerys.getDataToPolicyTest('AC', date1, date2),
        firebirdQuerys.getDataToPolicyTest('G32', date1, date2),
        // firebirdQuerys.getDataToPolicyTest('G32H', date1, date2),
        firebirdQuerys.getDataToPolicyTest('TURCIO', date1, date2),
        firebirdQuerys.getDataToPolicyTest('PAEZ', date1, date2),
        firebirdQuerys.getDataToPolicyTest('COLIMA', date1, date2),
        firebirdQuerys.getDataToPolicyTest('VILLA', date1, date2),
        firebirdQuerys.getDataToPolicyTest('COLINAS', date1, date2),
        firebirdQuerys.getDataToPolicyTest('CHAVEZC', date1, date2)
    ]).then((values) => {
        let data = [];
        let fails =  ''
        let emptys =  ''
        values.forEach(element => {
            console.log(element);
            if (element.status !== 'rejected') {
                data = [...data, ...element.value.catalogo]
                if(element.value.catalogo.length === 0){
                    emptys = emptys + ' ' + element.value.conection
                }
            } else {
                console.log(element);
               fails = fails + ' ' + element.reason.conection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
            emptys: emptys.trim()
        });
    });
}

const getDataToPolicyByDB = (req, res) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;
    const conection = req.params.conection;
    firebirdQuerys.getDataToPolicyTest(conection, date1, date2)
        .then( resp => {
            return res.json({
                ok: true,
                data: resp
            });
        }).catch(error => {
            return res.status(500).json({
                ok: false,
                error
            });
        })
}


const getTotalCm = (req, res) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;

    const all = Promise.allSettled([
        firebirdQuerys.getCmTotal('AC', date1, date2),
        firebirdQuerys.getCmTotal('G32', date1, date2),
        firebirdQuerys.getCmTotal('G32H', date1, date2),
        firebirdQuerys.getCmTotal('TURCIO', date1, date2),
        firebirdQuerys.getCmTotal('PAEZ', date1, date2),
        firebirdQuerys.getCmTotal('COLIMA', date1, date2),
        firebirdQuerys.getCmTotal('VILLA', date1, date2),
        firebirdQuerys.getCmTotal('COLINAS', date1, date2)
    ]).then((values) => {
        console.log(values);
        values.forEach(e => console.log(e.value))
        values = values.map( element => {
            return element.value
        });

        return res.json({
            values
        });
    });
}

const getClientByRfc = (req, res) => {
    const rfc = req.params.rfc;
    firebird.attach(conections.test, async function(err, db) {
        if (err) {
            console.log(err);
        }
        db.query(
            `select
                dc.cliente_id,
                clientes.nombre,
                dc.rfc_curp,
                dc.codigo_postal,
                libres_clientes.clave_regimen_fiscal,
                libres_clientes.nombre_regimen_fiscal,
                libres_clientes.tipo_de_persona
            from dirs_clientes dc
            inner join libres_clientes on dc.cliente_id = libres_clientes.cliente_id
            inner join clientes on dc.cliente_id = clientes.cliente_id
            where dc.rfc_curp = '${rfc}' `, async function(err, data) {
            if (err) {
                console.log(err);
                return
            }

            console.log(data);

            if (data.length == 0) {
                return res.json({
                    ok:true,
                    client: []
                }) 
            }

            data = data[0]

            clientInfo = {
                clientMicrosipId :  data.CLIENTE_ID,
                clientName :    data.NOMBRE,
                clientFiscalName :    data.NOMBRE,
                rfc :  data.RFC_CURP !== null? data.RFC_CURP.toString('utf8'): 'Null',
                cp :  data.CODIGO_POSTAL !== null? data.CODIGO_POSTAL.toString('utf8'): 'Null',
                crf: data.CLAVE_REGIMEN_FISCAL ,
                nrf: data.NOMBRE_REGIMEN_FISCAL !== null? data.NOMBRE_REGIMEN_FISCAL.toString('utf8'): 'Null',
                tp: data.TIPO_DE_PERSONA !== null? data.TIPO_DE_PERSONA.toString('utf8'): 'Null',
            }

            return res.json({
                ok:true,
                client: clientInfo
            });

        });
    });
}

const getClientFiscalName = (req, res) => {
    const rfc = req.params.rfc;
    firebird.attach(conections.AC , async function(err, db) {
        if (err) {
            console.log(err);
        }
        db.query(
            `SELECT RFCS_LCO.NOMBRE_FISCAL FROM RFCS_LCO WHERE RFCS_LCO.RFC = '${rfc}' `, async function(err, data) {
            if (err) {
                console.log(err);
                return
            }


            if (data.length == 0) {
                return res.json({
                    ok:true,
                    clientFiscalName: ''
                }) 
            }

            data = data[0]

            const clientInfo = data.NOMBRE_FISCAL;
            

            return res.json({
                ok:true,
                clientFiscalName: clientInfo
            });

        });
    });
}

const updateDataFiscalClientMicrosip = (req, res) => {
    console.log('Entro');
    firebird.attach(conections.test, function(err, db) {
        console.log(err);
        db.execute(`UPDATE clientes SET clientes.nombre = 'PRUEBA NODE.JS' where clientes.cliente_id = '840'`, function(err, data) {
            if(err){
                console.log(err);
            }

            if(data){
                return res.json({
                    msg: 'Actualizado'
                })
            }
        });
    });
}

const test = (req, res) => {
    firebirdQuerys.getDataToPolicyTest('AC',);
}


const getCustomersBalances = (req = request, res = response) => {
    const date = req.params.date
    const all = Promise.all([
        firebirdQuerys.getCustomersBalances('AC', date),
        firebirdQuerys.getCustomersBalances('G32', date)
    ]).then(cargosPorCliente => {
        return res.json({
            CustomersBalances : [...cargosPorCliente[0], ...cargosPorCliente[1] ]
        });
    })
}

const getCustomersBalancesToday = (req = request, res = response) => {
    let data = [];
    const all = Promise.all([
        firebirdQuerys.getCustomersBalancesToday('AC'),
        firebirdQuerys.getCustomersBalancesToday('G32'),
        firebirdQuerys.getCustomersBalancesToday('TURCIO'),
        //firebirdQuerys.getCustomersBalancesToday('PAEZ'),
        firebirdQuerys.getCustomersBalancesToday('COLIMA'),
        firebirdQuerys.getCustomersBalancesToday('VILLA'),
        firebirdQuerys.getCustomersBalancesToday('COLINAS'),
        firebirdQuerys.getCustomersBalancesToday('CHAVEZC'),
    ]).then(
        cargosPorCliente =>{
            cargosPorCliente.forEach(clienteBalance => {
                data.push(...clienteBalance);
            });
            return res.json({
                CustomersBalances: data
            })
    });
}

const getDataToPolicyByDay = (req = request, res = response) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;

    const all = Promise.allSettled([
        firebirdQuerys.getDataToPolicyByDay('AC', date1, date2),
        firebirdQuerys.getDataToPolicyByDay('G32', date1, date2),
        firebirdQuerys.getDataToPolicyByDay('TURCIO', date1, date2),
        firebirdQuerys.getDataToPolicyByDay('PAEZ', date1, date2),
        firebirdQuerys.getDataToPolicyByDay('COLIMA', date1, date2),
        firebirdQuerys.getDataToPolicyByDay('VILLA', date1, date2),
        firebirdQuerys.getDataToPolicyByDay('COLINAS', date1, date2),
        firebirdQuerys.getDataToPolicyByDay('CHAVEZC', date1, date2)
    ]).then((values) => {
        console.log(values);
        let data = [];
        let fails =  ''
        let emptys =  ''
        values.forEach(element => {
            console.log(element);
            if (element.status !== 'rejected') {
                data = [...data, ...element.value.totals]
                if(element.value.totals.length === 0){
                    emptys = emptys + ' ' + element.value.conection
                }
            } else {
                console.log(element);
               fails = fails + ' ' + element.reason.conection;
            }
        });
        return res.json({
            data,
            fails: fails.trim(),
            emptys: emptys.trim()
        });
    });
}

const getCustomersBalancesByDb = (req = request, res = response) => {
    const date = req.params.date;
    const conection = req.params.conection;
    firebirdQuerys.getCustomersBalances(conection, date).then( cargosPorCliente => {
        return res.json({
            CustomersBalances : cargosPorCliente
        });
    });
}


const getConsecutiveP = (req = request, res = response) => {
    const conection = req.params.conection;
    const serie = req.params.serie;
    firebirdQuerys.getLastFolioVe(conection, serie).then( data => {
        console.log(data);
        return res.json({
            consecutive : data.CONSECUTIVE,
            serie : data.SERIE.toString('UTF-8')
        });
    });
}

const updateLastFolioP = (req = request, res = response) => {
    const folioId = req.params.folioId;
    const conection = req.params.conection;
    const consecutive = req.params.consecutive;
    console.log('consecutive',consecutive);
    firebirdQuerys.updateLastFolioP(conection, folioId, consecutive).then( data => {
        console.log('data',data);
        return res.json({
            data,
            msg : 'Consecutivo actualizado correctamente'
        });
    });
}

const createDoctoP = (req = request, res = response) => {
    const folioId = req.params.folioId;
    const conection = req.params.conection;
    const data = req.body;
    console.log(data);
    firebirdQuerys.createDoctoVe(conection, data).then( (id) => {
        return res.json({
            ok : true,
            msg : 'Pedido Guardado correctamente2',
            id
        });
    });
}

const getArticlesByFolioVe = (req = request, res = response) => {
    const conection = req.params.conection;
    const folio = req.params.folio;
    firebirdQuerys.getArticlesByFolioVe(conection, folio).then( (data) => {
        return res.json({
            ok : true,
            msg : 'Informacion extraida correctamente',
            data
        });
    });
}

const getLastFolioCm = (req = request, res = response) => {
    const conection = req.params.conection;
    const type = req.params.type;
    const serie = req.params.serie;
    console.log(conection,'dsfd');
    firebirdQuerys.getLastFolioCm(conection, type, serie).then( (result) => {        
        return res.json({
            ok : true,
            consecutive : result.CONSECUTIVO,
            serie : result.SERIE.toString('utf-8'),
            serieId: result.FOLIO_COMPRAS_ID
        });
    });
}

const insertDoctoCm = (req = request, res = response) => {
    const conection = req.params.conection;
    const data = req.body;
    firebirdQuerys.insertDoctoCm(conection, data).then( (result) => {
        return res.json({
            ok : true,
            result
        });
    });
}

const updateLastFolioCm = (req = request, res = response) => {
    const folioId = req.params.folioId;
    const conection = req.params.conection;
    const consecutive = req.params.consecutive;
    firebirdQuerys.updateLastFolioCm(conection, folioId, consecutive).then( data => {
        console.log(data);
        return res.json({
            data,
            msg : 'Consecutivo actualizado correctamente'
        });
    });
}

const insertDoctoCmDet = (req = request, res = response) => {
    const conection = req.params.conection;
    const docId = req.params.docId;
    const data = req.body
    firebirdQuerys.insertDoctoCmDet(conection, docId,data).then( data => {
        console.log(data);
        return res.json({
            data,
            msg : 'Detalle insertado correctamente'
        });
    });
}

const getProviders = (req, res) => {
    firebirdQuerys.getProviders('G32').then(providers => {
        return res.json({
            providers
        });
    });
}

const getArticlesToHealer = (req, res) => {
    const min = req.params.min;
    const max = req.params.max;
    const provider = req.params.provider;
    firebirdQuerys.getArticlesToHealer('G32', min, max, provider).then(articles => {
        return res.json({
            articles
        })
    });
}

const getMarks = (req, res) => {
    firebirdQuerys.getMarks('AC').then(marks => {
        return res.json({
            marks
        })
    });
}



    const getStockByArticle = (req, res=response) => {
        const conection = req.params.conection;
        const code = req.params.code;
        firebirdQuerys.getStockByArticle(conection, code).then(article => {
            return res.json({
                article
            })
        });
    }

    const getArticleIdByCodeAndCategoryId = (req, res) => {
        const conection = req.params.conection;
        const {code, categoryname} = req.headers;

        Promise.all([
            firebirdQuerys.getArticleIdByCode(conection, code),
            firebirdQuerys.getCategoryIdByName(conection, categoryname)
        ])
        .then(data => {
            return res.json({
                articleId: data[0],
                categoryId: data[1]
            });
        })
        .catch( (error) => {
            console.log(error);
            return res.status(404).json({
                error
            });
        });
    }
    
    const getTaxIdByName = (req, res=response) => {
            const conection = req.params.conection;
            const taxName = req.params.taxName;
            firebirdQuerys.getTaxIdByName(conection, taxName).then(taxId => {
                return res.json({
                    taxId
                });
            });
    }
    
    const updateArticle = (req, res=response) => {
            const conection = req.params.conection;
            const article = req.body;
            firebirdQuerys.updateArticle(conection, article).then(articleUpdated => {
                return res.json({
                    article: articleUpdated
                });
            });
    }
    const updateArticlePurchase = (req, res=response) => {
            const conection = req.params.conection;
            const article = req.body;
            firebirdQuerys.updateArticlePurchase(conection, article).then(articleUpdated => {
                return res.json({
                    article: articleUpdated
                });
            });
    }
    
    const updateArticleSatKey = (req, res=response) => {
            const conection = req.params.conection;
            const article = req.body;
            firebirdQuerys.updateArticleSatKey(conection, article).then(msg => {
                return res.json({
                    ok: true,
                    msg
                });
            });
    }
    
    const deleteArticleTaxes = (req, res=response) => {
            const conection = req.params.conection;
            const article = req.body;
            firebirdQuerys.deleteArticleTaxes(conection, article).then(msg => {
                return res.json({
                    ok: true,
                    msg
                });
            });
    }
    
    const getTaxesIds = (req, res=response) => {
            const conection = req.params.conection;
            console.log(req.body);
            const taxes = req.body;
            firebirdQuerys.getTaxesIds(conection, taxes).then(taxes => {
                return res.json({
                    ok: true,
                    taxes
                });
            });
    }
    
    
    
    const insertArticleTaxes = (req, res=response) => {
            const conection = req.params.conection;
            const {articleId, taxes} = req.body;
            firebirdQuerys.insertArticleTaxes(conection, articleId, taxes).then(msg => {
                return res.json({
                    ok: true,
                    msg
                });
            });
    }
    
    const deleteArticleKeys = (req, res=response) => {
        const conection = req.params.conection;
        const article = req.body;
        firebirdQuerys.deleteArticleKeys(conection, article).then(msg => {
            return res.json({
                ok: true,
                msg
            });
        });
    }
    
    const getArticleRolesId = (req, res=response) => {
        const conection = req.params.conection;
        console.log(req.body);
        const taxes = req.body;
        firebirdQuerys.getArticleRolesId(conection, taxes).then( roles_ids => {
            return res.json({
                ok: true,
                roles_ids
            });
        });
    }
    
    const insertArticleKeys = (req, res=response) => {
        const conection = req.params.conection;
        console.log(req.body);
        const data = req.body;
        firebirdQuerys.insertArticleKeys(conection, data).then( roles_ids => {
            return res.json({
                ok: true,
                roles_ids
            });
        });
    }
    
    const deleteArticleSubcategories = (req, res=response) => {
        const conection = req.params.conection;
        const article = req.body;
        firebirdQuerys.deleteArticleSubcategories(conection, article).then( msg => {
            return res.json({
                ok: true,
                msg
            });
        });
    }
    
    const getArticleSubcategoryId = (req, res=response) => {
        const conection = req.params.conection;
        const article = req.body;
        console.log(article);
        firebirdQuerys.getArticleSubcategoryId(conection, article).then( subcategoryId => {
            return res.json({
                ok: true,
                subcategoryId
            });
        });
    }
    
    const insertArticleSubcategory = (req, res=response) => {
        const conection = req.params.conection;
        const subcategoriesData = req.body;
        console.log('insert subcategories', subcategoriesData);
        firebirdQuerys.insertArticleSubcategory(conection, subcategoriesData).then( msg => {
            return res.json({
                ok: true,
                msg
            });
        });
    }

    const updateArticleToHealer = (req, res=response) => {
        const {article, user} = req.body;
        const conection = req.params.conection;
        console.log('NEW', req.body);
        firebirdQuerys.updateArticleToHealer(conection, article, user).then( msg => {
            return res.json({
                ok: true,
                msg
            });
        });
    }


    const getArticleStockByWarehouse = (req, res=response) => {
        const articleCode = req.params.articleCode;
        console.log("JecStockList | getArticleStockByWarehouse | Clave_Articulo: " + articleCode);
         const all = Promise.allSettled([
            // G32
            firebirdQuerys.getArticleStockByWarehouse('G32', articleCode, 303676,'g32'), 
            firebirdQuerys.getArticleStockByWarehouse('G32', articleCode, 303677, 'g10'),
            firebirdQuerys.getArticleStockByWarehouse('G32', articleCode, 359002, 'insumos'),
            //CIMA
            firebirdQuerys.getArticleStockByWarehouse('CIMA', articleCode, 31862487, 'cima'),
    
            // CEDIS
            firebirdQuerys.getArticleStockByWarehouse('AC', articleCode, 181613, 'cedis'),
            firebirdQuerys.getArticleStockByWarehouse('AC', articleCode, 181614, 'ac'),
            firebirdQuerys.getArticleStockByWarehouse('AC', articleCode, 662747, 'ruta'),
            firebirdQuerys.getArticleStockByWarehouse('AC', articleCode, 1043639, 'empaque'),
            //TURCIO
            firebirdQuerys.getArticleStockByWarehouse('TURCIO', articleCode, 179263, 'turcio'),
            //TIANGUIS
            firebirdQuerys.getArticleStockByWarehouse('TIANGUIS', articleCode, 37698592, 'adi_1'),
            firebirdQuerys.getArticleStockByWarehouse('TIANGUIS', articleCode, 31906795, 'adi_2'),
            firebirdQuerys.getArticleStockByWarehouse('TIANGUIS', articleCode, 31906794, 'cima_2'),
            firebirdQuerys.getArticleStockByWarehouse('TIANGUIS', articleCode, 31907026, 'rf'),
            //PAEZ
            firebirdQuerys.getArticleStockByWarehouse('PAEZ', articleCode, 186107, 'paez'),
            //COLIMA
            firebirdQuerys.getArticleStockByWarehouse('COLIMA', articleCode, 3111, 'colima'),
            firebirdQuerys.getArticleStockByWarehouse('COLIMA', articleCode, 3113, 'cereales_cortes'),
            firebirdQuerys.getArticleStockByWarehouse('COLIMA', articleCode, 3112, 'insumos_colima'),
            firebirdQuerys.getArticleStockByWarehouse('COLIMA', articleCode, 464117, 'reposteria_colima'),
            //VIlla
            firebirdQuerys.getArticleStockByWarehouse('VILLA', articleCode, 5367, 'villa'),
            firebirdQuerys.getArticleStockByWarehouse('VILLA', articleCode, 5369, 'villa_remate'),
            //COLINAS
            firebirdQuerys.getArticleStockByWarehouse('COLINAS', articleCode, 3012, 'colinas'),
            //CHAVEZ CARRILLO
            firebirdQuerys.getArticleStockByWarehouse('CHAVEZC', articleCode, 19, 'chavez_carrillo'),
         ]).then( (values) => {
            let data = [];
            let fails =  ''
            values.forEach(element => {
                if (element.status !== 'rejected') {
                    const newElement = {
                        almacen : element.value.almacen,
                        existencia : element.value.existencia,
                        clave_sat : element.value.clave_sat+""
                    }
                    data = [...data, newElement ];
                } else {
                    console.log(element);
                   fails = fails + ' ' + element.reason.conection;
                }
            });
            return res.json({
                data,
                fails: fails.trim(),
            });
         })
    }

    const getJecStockListExisByWarehouse  = (req, res = response) => {
        console.log('Bi JecStockList | getJecStockListExisByWarehouse');
        //const articleCode = req.params.articleCode;
        const all = Promise.allSettled([
            // G32
            firebirdQuerys.getJecStockListExisByWarehouse('G32', 303676, 303676),         
            firebirdQuerys.getJecStockListExisByWarehouse('G32', 303677, 303677),        
            firebirdQuerys.getJecStockListExisByWarehouse('G32', 359002, 359002),    
            //CIMA
            firebirdQuerys.getJecStockListExisByWarehouse('CIMA', 31862487, 359027),        

            // CEDIS
            firebirdQuerys.getJecStockListExisByWarehouse('AC', 181613, 359009),   
            firebirdQuerys.getJecStockListExisByWarehouse('AC', 181614, 359003),
            firebirdQuerys.getJecStockListExisByWarehouse('AC', 662747, 359021),
            firebirdQuerys.getJecStockListExisByWarehouse('AC', 1043639, 359017),
            //TURCIO
            firebirdQuerys.getJecStockListExisByWarehouse('TURCIO', 179263, 359004),
            //TIANGUIS
            firebirdQuerys.getJecStockListExisByWarehouse('TIANGUIS', 37698592, 359010),
            firebirdQuerys.getJecStockListExisByWarehouse('TIANGUIS', 31906795, 359014),
            firebirdQuerys.getJecStockListExisByWarehouse('TIANGUIS', 31906794, 359026),
            firebirdQuerys.getJecStockListExisByWarehouse('TIANGUIS', 31907026, 359015),
            //PAEZ
            firebirdQuerys.getJecStockListExisByWarehouse('PAEZ', 186107, 359005),
            //COLIMA
            firebirdQuerys.getJecStockListExisByWarehouse('COLIMA', 3111, 359011),
            firebirdQuerys.getJecStockListExisByWarehouse('COLIMA', 3113, 359006),
            firebirdQuerys.getJecStockListExisByWarehouse('COLIMA', 3112, 359016),
            firebirdQuerys.getJecStockListExisByWarehouse('COLIMA', 464117, 464039),
            //VIlla
            firebirdQuerys.getJecStockListExisByWarehouse('VILLA', 5367, 359013),
            firebirdQuerys.getJecStockListExisByWarehouse('VILLA', 5369, 359019),
            //COLINAS
            firebirdQuerys.getJecStockListExisByWarehouse('COLINAS', 3012, 359023),
            //CHAVEZ CARRILLO
            firebirdQuerys.getJecStockListExisByWarehouse('CHAVEZC', 19, 550085),
        ]).then( (values) => {
            let data = [];
            let fails =  ''
            let emptys = ''
            values.forEach(element => {
                if (element.status !== 'rejected') {
                    data = [...data, ...element.value.catalogo]
                    if(element.value.catalogo.length === 0){
                        emptys = emptys + ' ' + element.value.conection
                    }
                } else {
                    console.log(element);
                   fails = fails + ' ' + element.reason.conection;
                }
            });
            return res.json({
                data,
                fails: fails.trim(),
                emptys: emptys.trim()
            });
        })
    }

    const getJecStockListGraphByWarehouse  = (req, res = response) => {
        console.log('Bi JecStockList | getJecStockListGraphByWarehouse');
        //const articleCode = req.params.articleCode;
        const all = Promise.allSettled([
            // G32
            firebirdQuerys.getJecStockListGraphByWarehouse('G32', 303676, 303676),         
            firebirdQuerys.getJecStockListGraphByWarehouse('G32', 303677, 303677),        
            firebirdQuerys.getJecStockListGraphByWarehouse('G32', 359002, 359002),    
            //CIMA
            firebirdQuerys.getJecStockListGraphByWarehouse('CIMA', 31862487, 359027),        

            // CEDIS
            firebirdQuerys.getJecStockListGraphByWarehouse('AC', 181613, 359009),   
            firebirdQuerys.getJecStockListGraphByWarehouse('AC', 181614, 359003),
            firebirdQuerys.getJecStockListGraphByWarehouse('AC', 662747, 359021),
            firebirdQuerys.getJecStockListGraphByWarehouse('AC', 1043639, 359017),
            //TURCIO
            firebirdQuerys.getJecStockListGraphByWarehouse('TURCIO', 179263, 359004),
            //TIANGUIS
            firebirdQuerys.getJecStockListGraphByWarehouse('TIANGUIS', 37698592, 359010),
            firebirdQuerys.getJecStockListGraphByWarehouse('TIANGUIS', 31906795, 359014),
            firebirdQuerys.getJecStockListGraphByWarehouse('TIANGUIS', 31906794, 359026),
            firebirdQuerys.getJecStockListGraphByWarehouse('TIANGUIS', 31907026, 359015),
            //PAEZ
            firebirdQuerys.getJecStockListGraphByWarehouse('PAEZ', 186107, 359005),
            //COLIMA
            firebirdQuerys.getJecStockListGraphByWarehouse('COLIMA', 3111, 359011),
            firebirdQuerys.getJecStockListGraphByWarehouse('COLIMA', 3113, 359006),
            firebirdQuerys.getJecStockListGraphByWarehouse('COLIMA', 3112, 359016),
            firebirdQuerys.getJecStockListGraphByWarehouse('COLIMA', 464117, 464039),
            //VIlla
            firebirdQuerys.getJecStockListGraphByWarehouse('VILLA', 5367, 359013),
            firebirdQuerys.getJecStockListGraphByWarehouse('VILLA', 5369, 359019),
            //COLINAS
            firebirdQuerys.getJecStockListGraphByWarehouse('COLINAS', 3012, 359023),
            //CHAVEZ CARRILLO
            firebirdQuerys.getJecStockListGraphByWarehouse('CHAVEZC', 19, 550085),
        ]).then( (values) => {
            let data = [];
            let fails =  ''
            let emptys = ''
            values.forEach(element => {
                if (element.status !== 'rejected') {
                    data = [...data, ...element.value.catalogo]
                    if(element.value.catalogo.length === 0){
                        emptys = emptys + ' ' + element.value.conection
                    }
                } else {
                    console.log(element);
                   fails = fails + ' ' + element.reason.conection;
                }
            });
            return res.json({
                data,
                fails: fails.trim(),
                emptys: emptys.trim()
            });
        })
    }

    const existenciaCedisYRuta = (req, res=response) => {
        const conection = req.params.conection;
        const subcategoriesData = req.body;
        console.log('insert subcategories', subcategoriesData);
        firebirdQuerys.existenciaCedisYRuta(conection, subcategoriesData).then( msg => {
            return res.json({
                ok: true,
                msg
            });
        });
    }

module.exports = {
    cretateClient,
    addClientDir,
    getTiposClientes,
    getZonesClients,
    getVendors,
    getCollectors,
    getData,
    getPaymentConditions,
    getCitys,
    getCoins,
    getExistArts,
    getOrdersCm,
    getOrderData,
    getPricesListCatalog,
    insertIntoOrderCm,
    updateDoctoCmAmount,
    getJecInventarioMovil,
    updateJecInventarioMovil,
    getJecInventariosMovil,
    updateJecInventarioArticuloCantidad,
    getExistencias,
    getArticleCategories,
    getFullCatalog,
    getFullCatalog2,
    getFullCatalog3,
    getCatalogForPriceChecker,
    get_jec_venta_by_date,
    createDoctoCm,
    insertDoctoVeDet,
    getArticlesByFolioVe,
    getDataToPolicy,
    getDataToPolicyByDay,
    getDataToPolicyByDB,
    getTotalCm,
    getClientByRfc,
    getClientFiscalName,
    updateDataFiscalClientMicrosip,
    getMovtosByArticles,
    test,
    getCustomersBalances,
    getCustomersBalancesToday,
    getCustomersBalancesByDb,
    getConsecutiveP,
    createDoctoP,
    updateLastFolioP,
    getLastFolioCm,
    insertDoctoCm,
    updateLastFolioCm,
    insertDoctoCmDet,
    getProviders,
    getArticlesToHealer,
    getMarks,
    getStockByArticle,
    getArticleIdByCodeAndCategoryId,
    getTaxIdByName,
    updateArticle,
    updateArticlePurchase,
    updateArticleSatKey,
    deleteArticleTaxes,
    getTaxesIds,
    insertArticleTaxes,
    deleteArticleKeys,
    getArticleRolesId,
    insertArticleKeys,
    deleteArticleSubcategories,
    getArticleSubcategoryId,
    insertArticleSubcategory,
    updateArticleToHealer,
    getArticleStockByWarehouse,
    getJecStockListExisByWarehouse,
    getJecStockListGraphByWarehouse,
    obtenerListaPrecios
}