var firebird = require('node-firebird');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fir_password = process.env.FIR_PASSWORD
const conections = require('../database/connections');
const warehouses = require('../database/warehouses');
// const {formatDateToString} = require('../helpers/formatDate');
const formatDate = require('../helpers/formatDate');
const { obtenerSucursalPorFolio } = require('./sucursalPorFolio');
const { dosDecimales } = require('./redondeo');
const { obtenerDias } = require('./formatearTexto');


const getDataToPolicyTest = (conection, date1, date2) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            // console.log(conections[conection]);
            if (err) {
                console.log('CONECT', conection);
                const error = {
                    ok: false,
                    conection: conection,
                    msg: err
                }
                reject(error)
                return
            }
            db.execute(
                // `
                // select f.DOCTO_CM_ID,
                // d.CLAVE_PROV,
                // c.NOMBRE,
                // f.FOLIO_PROV
                // ,(b.importe ) as SUBTOTAL,
                // f.DSCTO_IMPORTE,
                // b.impuesto as TOTAL_IMPUESTOS,
                // C.CUENTA_CXP
                // ,(b.importe+b.impuesto) as total_neto
                // ,iif((select k.importe from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].ieps8}' )is
                // null,0,(select k.importe from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].ieps8}' )) as
                // BASEIEPS
                // ,iif((select k.importe from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].tasa0}' )is
                // null,0,(select k.importe from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].tasa0}' )) as
                // basecerooriginal
                // ,iif((select k.importe from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].iva16}' )is
                // null,0,(select k.importe from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].iva16}' )) as
                // baseiva
                // ,(b.importe-iif(((select k.importe from  importes_doctos_cp_imptos k
                // where k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].iva16}'
                // ) )is null,0,((select k.importe from  importes_doctos_cp_imptos k
                // where k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].iva16}'
                // ) ))) as BASEXENTO
                // ,iif((select k.impuesto from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id in ('${conections[conection].ieps8}', '${conections[conection].ieps6}' ) )is
                // null,0,(select k.impuesto from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id in ('${conections[conection].ieps8}', '${conections[conection].ieps6}') )) as
                // impuestoieps
                // ,iif((select k.impuesto from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].tasa0}' )is
                // null,0,(select k.impuesto from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].tasa0}' )) as
                // impuestoexento
                // ,iif((select k.impuesto from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].iva16}' )is
                // null ,0,(select k.impuesto from  importes_doctos_cp_imptos k  where
                // k.impte_docto_cp_id=b.impte_docto_cp_id and k.impuesto_id='${conections[conection].iva16}' )) as
                // impuestoiva,a.concepto_cp_id

                // from doctos_cp a
                // left join importes_doctos_cp b on(a.docto_cp_id=b.docto_cp_id)
                // left join proveedores c on(a.proveedor_id=c.proveedor_id)
                // left join claves_proveedores d on (c.proveedor_id=d.proveedor_id)
                // left join doctos_entre_sis e on(a.docto_cp_id=e.docto_dest_id)
                // left join doctos_cm f on(e.docto_fte_id=f.docto_cm_id)
                // where  a.fecha between '${date1}' and '${date2}' and a.cancelado='N'
                // and e.clave_sis_dest='CP'  and a.concepto_cp_id='51' and d.rol_clave_prov_id='49'
                // group by  d.clave_prov,c.nombre,b.impuesto,a.folio,C.cuenta_cxp,f.importe_neto,b.impte_docto_cp_id,f.folio_prov,f.DOCTO_CM_ID,f.dscto_importe
                // ,f.total_impuestos,b.importe,b.impuesto ,a.concepto_cp_id
                // `
                ` select f.DOCTO_CM_ID,
                d.CLAVE_PROV,
                c.NOMBRE,
                f.FOLIO_PROV
                ,(b.importe ) as SUBTOTAL,
                 f.DSCTO_IMPORTE,
                b.impuesto as TOTAL_IMPUESTOS,
                C.CUENTA_CXP
                ,(b.importe+b.impuesto) as total_neto
                ,sum(coalesce(ie8.importe,0) + coalesce(ie6.importe,0) + coalesce(ie30.importe,0)) as BASEIEPS
                ,sum(coalesce(b0.importe,0)+ coalesce(bex.impuesto,0)) as basecerooriginal
                ,sum(coalesce(i.importe,0)) as baseiva
                ,sum((b.importe- coalesce(i.importe,0))) as BASEXENTO
                ,sum(coalesce(ie8.impuesto,0) + coalesce(ie6.impuesto,0) + coalesce(ie30.impuesto,0)) as impuestoieps
                ,sum(coalesce(b0.impuesto,0) + coalesce(bex.impuesto,0) ) as impuestoexento
                ,sum(coalesce(i.impuesto,0)) as impuestoiva
                ,a.concepto_cp_id
                from doctos_cp a
                left join importes_doctos_cp b on(a.docto_cp_id=b.docto_cp_id)
                left join proveedores c on(a.proveedor_id=c.proveedor_id)
                left join claves_proveedores d on (c.proveedor_id=d.proveedor_id)
                left join doctos_entre_sis e on(a.docto_cp_id=e.docto_dest_id)
                left join doctos_cm f on(e.docto_fte_id=f.docto_cm_id)
                LEFT JOIN   importes_doctos_cp_imptos ie8  on
                ie8.impte_docto_cp_id=b.impte_docto_cp_id and ie8.impuesto_id in('${conections[conection].ieps8}')  --BASEIEPS 8
                LEFT JOIN   importes_doctos_cp_imptos ie6  on
                ie6.impte_docto_cp_id=b.impte_docto_cp_id and ie6.impuesto_id in('${conections[conection].ieps6}')  --BASEIEPS 6
                LEFT JOIN   importes_doctos_cp_imptos ie30  on
                ie30.impte_docto_cp_id=b.impte_docto_cp_id and ie30.impuesto_id in('${conections[conection].ieps30}')  --BASEIEPS 30
                left join  importes_doctos_cp_imptos b0
                on b0.impte_docto_cp_id=b.impte_docto_cp_id and b0.impuesto_id='${conections[conection].tasa0}' -- BASE 0
                left join  importes_doctos_cp_imptos bex
                on bex.impte_docto_cp_id=b.impte_docto_cp_id and bex.impuesto_id='${conections[conection].exento}' -- BASE EXCENTO
                left join  importes_doctos_cp_imptos i
                on i.impte_docto_cp_id=b.impte_docto_cp_id and i.impuesto_id='${conections[conection].iva16}' -- BASEIVA
                where a.fecha between '${date1}' and '${date2}' and a.cancelado='N'
                and a.concepto_cp_id='51' and d.rol_clave_prov_id='49'
                group by  d.clave_prov,c.nombre,b.impuesto,a.folio,C.cuenta_cxp,f.importe_neto,b.impte_docto_cp_id,f.folio_prov,f.DOCTO_CM_ID,f.dscto_importe
                ,f.total_impuestos,b.importe,b.impuesto ,a.concepto_cp_id`

                , function (err, data) {
                    if (err) {
                        console.log('err', err);
                        const error = {
                            ok: false,
                            conection: conection,
                            msg: err
                        }
                        reject(error)
                    }

                    let catalogo = []
                    console.log(data);
                    if (data) {
                        data.forEach(element => {

                            const newElement = {
                                docto_cm_id: element[0],
                                clave_prov: element[1],
                                nombre: element[2],
                                folio_prov: element[3] = element[3] !== null ? Number(element[3].toString('utf8')) : 'Null',
                                subtotal: element[4],
                                dscto_importe: element[5],
                                total_importe: element[6],
                                // location: '------------',
                                cuenta_cxp: element[7] = element[7] !== null ? element[7].toString('utf8') : 'Null',
                                total_neto: element[8],
                                baseieps: element[9],
                                basecerooriginal: element[10],
                                baseiva: element[11],
                                basexento: element[12],
                                impuestoieps: element[13],
                                impuestoexento: element[14],
                                impuestoiva: element[15],
                                concepto_cp_id: element[16],
                                db : conection

                            }

                            catalogo.push(newElement)
                            // catalogo.push(newElement)
                        });
                        console.log('Catalogo', catalogo);
                        // IMPORTANT: close the connection
                        data = {
                            conection,
                            catalogo
                        }
                        resolve(data);
                        db.detach();

                    }

                });
        });
    });

}
const getDataToPolicyByDay = (conection, date1, date2) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('CONECT', conection);
                const error = {
                    ok: false,
                    conection: conection,
                    msg: err
                }
                reject(error)
                return
            }
            db.execute(
                `select
                SUM(b.importe+b.impuesto) as TOTAL ,
                f.fecha
                from doctos_cp a
                left join importes_doctos_cp b on(a.docto_cp_id=b.docto_cp_id)
                left join proveedores c on(a.proveedor_id=c.proveedor_id)
                left join claves_proveedores d on (c.proveedor_id=d.proveedor_id)
                left join doctos_entre_sis e on(a.docto_cp_id=e.docto_dest_id)
                left join doctos_cm f on(e.docto_fte_id=f.docto_cm_id)
                LEFT JOIN   importes_doctos_cp_imptos ie8  on
                ie8.impte_docto_cp_id=b.impte_docto_cp_id and ie8.impuesto_id in('${conections[conection].ieps8}')  --BASEIEPS 8
                LEFT JOIN   importes_doctos_cp_imptos ie6  on
                ie6.impte_docto_cp_id=b.impte_docto_cp_id and ie6.impuesto_id in('${conections[conection].ieps6}')  --BASEIEPS 6
                LEFT JOIN   importes_doctos_cp_imptos ie30  on
                ie30.impte_docto_cp_id=b.impte_docto_cp_id and ie30.impuesto_id in('${conections[conection].ieps30}')  --BASEIEPS 30
                left join  importes_doctos_cp_imptos b0
                on b0.impte_docto_cp_id=b.impte_docto_cp_id and b0.impuesto_id='${conections[conection].tasa0}' -- BASE 0
                left join  importes_doctos_cp_imptos bex
                on bex.impte_docto_cp_id=b.impte_docto_cp_id and bex.impuesto_id='${conections[conection].exento}' -- BASE EXCENTO
                left join  importes_doctos_cp_imptos i
                on i.impte_docto_cp_id=b.impte_docto_cp_id and i.impuesto_id='${conections[conection].iva16}' -- BASEIVA
                where a.fecha between '${date1}' and '${date2}' and a.cancelado='N'
                and a.concepto_cp_id='51' and d.rol_clave_prov_id='49'
                group by f.fecha
                `
                , function (err, data) {
                    if (err) {
                        console.log('err', err);
                        const error = {
                            ok: false,
                            conection: conection,
                            msg: err
                        }
                        reject(error)
                    }

                    let totals = data.map(e => {
                        return {
                            total: e[0],
                            date: formatDate.formatDateToString(e[1])
                        }
                    });
                    data = {
                        conection,
                        totals
                    }
                    resolve(data)




                });
        });
    });

}

const getCustomersBalances = (conection, date) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log(err);
            }
            db.query(
                `
                    SELECT A.*,  B.FOLIO, B.FECHA, B.CLIENTE_ID, cc.nombre, B.DESCRIPCION, C.NOMBRE_ABREV, CLIENTES.nombre, condiciones_pago.nombre AS COND_PAGO, f.dir_consig_id, DC.rfc_curp as RFC, fp.nombre as cond_ft
                    FROM XSP_CARGOS_CLIENTE('${date}', '${date}', 'N', 'N') A
                    LEFT JOIN DOCTOS_CC B
                    ON A.DOCTO_CC_ID = B.DOCTO_CC_ID
                    LEFT JOIN clientes
                    ON B.cliente_id = clientes.cliente_id
                    Left Join condiciones_pago
                    on clientes.cond_pago_id = condiciones_pago.cond_pago_id
                    LEFT JOIN CONCEPTOS_CC C
                    ON B.CONCEPTO_CC_ID = C.CONCEPTO_CC_ID
                    JOIN doctos_ve F
                    on B.folio = F.folio
                    left join dirs_clientes dc
                    on f.dir_consig_id = DC.dir_cli_id
                    left join conceptos_cc cc
                    on b.cond_pago_id = cc.concepto_cc_id
                    Left Join condiciones_pago fp
                    on F.cond_pago_id = fp.cond_pago_id
                    ORDER BY CLIENTES.nombre
                    `, async function (err, cargos) {
                console.log(err);
                console.log(cargos);
                let cargosPorCliente = [];
                cargos.forEach((cargo) => {
                    data = {
                        docto_cc_id: cargo.DOCTO_CC_ID,
                        fecha_vencimiento: formatDate.formatDateToString(cargo.FECHA_VENCIMIENTO),
                        concepto_cc_id: cargo.CONCEPTO_CC_ID,
                        // folio : cargo.FOLIO,
                        atraso: cargo.ATRASO <= 0 ? 0 : cargo.ATRASO,
                        importe_cargo: cargo.IMPORTE_CARGO,
                        saldo: cargo.SALDO_CARGO,
                        fecha: formatDate.formatDateToString(cargo.FECHA),
                        // descripcion : cargo.DESCRIPCION != null ? cargo.DESCRIPCION.toString('utf8') : 'Sin Descripcion',
                        nombre_abrev: cargo.NOMBRE_ABREV.toString('utf8'),
                        folio: cargo.FOLIO.toString('utf8'),
                        rfc: cargo.RFC != null ? cargo.RFC.toString('utf8') : 'Sin RFC',
                        cond_pago: cargo.COND_FT != null ? cargo.COND_FT.toString('utf8') : 'Sin Condicion de Pago'
                    }
                    let exist = cargosPorCliente.find(item => item.cliente_id === cargo.CLIENTE_ID);
                    if (exist !== undefined) {
                        let i = cargosPorCliente.findIndex(item => item.cliente_id === cargo.CLIENTE_ID);
                        cargosPorCliente[i].cargos.push(data);
                        cargosPorCliente[i].cliente_saldo += cargo.SALDO_CARGO;
                        cargosPorCliente[i].cliente_saldo_vencido += cargo.ATRASO > 0 ? cargo.SALDO_CARGO : 0;
                        cargosPorCliente[i].atraso = cargo.ATRASO > cargosPorCliente[i].atraso ? cargo.ATRASO : cargosPorCliente[i].atraso;
                        cargosPorCliente[i].cond_pago = cargo.COND_PAGO != null ? cargo.COND_PAGO.toString('utf8') : 'Sin Condicion de Pago'

                    } else {
                        newItem = {
                            cliente: cargo.NOMBRE,
                            cliente_id: cargo.CLIENTE_ID,
                            cliente_saldo: cargo.SALDO_CARGO,
                            cliente_saldo_vencido: cargo.ATRASO > 0 ? cargo.SALDO_CARGO : 0,
                            cliente_mayor_atraso: cargo.ATRASO > 0 ? cargo.ATRASO : 0,
                            clienteBdd: conection,
                            cargos: [data]
                        }
                        cargosPorCliente.push(newItem);
                    }
                });
                resolve(cargosPorCliente);
                return
            }
            );
        });
    });
}
const getCustomersBalances2 = (conection, date) => {
    console.log('2');
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log(err);

                let cargs = [{
                    sucursal: conection,
                    rfc: '',
                    folio: '',
                    cuenta_cliente: '',
                    cliente: 'Favor de reprotarlo al dpto. TI',
                    fecha: '',
                    fecha_vencimiento: '',
                    cond_pago: 'Falla de Conexion',
                    importe_cargo: '',
                    saldo: '',
                    atraso: '',
                }];
                console.log(cargs);

                resolve(cargs)
                return
            }
            db.query(
                `
                    SELECT A.*,  B.FOLIO, B.FECHA, B.CLIENTE_ID, cc.nombre, B.DESCRIPCION, C.NOMBRE_ABREV, CLIENTES.nombre, condiciones_pago.nombre AS COND_PAGO, f.dir_consig_id, DC.rfc_curp as RFC, fp.nombre as cond_ft
                    FROM cargos_cliente_jgb('06.12.2024', '06.12.2024', 'N', 'N') A
                    LEFT JOIN DOCTOS_CC B
                    ON A.DOCTO_CC_ID = B.DOCTO_CC_ID
                    LEFT JOIN clientes
                    ON B.cliente_id = clientes.cliente_id
                    Left Join condiciones_pago
                    on clientes.cond_pago_id = condiciones_pago.cond_pago_id
                    LEFT JOIN CONCEPTOS_CC C
                    ON B.CONCEPTO_CC_ID = C.CONCEPTO_CC_ID
                    JOIN doctos_ve F
                    on B.folio = F.folio
                    left join dirs_clientes dc
                    on f.dir_consig_id = DC.dir_cli_id
                    left join conceptos_cc cc
                    on b.cond_pago_id = cc.concepto_cc_id
                    Left Join condiciones_pago fp
                    on F.cond_pago_id = fp.cond_pago_id
                    ORDER BY CLIENTES.nombre
                    `, async function (err, cargos) {
                console.log(err);

                let cargs = cargos.map((cargo) => {
                    return {
                        sucursal: conection,
                        rfc: cargo.RFC != null ? cargo.RFC.toString('utf8') : 'Sin RFC',
                        folio: cargo.FOLIO.toString('utf8'),
                        cuenta_cliente: '',
                        cliente: cargo.NOMBRE,
                        fecha: cargo.RFC != null ? formatDate.formatDateToString(cargo.FECHA) : 'Sin fecha',
                        fecha_vencimiento: formatDate.formatDateToString(cargo.FECHA_VENCIMIENTO),
                        cond_pago: cargo.COND_FT != null ? cargo.COND_FT.toString('utf8') : 'Sin Condicion de Pago',
                        importe_cargo: cargo.IMPORTE_CARGO,
                        saldo: cargo.SALDO_CARGO,
                        atraso: cargo.ATRASO <= 0 ? 0 : cargo.ATRASO,
                        // concepto_cc_id : cargo.CONCEPTO_CC_ID,
                        // folio : cargo.FOLIO,
                        // descripcion : cargo.DESCRIPCION != null ? cargo.DESCRIPCION.toString('utf8') : 'Sin Descripcion',
                        // nombre_abrev: cargo.NOMBRE_ABREV.toString('utf8'),
                    }
                });
                db.detach();
                resolve(cargs)
                return
            }
            );
        });
    });
}
const getCustomersBalancesHis = (conection, date) => {
    console.log('2');

    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log(err);

                let cargs = [{
                    Sucursal: conection,
                    Rfc: '',
                    Serie: '',
                    Folio: '',
                    Folio_ms: '',
                    Cliente: 'Favor de reprotarlo al dpto. TI',
                    Fecha: '',
                    Fecha_vencimiento: '',
                    Cond_pago: 'Falla de Conexion',
                    Tasa_cero: '',
                    Iva_16: '',
                    Ieps_6: '',
                    Ieps_8: '',
                    Ieps_30: '',
                    Importe_cargo: '',
                    Saldo: '',
                    Atraso: '',
                }];
                console.log(cargs);

                resolve(cargs)
                return
            }
            db.query(
                `
                    SELECT
                        DC.rfc_curp AS RFC,
                        REPLACE(LEFT(B.FOLIO, 3), '0', '') AS SERIE,
                        B.FOLIO,
                        REPLACE(LEFT(B.FOLIO, 3), '0', '') || CAST(RIGHT(B.FOLIO, 6) AS INT) AS FOLIO_MS,
                        CL.NOMBRE AS CLIENTE,
                        B.FECHA,
                        A.FECHA_VENCIMIENTO,
                        CP.NOMBRE AS COND_PAGO,
                        COALESCE(IM_0.IMPUESTO, 0) AS TASA_CERO,
                        COALESCE(IM_16.IMPUESTO, 0) AS IVA_16,
                        COALESCE(IE_6.IMPUESTO, 0) AS IEPS_6,
                        COALESCE(IE_8.IMPUESTO, 0) AS IEPS_8,
                        COALESCE(IE_30.IMPUESTO, 0) AS IEPS_30,
                        A.IMPORTE_CARGO,
                        A.SALDO_CARGO AS SALDO,
                        A.ATRASO
                    FROM cargos_cliente_jgb(current_date, current_date, 'N', 'N') A
                    LEFT JOIN DOCTOS_CC B ON A.DOCTO_CC_ID = B.DOCTO_CC_ID
                    LEFT JOIN clientes CL ON B.cliente_id = CL.cliente_id
                    LEFT JOIN condiciones_pago CP on CL.cond_pago_id = CP.cond_pago_id
                    INNER JOIN doctos_ve F on B.FOLIO = F.FOLIO
                    LEFT JOIN dirs_clientes DC ON F.dir_consig_id = DC.dir_cli_id
                    LEFT JOIN importes_doctos_cc IC ON B.docto_cc_id = IC.docto_cc_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_cc_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_cc_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'TASA CERO'
                    ) IM_0 ON IC.impte_docto_cc_id = IM_0.impte_docto_cc_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_cc_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_cc_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IVA TASA 16%'
                    ) IM_16 ON IC.impte_docto_cc_id = IM_16.impte_docto_cc_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_cc_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_cc_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IEPS 6%'
                    ) IE_6 ON IC.impte_docto_cc_id = IE_6.impte_docto_cc_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_cc_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_cc_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IEPS 8%'
                    ) IE_8 ON IC.impte_docto_cc_id = IE_8.impte_docto_cc_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_cc_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_cc_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IESP 30%'
                    ) IE_30 ON IC.impte_docto_cc_id = IE_30.impte_docto_cc_id
                    ORDER BY B.FECHA
                    `, async function (err, cargos) {
                console.log(err);

                let cargs = cargos.map((cargo) => {
                    return {
                        Sucursal: conection,
                        Rfc: cargo.RFC != null ? cargo.RFC.toString('utf8') : 'Sin RFC',
                        Serie: cargo.SERIE.toString('utf8'),
                        Folio: cargo.FOLIO.toString('utf8'),
                        Folio_ms: cargo.FOLIO_MS.toString('utf8'),
                        //cuenta_cliente: '',
                        Cliente: cargo.CLIENTE,
                        Fecha: cargo.FECHA != null ? formatDate.formatDateToString(cargo.FECHA) : 'Sin fecha',
                        Fecha_vencimiento: formatDate.formatDateToString(cargo.FECHA_VENCIMIENTO),
                        Cond_pago: cargo.COND_PAGO != null ? cargo.COND_PAGO.toString('utf8') : 'Sin Condicion de Pago',
                        Tasa_cero: cargo.TASA_CERO,
                        Iva_16: cargo.IVA_16,
                        Ieps_6: cargo.IEPS_6,
                        Ieps_8: cargo.IEPS_8,
                        Ieps_30: cargo.IEPS_30,
                        Importe_cargo: cargo.IMPORTE_CARGO,
                        Saldo: cargo.SALDO,
                        Atraso: cargo.ATRASO <= 0 ? 0 : cargo.ATRASO,
                        // concepto_cc_id : cargo.CONCEPTO_CC_ID,
                        // folio : cargo.FOLIO,
                        // descripcion : cargo.DESCRIPCION != null ? cargo.DESCRIPCION.toString('utf8') : 'Sin Descripcion',
                        // nombre_abrev: cargo.NOMBRE_ABREV.toString('utf8'),
                    }
                });
                db.detach();
                resolve(cargs)
                return
            }
            );
        });
    });
}
const getCustomersBalancesToday = (conection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            console.log('db', db);
            if (err) {
                console.log(err);
            }
            db.query(
                `
                    SELECT A.*,  B.FOLIO, B.FECHA, B.CLIENTE_ID, cc.nombre, B.DESCRIPCION, C.NOMBRE_ABREV, CLIENTES.nombre, condiciones_pago.nombre AS COND_PAGO, f.dir_consig_id, DC.rfc_curp as RFC, fp.nombre as cond_ft
                    FROM XSP_CARGOS_CLIENTE(current_date, current_date, 'N', 'N') A
                    LEFT JOIN DOCTOS_CC B
                    ON A.DOCTO_CC_ID = B.DOCTO_CC_ID
                    LEFT JOIN clientes
                    ON B.cliente_id = clientes.cliente_id
                    Left Join condiciones_pago
                    on clientes.cond_pago_id = condiciones_pago.cond_pago_id
                    LEFT JOIN CONCEPTOS_CC C
                    ON B.CONCEPTO_CC_ID = C.CONCEPTO_CC_ID
                    JOIN doctos_ve F
                    on B.folio = F.folio
                    left join dirs_clientes dc
                    on f.dir_consig_id = DC.dir_cli_id
                    left join conceptos_cc cc
                    on b.cond_pago_id = cc.concepto_cc_id
                    Left Join condiciones_pago fp
                    on F.cond_pago_id = fp.cond_pago_id
                    ORDER BY CLIENTES.nombre
                    `, async function (err, cargos) {
                console.log(err);
                //console.log(cargos);
                let cargosPorCliente = [];
                cargos.forEach((cargo) => {
                    data = {
                        docto_cc_id: cargo.DOCTO_CC_ID,
                        fecha_vencimiento: formatDate.formatDateToString(cargo.FECHA_VENCIMIENTO),
                        concepto_cc_id: cargo.CONCEPTO_CC_ID,
                        // folio : cargo.FOLIO,
                        atraso: cargo.ATRASO <= 0 ? 0 : cargo.ATRASO,
                        importe_cargo: cargo.IMPORTE_CARGO,
                        saldo: cargo.SALDO_CARGO,
                        fecha: formatDate.formatDateToString(cargo.FECHA),
                        // descripcion : cargo.DESCRIPCION != null ? cargo.DESCRIPCION.toString('utf8') : 'Sin Descripcion',
                        nombre_abrev: cargo.NOMBRE_ABREV.toString('utf8'),
                        folio: cargo.FOLIO.toString('utf8'),
                        rfc: cargo.RFC.toString('utf8'),
                        cond_pago: cargo.COND_FT != null ? cargo.COND_FT.toString('utf8') : 'Sin Condicion de Pago'
                    }
                    let exist = cargosPorCliente.find(item => item.cliente_id === cargo.CLIENTE_ID);
                    if (exist !== undefined) {
                        let i = cargosPorCliente.findIndex(item => item.cliente_id === cargo.CLIENTE_ID);
                        cargosPorCliente[i].cargos.push(data);
                        cargosPorCliente[i].cliente_saldo += cargo.SALDO_CARGO;
                        cargosPorCliente[i].cliente_saldo_vencido += cargo.ATRASO > 0 ? cargo.SALDO_CARGO : 0;
                        cargosPorCliente[i].atraso = cargo.ATRASO > cargosPorCliente[i].atraso ? cargo.ATRASO : cargosPorCliente[i].atraso;
                        cargosPorCliente[i].cond_pago = cargo.COND_PAGO != null ? cargo.COND_PAGO.toString('utf8') : 'Sin Condicion de Pago'


                    } else {
                        newItem = {
                            cliente: cargo.NOMBRE,
                            cliente_id: cargo.CLIENTE_ID,
                            cliente_saldo: cargo.SALDO_CARGO,
                            cliente_saldo_vencido: cargo.ATRASO > 0 ? cargo.SALDO_CARGO : 0,
                            cliente_mayor_atraso: cargo.ATRASO > 0 ? cargo.ATRASO : 0,
                            clienteBdd: conection,
                            cargos: [data]
                        }
                        cargosPorCliente.push(newItem);
                    }
                });
                console.log("[CUENTAS POR COBRAR] EJECUTADO CORRECTAMENTE EN " + conection);
                resolve(cargosPorCliente);
                return
            }
            );
        });
    });
}


const getCmTotal = (conection, date1, date2) => {
    console.log(conection, date1, date2);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log('err1', err);
            }
            db.query(
                `
                    select sum(doctos_cm.importe_neto) as importe, sum(doctos_cm.total_impuestos) as impuestos
                    from doctos_cm
                    where doctos_cm.fecha between '${date1}' and '${date2}'
                    and doctos_cm.estatus = 'N'
                    and doctos_cm.tipo_docto = 'C'
                    
                    `, async function (err, cargos) {
                if (err) {
                    console.log('err2', err);
                }

                const total = {
                    conection,
                    total: cargos[0].IMPORTE + cargos[0].IMPUESTOS
                }

                console.log(total);
                resolve(total);
                return
            }
            );
        });
    });
}

const getLastFolioVe = (conection, serie) => {
    console.log('getLastFolioVe', conection, serie);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log('error1');
                reject(err)
            }
            console.log(serie, conection);
            db.query(
                `
                    SELECT CONSECUTIVO AS consecutive, SERIE
                    FROM FOLIOS_VENTAS
                    WHERE FOLIOS_VENTAS.serie = '${serie}'
                    `, async function (err, data) {
                if (err) {
                    console.log('error1');

                    reject(err)
                }
                console.log(data);
                resolve(data[0]);
            }
            );
        });
    });
}

const updateLastFolioP = (conection, folioId, consecutive) => {

    console.log('updateLastFolioP', conection, folioId, consecutive);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                reject(err)
            }

            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                transaction.query(
                    `
                    UPDATE FOLIOS_VENTAS
                    SET 
                        CONSECUTIVO = ${consecutive}
                    WHERE (FOLIO_VENTAS_ID = ${folioId});
                    `, async function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    transaction.commit(function (err) {
                        if (err)
                            transaction.rollback();
                        else
                            db.detach();
                        resolve(data);
                    });
                }
                );
            });

        });
    });
}

const createDoctoVe = (conection, data) => {
    const warehouse = warehouses['almacenPrueba'];
    console.log('fdsfds', conection);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                reject(err)
            }
            db.query(
                `
                    INSERT INTO
                    DOCTOS_VE (DOCTO_VE_ID, TIPO_DOCTO, SUBTIPO_DOCTO, SUCURSAL_ID, FOLIO, FECHA, HORA, CLAVE_CLIENTE, CLIENTE_ID, DIR_CLI_ID, DIR_CONSIG_ID, ALMACEN_ID, LUGAR_EXPEDICION_ID, MONEDA_ID, TIPO_CAMBIO, TIPO_DSCTO, DSCTO_PCTJE, DSCTO_IMPORTE, ESTATUS, APLICADO, FECHA_VIGENCIA_ENTREGA, ORDEN_COMPRA, FECHA_ORDEN_COMPRA, FOLIO_RECIBO_MERCANCIA, FECHA_RECIBO_MERCANCIA, DESCRIPCION, IMPORTE_NETO, FLETES, OTROS_CARGOS, TOTAL_IMPUESTOS, TOTAL_RETENCIONES, TOTAL_ANTICIPOS, PESO_EMBARQUE, FORMA_EMITIDA, CONTABILIZADO, ACREDITAR_CXC, SISTEMA_ORIGEN, COND_PAGO_ID, FECHA_DSCTO_PPAG, PCTJE_DSCTO_PPAG, VENDEDOR_ID, PCTJE_COMIS, VIA_EMBARQUE_ID, IMPORTE_COBRO, DESCRIPCION_COBRO, IMPUESTO_SUSTITUIDO_ID, IMPUESTO_SUSTITUTO_ID, USUARIO_CREADOR, ES_CFD, MODALIDAD_FACTURACION, ENVIADO, FECHA_HORA_ENVIO, EMAIL_ENVIO, CFD_ENVIO_ESPECIAL, USO_CFDI, CFDI_CERTIFICADO, METODO_PAGO_SAT, CFDI_FACT_DEVUELTA_ID, FECHA_HORA_CREACION, USUARIO_ULT_MODIF, USUARIO_AUT_CREACION, FECHA_HORA_ULT_MODIF, CARGAR_SUN, USUARIO_AUT_MODIF, USUARIO_CANCELACION, FECHA_HORA_CANCELACION, USUARIO_AUT_CANCELACION)
                    VALUES
                    (-1, 'P', 'N', ${data.brancheId}, '${data.folio}', '${data.date}', '${data.time}', '${data.customerCode}',${data.customerId} , ${data.addrCustomerId}, ${data.addrConsigneeId}, ${data.warehouseId}, NULL, 1, 1, 'P', 0, 0, 'P', 'S', '${data.date}', NULL, NULL, NULL, NULL, 'Creado desde App Web', ${data.total}, 0, 0, ${data.totalTaxes}, 0, 0, 0, 'S', 'N', 'N', 'VE', ${data.condPaymentId}, NULL, 0, NULL, 0, ${data.wayShipmentId}, 0, NULL, NULL, NULL, '${data.user}', 'N', NULL, 'N', NULL, NULL, 'N', NULL, 'N', NULL, NULL, '${data.dateAndTime}', '${data.user}', NULL, '${data.dateAndTime}', 'S', NULL, NULL, NULL, NULL) RETURNING DOCTO_VE_ID;
                    `,
                async function (err, data) {
                    if (err) {
                        console.log('err', err);
                        reject(err)
                    }
                    resolve(data.DOCTO_VE_ID);
                }
            );
        });
    });
}

const insertDoctoVeDet = (conection, docto_ve_id, data) => {
    const warehouse = warehouses['almacenPrueba'];
    console.log('doctoId', docto_ve_id);
    console.log('data', data);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                reject(err)
            }
            data.forEach(element => {
                const queryOptional = conection == 'test' ? ', UMED, NOMBRE_ARTICULO' : ' ';
                const valuesOptional = conection == 'test' ? `, '${element.umedSale}', '${element.name}' ` : ' ';
                db.query(
                    `INSERT INTO DOCTOS_VE_DET (DOCTO_VE_DET_ID, DOCTO_VE_ID, CLAVE_ARTICULO, ARTICULO_ID, UNIDADES, UNIDADES_COMPROM, UNIDADES_SURT_DEV, UNIDADES_A_SURTIR, PRECIO_UNITARIO, PCTJE_DSCTO, DSCTO_ART, PCTJE_DSCTO_CLI, DSCTO_EXTRA, PCTJE_DSCTO_VOL, PCTJE_DSCTO_PROMO, PRECIO_TOTAL_NETO, PCTJE_COMIS, ROL, NOTAS, POSICION ${queryOptional})
                    VALUES (-1, ${docto_ve_id}, '${element.code}', ${element.id}, ${element.unities}, 0, 0, 0, ${element.priceWithoutTax}, 0, 0, 0, 0, 0, 0, ${element.total}, 0, 'N', NULL, ${element.index} ${valuesOptional} );`,
                    function (err, result) {
                        console.log('resultado', result);
                        if (err) {
                            console.log(err);
                            // return res.json({
                            //     ok:false,
                            //     msg: 'Error al insertar datos'
                            // });
                            reject(err)
                        }
                        console.log(element.index, data.length);
                        if (element.index == data.length) {
                            console.log('termino');
                            db.detach();
                            resolve(result)
                            // return res.json({
                            //     result: 'Insercion de datos correcta'
                            // });
                        }
                    });
            })
        });
    });
}

const getArticlesByFolioVe = (conection, folio) => {
    const warehouse = warehouses['almacenPrueba'];
    console.log(folio, conection);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                reject(err)
            }
            db.query(
                `
                    select doctos_ve_det.articulo_id, doctos_ve_det.clave_articulo, articulos.nombre, doctos_ve_det.unidades, doctos_ve_det.precio_unitario,  articulos.unidad_compra ,  doctos_ve_det.posicion,  doctos_ve_det.precio_total_neto, articulos.contenido_unidad_compra,doctos_ve.total_impuestos
                    from doctos_ve_det
                    inner join doctos_ve
                    on doctos_ve_det.docto_ve_id = doctos_ve.docto_ve_id
                    inner join articulos
                    on doctos_ve_det.articulo_id = articulos.articulo_id
                    where doctos_ve.folio = '${folio}'
                    `,
                async function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    console.log(data);
                    data = data.map(e => {
                        return {
                            articleId: e.ARTICULO_ID,
                            code: e.CLAVE_ARTICULO,
                            name: e.NOMBRE.toString('utf-8'),
                            unities: e.UNIDADES / e.CONTENIDO_UNIDAD_COMPRA,
                            price: e.PRECIO_UNITARIO * e.CONTENIDO_UNIDAD_COMPRA,
                            umed: e.UNIDAD_COMPRA !== null ? e.UNIDAD_COMPRA.toString('utf-8') : 'null',
                            index: e.POSICION,
                            total: e.PRECIO_TOTAL_NETO,
                            total_impt: e.TOTAL_IMPUESTOS,
                            cont_umed: e.CONTENIDO_UNIDAD_COMPRA,
                        }
                    })
                    resolve(data);
                }
            );
        });
    });
}

const getLastFolioCm = (conection, type, serie) => {
    console.log(conection);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log(err);
                reject(err)
            }
            db.query(
                `
                select folios_compras.consecutivo, folios_compras.serie,folios_compras.FOLIO_COMPRAS_ID
                from folios_compras
                where folios_compras.tipo_docto = '${type}'
                and folios_compras.serie = '${serie}'
                `,
                async function (err, data) {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    console.log('Aqui:', data[0]);
                    resolve(data[0]);
                }
            );
        });
    });
}

const insertDoctoCm = (conection, data) => {
    console.log(data);
    const { date, dateAndTime, folio, user, total, total_impt, warehouseId, brancheId, provKey, provId, provFolio, condPaymentId } = data
    const { } = warehouses['almacenPrueba'];
    console.log('data', brancheId);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log(err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                transaction.query(
                    `
                    INSERT INTO DOCTOS_CM
                    (DOCTO_CM_ID, TIPO_DOCTO, SUBTIPO_DOCTO, SUCURSAL_ID, FOLIO, FECHA, CLAVE_PROV, PROVEEDOR_ID, FOLIO_PROV, FACTURA_DEV, CONSIG_CM_ID, ALMACEN_ID, PEDIMENTO_ID, MONEDA_ID, TIPO_CAMBIO, TIPO_DSCTO, DSCTO_PCTJE, DSCTO_IMPORTE, ESTATUS, APLICADO, FECHA_ENTREGA, DESCRIPCION, IMPORTE_NETO, FLETES, OTROS_CARGOS, TOTAL_IMPUESTOS, TOTAL_RETENCIONES, GASTOS_ADUANALES, OTROS_GASTOS, FORMA_EMITIDA, CONTABILIZADO, ACREDITAR_CXP, SISTEMA_ORIGEN, COND_PAGO_ID, FECHA_DSCTO_PPAG, PCTJE_DSCTO_PPAG, VIA_EMBARQUE_ID, IMPUESTO_SUSTITUIDO_ID, IMPUESTO_SUSTITUTO_ID, CARGAR_SUN, ENVIADO, FECHA_HORA_ENVIO, EMAIL_ENVIO, TIENE_CFD, USUARIO_CREADOR, FECHA_HORA_CREACION, USUARIO_AUT_CREACION, USUARIO_ULT_MODIF, FECHA_HORA_ULT_MODIF, USUARIO_AUT_MODIF, USUARIO_CANCELACION, FECHA_HORA_CANCELACION, USUARIO_AUT_CANCELACION)
                    VALUES
                    (-1, 'O', 'N', ${brancheId}, '${folio}', '${date}', '${provKey}', ${provId}, '${provFolio}', NULL, NULL, ${warehouseId}, NULL, 1, 1, 'P', 0, 0, 'N', 'S', NULL, NULL, ${total}, 0, 0, ${total_impt}, 0, 0, 0, 'S', 'N', 'N', 'CM', ${condPaymentId}, NULL, 0, NULL, NULL, NULL, 'S', 'N', '${dateAndTime}', NULL, 'N', '${user}', '${dateAndTime}', NULL, '${user}', '${dateAndTime}', NULL, NULL, NULL, NULL) RETURNING DOCTO_CM_ID
                    `, async function (err, data) {
                    console.log('data', data);
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    transaction.commit(function (err) {
                        if (err)
                            transaction.rollback();
                        else
                            console.log(data);
                        db.detach();
                        resolve(data.DOCTO_CM_ID);
                    });
                }
                );
            });
        });
    });
}

const updateLastFolioCm = (conection, folioId, consecutive) => {
    console.log('folio', folioId, consecutive);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                reject(err)
            }

            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                transaction.query(
                    `
                    UPDATE FOLIOS_COMPRAS
                    SET CONSECUTIVO = ${consecutive}
                    WHERE (FOLIO_COMPRAS_ID = ${folioId});
                    `, async function (err, data) {
                    console.log('data', data);
                    if (err) {
                        reject(err)
                    }
                    transaction.commit(function (err) {
                        if (err)
                            transaction.rollback();
                        else
                            db.detach();
                        resolve(data);
                    });
                }
                );
            });

        });
    });
}

const insertDoctoCmDet = (conection, docId, data) => {
    const warehouse = warehouses['almacenPrueba'];
    console.log('ff', docId, conection);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            data.forEach(element => {
                db.query(
                    `
                    INSERT INTO DOCTOS_CM_DET (DOCTO_CM_DET_ID, DOCTO_CM_ID, CLAVE_ARTICULO, ARTICULO_ID, UNIDADES, UNIDADES_REC_DEV, UNIDADES_A_REC, UMED, CONTENIDO_UMED, PRECIO_UNITARIO, PCTJE_DSCTO, PCTJE_DSCTO_PRO, PCTJE_DSCTO_VOL, PCTJE_DSCTO_PROMO, DSCTO_ART, DSCTO_EXTRA, PRECIO_TOTAL_NETO, PCTJE_ARANCEL, NOTAS, POSICION)
                    VALUES (-1, ${docId}, '${element.code}', ${element.articleId}, ${element.unities}, 0, 0, '${element.umed}', ${element.cont_umed}, ${element.price}, 0, 0, 0, 0, 0, 0, ${element.total}, 0, NULL, ${element.index});
                    ` ,
                    function (err, result) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        console.log(element.index, data.length);
                        if (element.index == data.length) {
                            console.log('termino');
                            db.detach();
                            resolve(result)
                        }
                    });
            });
        });
    });
}

const getProviders = (conection, min, max) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                reject(err)
            }
            db.query(
                `
                    select arts.proveedor from xtjec_articulosanear arts
                    where arts.proveedor is not null
                    group by arts.proveedor
                    ` ,
                function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    db.detach();
                    let articles = result.map(r => r.PROVEEDOR !== null ? r.PROVEEDOR.toString('utf-8') : '')
                    resolve(articles)
                });
        });
    });
}

const getArticlesToHealer = (conection, min, max, provider = '') => {
    let query = 'select * from xtjec_articulosanear';
    console.log(provider.length);
    query = provider === 'none' ? query : `${query} where PROVEEDOR = '${provider}'`
    console.log(query);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], async function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    ${query}
                    ` ,
                function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err)
                    }
                    db.detach();
                    let articles = []
                    console.log(result);
                    result.forEach((article, i) => {
                        i += 1;
                        if (i >= min && i <= max && article.SANEADO.toString('utf-8') === 'N') {
                            articles.push(
                                {
                                    key: article.CLAVE.toString('utf-8'),
                                    name: article.NOMBRE.toString('latin1'),
                                    status: article.ESTATUS.toString('utf-8'),
                                    departament: article.DEP.toString('utf-8'),
                                    category: article.CAT.toString('utf-8'),
                                    subcategory: article.SUB_CAT.toString('utf-8'),
                                    umv: article.UMV = article.UMV !== null ? article.UMV.toString('utf-8') : '',
                                    umc: article.UMC = article.UMC !== null ? article.UMC.toString('utf-8') : '',
                                    satKey: article.CLAVE_SAT = article.CLAVE_SAT !== null ? article.CLAVE_SAT.toString('utf-8') : '',
                                    provider: article.PROVEEDOR = article.PROVEEDOR !== null ? article.PROVEEDOR.toString('utf-8') : 'NULL',
                                    barcode: article.CLAVE_BARRAS.toString('utf-8'),
                                    kretzKey: article.CLAVE_BASCULA !== null ? article.CLAVE_BASCULA.toString('utf-8') : '',
                                    iva: article.IVA.toString('utf-8'),
                                    ieps: article.IEPS.toString('utf-8'),
                                    mark: article.MARCA = article.MARCA !== null ? article.MARCA.toString('utf-8') : '',
                                    deliveryType: article.TIPO_ENTREGA = article.TIPO_ENTREGA !== null ? article.TIPO_ENTREGA.toString('utf-8') : '',
                                    recGdl: article.REC_GDL = article.REC_GDL !== null ? article.REC_GDL.toString('utf-8') : '',
                                    seasonal: article.TEMPORADA = article.TEMPORADA !== null ? article.TEMPORADA.toString('utf-8') : '',

                                    saneado: article.SANEADO.toString('utf-8'),
                                }
                            )
                        }
                    });
                    console.log(articles);
                    resolve(articles)
                });
        });
    });
}

const getMarks = (connection) => {
    console.log(connection);
    return new Promise((resolve, reject) => {
        firebird.attach(conections.AC, async function (err, db) {
            if (err) {
                console.log(err);
                reject(err)
            }
            db.query(
                `
                    Select *
                    From clasificadores_cat_valores 
                    Where clasificadores_cat_valores.clasificador_id = 27013463
                    Order By valor;                    
                    `,
                function (err, result) {
                    if (err) {
                        reject(err)
                    }
                    db.detach();
                    const marks = result.map(mark => {
                        return {
                            value: mark.VALOR_CLASIF_ID,
                            name: mark.VALOR
                        }
                    })
                    resolve(marks)
                });
        });
    });
}
const getStockByArticle = (conection, code) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    select * from exival_art_ur2('ALMACEN GENERAL CEDIS', current_date, 'N', 'S','S','S')
                    left join claves_articulos
                    on exival_art_ur2.articulo_id = claves_articulos.articulo_id
                    where claves_articulos.clave_articulo = '${code}'
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(error)
                    }
                    let article = {
                        name: data[0].NOMBRE.toString('utf-8'),
                        stock: data[0].EXISTENCIA
                    }
                    console.log(article);
                    db.detach();
                    resolve(article)
                });
        });
    });
}

const getArticleIdByCode = (conection, code) => {
    console.log(conection);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    select claves_articulos.articulo_id from claves_articulos  where claves_articulos.clave_articulo = '${code}';
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(error)
                    }
                    if (data.length === 0) {
                        reject('No se encontro articulo con esa clave')
                    } else {
                        db.detach();
                        resolve(data[0].ARTICULO_ID)
                    }

                });
        });
    });
}

const getCategoryIdByName = (conection, categoryName) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    select lineas_articulos.linea_articulo_id from lineas_articulos  where lineas_articulos.nombre = '${categoryName}';
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(error)
                    }
                    if (data.length === 0) {
                        console.log('category2', data);
                        reject('No se encontro esta categoria')
                    } else {
                        db.detach();
                        resolve(data[0].LINEA_ARTICULO_ID)
                    }

                });
        });
    });
}

const getTaxIdByName = (conection, taxName) => {
    console.log('tax', taxName);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    select impuesto_id from impuestos where impuestos.nombre like '${taxName}%';
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(error)
                    }
                    console.log('tax', data);
                    db.detach();
                    resolve(data[0].IMPUESTO_ID)
                });
        });
    });
}

const updateArticle = (conection, article) => {
    const { articleId, categoryId, name, status, umc, umv, content } = article
    console.log(article);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                transaction.query(
                    `
                    UPDATE ARTICULOS
                        SET
                            NOMBRE = '${name}' ,
                            ESTATUS = '${status}',
                            UNIDAD_VENTA = '${umv}',
                            UNIDAD_COMPRA = '${umc}',
                            CONTENIDO_UNIDAD_COMPRA = ${content},
                            LINEA_ARTICULO_ID = ${categoryId},
                            FECHA_HORA_ULT_MODIF = current_time
                        WHERE (ARTICULO_ID = ${articleId});
                    `,
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Article updated');
                        });
                    }
                );
            });
        });

    });
}

const updateArticleSatKey = (conection, article) => {
    const { articleId, satKey } = article
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                transaction.query(
                    `
                    UPDATE DATOS_ADICIONALES
                    SET CLAVE = '${satKey}'
                    WHERE (DATOS_ADICIONALES_ID = ${articleId});
                    `,
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Key Sat updated');
                        });
                    }
                );
            });
        });

    });
}

const updateArticlePurchase = (conection, article) => {
    console.log(article);
    const { articleId, content, umc } = article
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                transaction.query(
                    `
                    UPDATE PRECIOS_COMPRA
                    SET
                        CONTENIDO_UNIDAD_COMPRA = ${content},
                        UNIDAD_COMPRA = '${umc}'
                    WHERE (ARTICULO_ID = ${articleId});
                    `,
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Purchase Prices updated');
                        });
                    }
                );
            });
        });

    });
}

const deleteArticleTaxes = (conection, article) => {
    const { articleId } = article
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                if (err) {
                    console.log(err);
                }
                transaction.query(
                    `
                    DELETE FROM impuestos_articulos
                    WHERE articulo_id = ${articleId};
                    `,
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Taxes deleted');
                        });
                    }
                );
            });
        });

    });
}

const getTaxesIds = (conection, taxes) => {
    let query = '';
    console.log(taxes);
    taxes.forEach((tax, i) => {
        if (i === 0) {
            query += `= '${tax}' `
        }
        query += ` or impuestos.nombre = '${tax}'`
    });

    console.log(query);

    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    select impuesto_id from impuestos where impuestos.nombre ${query};
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    console.log('tax', data);
                    db.detach();
                    resolve(data)
                });
        });
    });
}

const insertArticleTaxes = (conection, articleId, ids = []) => {
    console.log('ids', ids);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                ids.forEach((id, i) => {
                    console.log(ids.length, i);
                    transaction.query(
                        `
                        INSERT
                        INTO IMPUESTOS_ARTICULOS (IMPUESTO_ART_ID, ARTICULO_ID, IMPUESTO_ID, UNIDADES_IMPUESTO, TIPO_SELECCION, CONJUNTO_SUCURSALES_ID)
                        VALUES (-1, ${articleId}, ${id.IMPUESTO_ID}, 0, 'T', NULL)
                        `,
                        async function (err, data) {
                            if (err) {
                                console.log(err);
                                reject(err)
                            }
                            transaction.commit(function (err) {
                                if (err) {
                                    transaction.rollback();
                                }
                                else {
                                    db.detach();
                                }
                            });
                        }
                    );
                });
                resolve('Taxes inserted');
            });
        });

    });
}

const deleteArticleKeys = (conection, article) => {
    const { articleId } = article
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                if (err) {
                    console.log(err);
                }
                transaction.query(
                    `
                    DELETE FROM claves_articulos
                    WHERE articulo_id = ${articleId} and claves_articulos.rol_clave_art_id != 17 and claves_articulos.rol_clave_art_id != 670044;
                    `,
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Keys deleted');
                        });
                    }
                );
            });
        });

    });
}

const getArticleRolesId = (conection, ids) => {
    let query = '';
    console.log(ids);
    ids.forEach((id, i) => {
        if (i === 0) {
            query += `= '${id}' `
        }
        query += ` or roles_claves_articulos.nombre = '${id}'`
    });

    console.log(query);

    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    select ROL_CLAVE_ART_ID, Nombre
                    from roles_claves_articulos
                    where roles_claves_articulos.nombre ${query};
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    console.log('id', data);
                    const roles_ids = data.map(e => {
                        return {
                            name: e.NOMBRE.toString('utf-8'),
                            rolId: e.ROL_CLAVE_ART_ID
                        }
                    })
                    db.detach();
                    resolve(roles_ids)
                });
        });
    });
}

const insertArticleKeys = (conection, data = []) => {
    console.log('data', data);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                for (let index = 0; index < data.length; index++) {
                    transaction.query(
                        `
                        INSERT INTO CLAVES_ARTICULOS (CLAVE_ARTICULO_ID, CLAVE_ARTICULO, ARTICULO_ID, ROL_CLAVE_ART_ID, CONTENIDO_EMPAQUE)
                        VALUES (-1, '${data[index].key}', ${data[index].articleId}, ${data[index].rolId}, 1);

                        `,
                        async function (err, result) {
                            if (err) {
                                console.log(err);
                                reject(err)
                            }

                            console.log('result', result);
                            transaction.commit(function (err) {
                                if (err) {
                                    transaction.rollback();
                                }
                                else {
                                    console.log('entro');
                                    console.log(data.length, index);
                                    db.detach();
                                }
                            });
                        }
                    );
                };
                resolve('Keys inserted');
            });
        });
    });
}

const deleteArticleSubcategories = (conection, article) => {
    const { articleId } = article
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                if (err) {
                    console.log(err);
                }
                transaction.query(
                    `
                    delete from elementos_cat_clasif 
                    where elementos_cat_clasif.elemento_id = ${articleId}
                    and elementos_cat_clasif.valor_clasif_id != 175
                    and elementos_cat_clasif.valor_clasif_id != 211
                    and elementos_cat_clasif.valor_clasif_id != 212
                    and elementos_cat_clasif.valor_clasif_id != 213
                    and elementos_cat_clasif.valor_clasif_id != 214
                    and elementos_cat_clasif.valor_clasif_id != 215
                    and elementos_cat_clasif.valor_clasif_id != 216
                    and elementos_cat_clasif.valor_clasif_id != 217
                    and elementos_cat_clasif.valor_clasif_id != 218
                    and elementos_cat_clasif.valor_clasif_id != 1036
                    and elementos_cat_clasif.valor_clasif_id != 1041
                    and elementos_cat_clasif.valor_clasif_id != 1042
                    and elementos_cat_clasif.valor_clasif_id != 1043
                    and elementos_cat_clasif.valor_clasif_id != 1044
                    and elementos_cat_clasif.valor_clasif_id != 1045
                    `,
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Subcategories deleted');
                        });
                    }
                );
            });
        });
    });
}

const getArticleSubcategoryId = (conection, article) => {
    console.log('article', article);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    Select VALOR_CLASIF_ID 
                    From clasificadores_cat_valores 
                    Where clasificadores_cat_valores.valor = '${article.subcategory}' 
                    And  clasificadores_cat_valores.clasificador_id = 23892786;
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    db.detach();
                    resolve(data[0].VALOR_CLASIF_ID)
                });
        });
    });
}

const insertArticleSubcategory = (conection, subcategoriesData) => {
    console.log(subcategoriesData);
    let query = '';
    subcategoriesData.values.forEach(item => {
        query += `INSERT INTO ELEMENTOS_CAT_CLASIF (ELEMENTO_ID, VALOR_CLASIF_ID) VALUES (${subcategoriesData.articleId}, ${item}); `;
    });
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                if (err) {
                    console.log(err);
                }
                transaction.query(
                    `
                    execute block as
                    declare variable cnt2 integer = 0;
                    begin
                        while (cnt2 < 2) do
                        begin
                            ${query}
                            cnt2 = cnt2 + 1;
                        end
                    end
                    `,
                    // `
                    // INSERT INTO ELEMENTOS_CAT_CLASIF (ELEMENTO_ID, VALOR_CLASIF_ID) VALUES (${articleId}, ${subcategoryId});
                    // `, 
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Subcategories inserted');
                        });
                    }
                );
            });
        });

    });
}

const updateArticleToHealer = (conection, article, user) => {
    const {
        departament,
        category,
        subcategory,
        umv,
        umc,
        iva,
        ieps,
        satKey,
        barcode,
        kretzKey,
        seasonal,
        recGdl,
        mark,
        deliveryType,
        key
    } = article
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.transaction(firebird.ISOLATION_READ_COMMITED, function (err, transaction) {
                transaction.query(
                    `
                    UPDATE XTJEC_ARTICULOSANEAR
                    SET 
                        DEP = '${departament}',
                        CAT = '${category}',
                        SUB_CAT = '${subcategory}',
                        UMV = '${umv}',
                        UMC = '${umc}',
                        IVA = '${iva}',
                        IEPS = '${ieps}',
                        CLAVE_SAT = '${satKey}',
                        CLAVE_BARRAS = '${barcode}',
                        CLAVE_BASCULA = '${kretzKey}',
                        SANEADO = 'S',
                        USUARIO = '${user}',
                        TEMPORADA = '${seasonal}',
                        REC_GDL = '${recGdl}',
                        MARCA = '${mark}',
                        TIPO_ENTREGA = '${deliveryType}'
                    WHERE (CLAVE = '${key}');
                    `,
                    async function (err, data) {
                        if (err) {
                            console.log(err);
                            reject(err)
                        }
                        transaction.commit(function (err) {
                            if (err)
                                transaction.rollback();
                            else
                                db.detach();
                            resolve('Articleupdated');
                        });
                    }
                );
            });
        });

    });
}

const getArticleStockByWarehouse = (conection, articleId, warehouseId, warehouseName) => {
    //console.log(articleId, warehouseId);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                const error = {
                    ok: false,
                    conection: conection,
                    msg: err
                }
                return reject(error)
            }
            db.query(
                // `
                // SELECT CLAVE_ARTICULO, NOMBRE, EXISTENCIA 
                // FROM EXISTENCIA_ARTICULO_JGB(${warehouseId}, '${articleId}');
                // ` 
                `
                    SELECT A.CLAVE_ARTICULO, A.NOMBRE, A.EXISTENCIA, DA.clave CLAVE_SAT FROM (
                            SELECT CLAVE_ARTICULO, NOMBRE, EXISTENCIA FROM EXISTENCIA_ARTICULO_JGB (${warehouseId}, '${articleId}')
                        ) A
                        INNER JOIN CLAVES_ARTICULOS CA ON A.CLAVE_ARTICULO = CA.clave_articulo
                        INNER JOIN DATOS_ADICIONALES DA ON CA.articulo_id = DA.elem_id
                    `
                ,
                function (err, data) {
                    //console.log("Valores consulta:");
                    //console.log(data, warehouseName);
                    if (err) {
                        reject(err)
                    }
                    if (data.length === 0) {
                        data = [{
                            EXISTENCIA: null,
                            CLAVE_SAT: null
                        }]
                    }
                    let article = data.map(element => {
                        return {
                            existencia: element.EXISTENCIA,
                            almacen: warehouseName,
                            clave_sat: element.CLAVE_SAT = element.CLAVE_SAT !== null ? element.CLAVE_SAT.toString('latin1') : 'Null',
                            //clave_sat : element.CLAVE_SAT
                        }
                    });

                    db.detach();
                    resolve(article[0])
                });
        });
    });
}

const getJecStockListExisByWarehouse = (conection, warehouseId, warehouseIdSQL) => {
    let almacen_id = 0;
    almacen_id = warehouseIdSQL;
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                const error = {
                    ok: false,
                    conection: conection,
                    msg: err
                }
                return reject(error)
            }
            db.query(
                `
                    SELECT
                        CAST(CURRENT_DATE AS DATE) AS FECHA,
                        EX.CLAVE_ARTICULO,
                        coalesce(EX.EXISTENCIA,0) as EXISTENCIA
                    FROM EXIVAL_ART_UR (${warehouseId}, CURRENT_DATE ,'S') EX
                    WHERE EX.EXISTENCIA > 0
                    `
                ,
                function (err, data) {
                    if (err) {
                        reject(err)
                    }

                    let catalogo = []
                    //console.log(data);
                    if (data) {
                        data.forEach(element => {

                            const newElement = {
                                almacen_id: almacen_id,
                                fecha: formatDate.formatDateToString(element.FECHA),
                                clave: element.CLAVE_ARTICULO = element.CLAVE_ARTICULO !== null ? element.CLAVE_ARTICULO.toString('latin1') : 'Null',
                                existencia: element.EXISTENCIA,
                            }
                            catalogo.push(newElement)
                        });

                        data = {
                            conection,
                            catalogo
                        }
                        resolve(data);
                        db.detach();
                    }
                });
        });
    });
}

const getJecStockListGraphByWarehouse = (conection, warehouseId, warehouseIdSQL) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[conection], function (err, db) {
            if (err) {
                const error = {
                    ok: false,
                    conection: conection,
                    msg: err
                }
                return reject(error)
            }
            db.query(
                `
                    SELECT
                        ESTATUS,
                        COUNT(ESTATUS) AS ARTICULOS
                    FROM ARTICULOS
                    GROUP BY ESTATUS
                    `
                ,
                function (err, data) {
                    if (err) {
                        reject(err)
                    }

                    let catalogo = []
                    //console.log(data);
                    if (data) {
                        data.forEach(element => {

                            const newElement = {
                                almacen_id: warehouseIdSQL,
                                estatus: element.ESTATUS = element.ESTATUS !== null ? element.ESTATUS.toString('latin1') : 'Null',
                                articulos: element.ARTICULOS,
                            }
                            catalogo.push(newElement)
                        });

                        data = {
                            conection,
                            catalogo
                        }
                        resolve(data);
                        db.detach();
                    }
                });
        });
    });
}

const getSalesCalculateIeps = (connection, date1, date2) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            console.log('db', connection, err);
            if (err) {
                const error = {
                    ok: false,
                    connection: connection,
                    msg: err
                }
                return reject(error)
            }
            db.execute(
                `
                    select * from get_jec_impts_ventas('${date1}', '${date2}' )
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    let count = data.map(element => {
                        return {
                            docto_id: element[0].toString('latin1'),
                            clave_cliente: element[1] !== null ? element[1].toString('latin1') : '',
                            nombre_cliente: element[2].toString('latin1'),
                            fecha: formatDate.formatDateToString(element[3].toString('latin1')),
                            factura: element[4].toString('latin1'),
                            contado: element[5],
                            base: element[6],
                            descuento: element[7],
                            subtotal: element[8],
                            credito: element[9],
                            modulo: element[10].toString('latin1'),
                            vtas_0: element[11],
                            vtas_16: element[12],
                            vtas_8: element[13],
                            vtas_6: element[14],
                            vtas_30: element[15],
                            tasa_0: element[16],
                            tasa_16: element[17],
                            ieps_8: element[18],
                            ieps_6: element[19],
                            ieps_30: element[20],
                            tienda: connection
                        }
                    });

                    db.detach();
                    console.log('data', connection, count);
                    resolve(count)
                });
        });
    });
}

const frkOrdenCompra = (connection, data) => {
    const { claveProveedor, importeNeto, condPagoId, usuarioCreador, tiempoEntrega } = data;
    let proveedorId = 0
    console.log(connection);
    console.log(claveProveedor, importeNeto, condPagoId, usuarioCreador, tiempoEntrega);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {

            if (err) {
                console.log('Error', err);
                reject(err)
            }
            db.query(
                `
                    select prov.proveedor_id, c.clave_prov from proveedores prov
                    left join claves_proveedores c
                    on c.proveedor_id = prov.proveedor_id and c.rol_clave_prov_id=49
                    where prov.nombre = '${data.claveProveedor}';
                    ` ,
                function (err, data) {
                    if (err) {
                        reject(err)
                    }
                    console.log('tax', data);
                    db.detach();
                    proveedorId = data[0].PROVEEDOR_ID;
                    firebird.attach(conections[connection], function (err, db) {
                        db.execute(
                            `
                                EXECUTE PROCEDURE XSP_FRKORDENCOMPRA  1, current_date , '${proveedorId}', dateadd (${tiempoEntrega} day to current_date), ${importeNeto},  ${condPagoId}, '${usuarioCreador}', current_date
                                ` ,
                            function (err, result) {
                                if (err) {
                                    console.log(err);
                                    reject(err)
                                }

                                console.log(result);

                                db.detach();
                                resolve({ folio: result[1].toString("utf-8"), doctoId: result[0], claveProveedor: result[2] })
                            });
                    });
                });
        });

    });
}

const frkOrdenCompraDet = (connection, data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        data.forEach((articulo, i) => {
            firebird.attach(conections[connection], function (err, db) {
                if (err) {
                    const error = {
                        ok: false,
                        connection: connection,
                        msg: err
                    }
                    return reject(error)
                }
                db.execute(
                    `
                    EXECUTE PROCEDURE XSP_FRKORDENCOMPRA 
                    2, current_date, 0, current_date, 190.02,  179019, 'JAIMEB', current_date, 
                    ${articulo.doctoId}, '${articulo.claveArticulo}', '${articulo.umed}', ${articulo.unidades}, ${articulo.contUmed}, 
                    ${articulo.precioUnitario}, ${articulo.precioNeto}, ${i + 1}
                    ` ,
                    function (err, result) {
                        db.detach();
                        if (err) {
                            reject(err)
                        }
                        if (result && i + 1 === data.length) {
                            resolve('correcto')
                        }

                    });
            });
        });
    });
}

const getCustomersCharges = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            if (err) {
                const error = {
                    ok: false,
                    connection: connection,
                    msg: err
                }
                return reject(error)
            }
            db.execute(
                `
SELECT
    f.fecha as docDate,
    a.fecha_vencimiento as docDueDate,
    CLIENTES.nombre as cardName,
    b.folio numAtCard,
    f.importe_neto as lineTotal,
    f.total_impuestos,
    i.total,
    dirs.rfc_curp,
    case
        when i.nombre = 'IVA TASA 16%' then 'VIVA16'
        when i.nombre = 'TASA CERO' then 'VIVA0'
        when i.nombre = 'IEPS 8%' then 'VIEPS8'
        when i.nombre = 'IEPS 6%' then 'VIEPS6'
    end as taxCode
FROM XSP_CARGOS_CLIENTE(current_date, current_date, 'N', 'N') A
LEFT JOIN DOCTOS_CC B
ON A.DOCTO_CC_ID = B.DOCTO_CC_ID
LEFT JOIN clientes
ON B.cliente_id = clientes.cliente_id
JOIN doctos_ve F
on B.folio = F.folio
left join (
        select
        im.docto_ve_id,
        i.nombre,
        i.impuesto_id,
        sum(im.importe_impuesto_bruto) as total
        from impuestos_doctos_ve_det im
        left join impuestos i
        on i.impuesto_id = im.impuesto_id
        group by i.nombre, i.tipo_impto_id, im.docto_ve_id,  i.impuesto_id

) i
on i.docto_ve_id = f.docto_ve_id
left join dirs_clientes dirs
on clientes.cliente_id = dirs.cliente_id and dirs.es_dir_ppal = 'S'
group by f.fecha,  a.fecha_vencimiento,  CLIENTES.nombre,  b.folio, f.importe_neto,  f.total_impuestos, i.total, dirs.rfc_curp, i.nombre       
                    ` ,
                function (err, customersDB) {
                    console.log('err', err);
                    if (err) {
                        reject(err)
                    }
                    let customers = customersDB.map(customer => {
                        return {
                            docDate: formatDate.formatDateToString(customer[0]),
                            docDueDate: formatDate.formatDateToString(customer[1]),
                            cardname: customer[2],
                            numCard: customer[3] !== null ? customer[3].toString('latin1') : '',
                            lineTotal: customer[4],
                            taxesTotal: customer[5],
                            tax: customer[6],
                            taxcode: customer[8] !== null ? customer[8].toString('latin1') : '',
                            rfc: customer[7] !== null ? customer[7].toString('latin1') : '',
                        }
                    })
                    db.detach();
                    resolve(customers)
                });
        });
    });
}

const getCustomersToSap = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            console.log('db', connection, err);
            if (err) {
                const error = {
                    ok: false,
                    connection: connection,
                    msg: err
                }
                return reject(error)
            }
            db.execute(
                `
select
            c.cliente_id,
            trim(c.nombre) as nombre,
            trim('C') as serie ,
            trim(iif(cond.nombre != 'CONTADO', 'CREDITO', 'CONTADO')) as Grupo,
            COALESCE(pre.nombre, '') as lista_precios,
            iif(cond.nombre != 'CONTADO', trim(substring(cond.nombre from 9 for 12)), 'CONTADO') as cond_pago,
            c.rfc_curp as rfc,
            trim('104-101-000') as cuenta,
            trim(COALESCE(c.clave_regimen_fiscal, '')) as clave_regimen_fiscal,
            c.calle,
            c.colonia,
            c.codigo_postal,
            c.ciudad,
            c.poblacion,
            trim(c.pais),
            c.estado,
            c.num_exterior,
            c.num_interior,
            c.telefono1,
            c.email,
            c.limite_credito
            from (
                    SELECT
                        c.nombre,
                        c.cliente_id,
                        c.cond_pago_id,
                        d.rfc_curp,
                        d.clave_regimen_fiscal,
                        d.calle, d.colonia,
                        d.codigo_postal,
                        ci.nombre as ciudad,
                        d.poblacion,
                        e.nombre as estado,
                        'MEXICO' AS pais,
                        d.num_exterior,
                        d.num_interior,
                        d.telefono1,
                        d.email,
                        c.limite_credito
                    FROM doctos_ve ve
                    left join clientes c
                    on c.cliente_id = ve.cliente_id
                    left join dirs_clientes d
                    on c.cliente_id = d.cliente_id and d.es_dir_ppal = 'S'
                    left join ciudades ci
                    on ci.ciudad_id = d.ciudad_id
                    left join estados e
                    on e.estado_id = d.estado_id
                    where ve.fecha > '01.09.2023'
                    and c.estatus = 'A'
                    group by c.nombre, c.cliente_id, c.cond_pago_id, d.rfc_curp,  d.clave_regimen_fiscal, d.calle, d.colonia, d.codigo_postal, ciudad, d.poblacion, estado, pais, d.num_exterior, d.num_interior, d.telefono1,  d.email, c.limite_credito
                    union
                    SELECT
                        c.nombre,
                        c.cliente_id,
                        c.cond_pago_id,
                        d.rfc_curp,
                        d.clave_regimen_fiscal,
                        d.calle,
                        d.colonia,
                        d.codigo_postal,
                        ci.nombre as ciudad,
                        d.poblacion,
                        e.nombre as estado,
                        'MEXICO' as pais,
                        d.num_exterior,
                        d.num_interior,
                        d.telefono1,
                        d.email,
                        c.limite_credito
                    FROM doctos_pv pv
                    left join clientes c
                    on c.cliente_id = pv.cliente_id
                    left join dirs_clientes d
                    on c.cliente_id = d.cliente_id and d.es_dir_ppal = 'S'
                    left join ciudades ci
                    on ci.ciudad_id = d.ciudad_id
                    left join estados e
                    on e.estado_id = ci.estado_id
                    where pv.fecha > '01.01.2023'
                    and c.estatus = 'A'
                    group by c.nombre, c.cliente_id, c.cond_pago_id, d.rfc_curp, d.clave_regimen_fiscal, d.calle, d.colonia, d.codigo_postal, ciudad, d.poblacion, estado, pais, d.num_exterior, d.num_interior, d.telefono1,  d.email, c.limite_credito
                ) c
            join RFCS_LCO fis
            on c.rfc_curp = fis.rfc
            join condiciones_pago  cond
            on cond.cond_pago_id = c.cond_pago_id
            left join precios_cli_cli p
            on p.cliente_id = c.cliente_id
            left join precios_empresa pre
            on p.precio_empresa_id = pre.precio_empresa_id   

                ` ,
                function (err, customersDB) {
                    console.log('err', err);
                    console.log('DB', customersDB);
                    if (err) {
                        reject(err)
                    }
                    let customers = customersDB.map(customer => {
                        return {
                            name: customer[1],
                            serie: customer[2],
                            group: customer[3],
                            list: customer[4],
                            cond: customer[5] !== null ? obtenerDias(customer[5].toString('latin1')) : '',
                            rfc: customer[6].toString('latin1'),
                            account: customer[7],
                            cfdi: 'G03',
                            fiscal: customer[8],
                            street: customer[9] !== null ? customer[9].toString('latin1').split("\n").join(" ").split("\r").join("") : '',
                            block: customer[10] !== null ? customer[10].toString('latin1') : '',
                            zipCode: customer[11] !== null ? customer[11].toString('latin1') : '',
                            city: customer[12] !== null ? customer[12].toString('latin1') : '',
                            county: customer[13] !== null ? customer[13].toString('latin1') : '',
                            country: customer[14] !== null ? customer[14].toString('latin1') : '',
                            state: customer[15] !== null ? customer[15].toString('latin1') : '',
                            buildingFloorRoom: customer[16] !== null ? customer[16].toString('latin1') : '',
                            streetNo: customer[17] !== null ? customer[17].toString('latin1') : '',
                            phone: customer[18] !== null ? customer[18].toString('latin1') : '',
                            connection: connection,
                            email : customer[19] !== null ? customer[19].toString('latin1') : '',
                            limite_credito : customer[20] ,
                        }
                    })

                    db.detach();
                    resolve(customers.sort((a, b) => a.name - b.name))
                });
        });
    });
}

const getProvidersToSap = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            console.log('db', connection, err);
            if (err) {
                const error = {
                    ok: false,
                    connection: connection,
                    msg: err
                }
                return reject(error)
            }
            db.execute(
                `
                    select distinct
                        '' as cardCode,
                        p.nombre as cardName,
                        trim('P') as serie,
                        '' as cardType,
                        trim('Compras') as GroupCode,
                        p.telefono1 as phone1,
                        p.telefono2 as phone2,
                        p.fax,
                        cast(p.email as varchar(100)) as email,
                        cast(cond.nombre as varchar(50))  as payTerms,
                        cast(p.rfc_curp as varchar(50)) as FederalTax,
                        trim('201-101-000 - PROVEEDORES NACIONALES') as creditorAccount,
                        trim('Lista de precios compra') as listname,
                        '' as wTCode,
                        '' as VatGroupLatinAmerica,
                        '' as properties1,
                        '' as properties2,
                        '' as properties3,
                        '' as properties4,
                        '' as properties5,
                        '' as properties6,
                        '' as properties7,
                        '' as properties8,
                        '' as properties9,
                        '' as properties10,
                        '' as properties11,
                        '' as properties12,
                        '' as properties13,
                        '' as properties14,
                        '' as properties15,
                        '' as properties16,
                        '' as properties17,
                        '' as properties18,
                        '' as properties19,
                        '' as regimen,
                        trim('Otros' ) as providerType,
                        trim('Nacional' ) as Nationality,
                        trim('Transferencia') as payment,
                        trim('G01') as cfdi_a_doctos_proc_cancel, 
                        p.limite_credito
                    from DOCTOS_CM cm
                    join proveedores p
                    on p.PROVEEDOR_ID = cm.proveedor_id
                    left join condiciones_pago_cp cond
                    on cond.cond_pago_id = p.cond_pago_id
                    WHERE cm.fecha > '01.01.2023'         
                    ` ,
                function (err, providersDB) {
                    if (err) {
                        reject(err)
                    }
                    console.log(connection, providersDB);
                    const providers = providersDB.map(provider => {
                        return {
                            cardCode: provider[0],
                            cardName: provider[1],
                            serie: provider[2],
                            cardType: provider[3],
                            groupCode: provider[4],
                            phone1: provider[5] !== null ? provider[5].toString('latin1') : '',
                            phone2: provider[6] !== null ? provider[6].toString('latin1') : '',
                            fax: provider[7] !== null ? provider[7].toString('latin1') : '',
                            email: provider[8] !== null ? provider[8].toString('latin1') : '',
                            payterms: provider[9] !== null ? provider[9].toString('latin1') : '',
                            federalTax: provider[10] !== null ? provider[10].toString('latin1') : '',
                            creditorAccount: provider[11] !== null ? provider[11].toString('latin1') : '',
                            listname: provider[12] !== null ? provider[12].toString('latin1') : '',
                            wTCode: provider[13] !== null ? provider[13].toString('latin1') : '',
                            vatGroupLatinAmerica: provider[14] !== null ? provider[14].toString('latin1') : '',
                            properties1: provider[15] !== null ? provider[15].toString('latin1') : '',
                            properties2: provider[16] !== null ? provider[16].toString('latin1') : '',
                            properties3: provider[17] !== null ? provider[17].toString('latin1') : '',
                            properties4: provider[18] !== null ? provider[18].toString('latin1') : '',
                            properties5: provider[19] !== null ? provider[19].toString('latin1') : '',
                            properties6: provider[20] !== null ? provider[20].toString('latin1') : '',
                            properties7: provider[21] !== null ? provider[21].toString('latin1') : '',
                            properties8: provider[22] !== null ? provider[22].toString('latin1') : '',
                            properties9: provider[23] !== null ? provider[23].toString('latin1') : '',
                            properties10: provider[24] !== null ? provider[24].toString('latin1') : '',
                            properties11: provider[25] !== null ? provider[25].toString('latin1') : '',
                            properties12: provider[26] !== null ? provider[26].toString('latin1') : '',
                            properties13: provider[27] !== null ? provider[27].toString('latin1') : '',
                            properties14: provider[28] !== null ? provider[28].toString('latin1') : '',
                            properties15: provider[29] !== null ? provider[29].toString('latin1') : '',
                            properties16: provider[30] !== null ? provider[30].toString('latin1') : '',
                            properties17: provider[31] !== null ? provider[31].toString('latin1') : '',
                            properties18: provider[32] !== null ? provider[32].toString('latin1') : '',
                            properties19: provider[33] !== null ? provider[33].toString('latin1') : '',
                            regimen: provider[34] !== null ? provider[34].toString('latin1') : '',
                            providerType: provider[35],
                            nationality: provider[36],
                            payment: provider[37],
                            cfdi: provider[38],
                            limit: provider[39],
                            db: connection,
                        }
                    });
                    db.detach();
                    resolve(providers)
                });
        });
    });
}

// fUNCION PARA OBTENER CARGO DELOS PROVEEDORES
const getProvidersChargesCxp = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            //console.log('db', connection,err);
            if (err) {
                const error = {
                    ok: false,
                    connection: connection,
                    msg: err
                }
                return reject(error)
            }
            db.query(
                `
                    SELECT A.*,  B.FOLIO, B.FECHA, B.PROVEEDOR_ID, B.DESCRIPCION, C.NOMBRE_ABREV, cm.fecha as fecha_compra, '' as fecha_recepcion,cm.folio as folio_cm , clp.clave_prov, p.nombre as nombre_provedor, p.rfc_curp,  ALM.nombre as almacen, ccp.NOMBRE AS cond_pago, cm.importe_neto, tp.nombre
                    FROM XSP_CARGOS_PROVEEDORES(current_date , current_date, 'N') A
                    LEFT JOIN DOCTOS_CP B
                    ON A.DOCTO_CP_ID = B.DOCTO_CP_ID
                    LEFT JOIN CONCEPTOS_CP C
                    ON B.CONCEPTO_CP_ID = C.CONCEPTO_CP_ID
                    LEFT JOIN DOCTOS_CM CM
                    ON b.proveedor_id = cm.proveedor_id and b.folio =   cm.folio_prov  and cm.tipo_docto = 'C' and cm.estatus = 'N'
                    LEFT join ALMACENES ALM
                    ON ALM.almacen_id = CM.almacen_id
                    left join proveedores p
                    on p.proveedor_id = cm.proveedor_id
                    left join (
                         SELECT P.proveedor_id, coalesce(CP1.clave_prov, CP2.clave_prov) AS clave_prov FROM PROVEEDORES P
                            LEFT JOIN claves_proveedores CP1 ON P.proveedor_id = CP1.proveedor_id AND CP1.rol_clave_prov_id = 49
                            LEFT JOIN claves_proveedores CP2 ON P.proveedor_id = CP2.proveedor_id AND CP2.rol_clave_prov_id = 50
                    ) clp on p.proveedor_id = clp.proveedor_id
                    left join condiciones_pago_cp ccp
                    on ccp.cond_pago_id = cm.cond_pago_id
                    left join tipos_prov tp
                    on tp.tipo_prov_id = p.tipo_prov_id
                    ORDER BY FECHA
                    ` ,
                function (err, chargesDB) {
                    if (err) {
                        reject(err)
                    }
                    //console.log(chargesDB[0]);
                    let charges = chargesDB.map(charge => {
                        return {
                            docDueDate: charge.FECHA_VENCIMIENTO !== null ? charge.FECHA_VENCIMIENTO : '',
                            atraso: charge.ATRASO !== null ? charge.ATRASO : '',
                            importe_cargo: charge.IMPORTE_CARGO !== null ? charge.IMPORTE_CARGO : '',
                            saldo_cargo: charge.SALDO_CARGO !== null ? charge.SALDO_CARGO : '',
                            numAtCard: charge.FOLIO !== null ? charge.FOLIO.toString('latin1') : '',
                            docDate: charge.FECHA_COMPRA !== null ? charge.FECHA_COMPRA : '',
                            // proveedor_id : charge[8] !== null ? charge[8] : '',
                            fecha_compra: charge.FECHA_COMPRA !== null ? charge.FECHA_COMPRA : '',
                            fecha_recepcion: charge.FECHA_RECEPCION !== null ? charge.FECHA_RECEPCION.toString('latin1') : '',
                            folio_cm: charge.FOLIO_CM !== null ? charge.FOLIO_CM.toString('latin1') : '',
                            clave_prov: charge.CLAVE_PROV !== null ? charge.CLAVE_PROV.toString('latin1') : '',
                            cardName: charge.NOMBRE_PROVEDOR !== null ? charge.NOMBRE_PROVEDOR.toString('latin1') : '',
                            rfc: charge.RFC_CURP !== null ? charge.RFC_CURP.toString('latin1') : '',
                            almacen: charge.ALMACEN !== null ? charge.ALMACEN.toString('latin1') : '',
                            cond_pago: charge.COND_PAGO !== null ? charge.COND_PAGO.toString('latin1') : '',
                            importe_neto: charge.IMPORTE_NETO !== null ? charge.IMPORTE_NETO : '',
                            // tipo_provedor : charge[20] !== null ? charge[20].toString('latin1') : '',
                        }
                    })

                    //console.log('cargos',charges[0]);

                    let data = {
                        charges,
                        connection
                    }
                    console.log("[CUENTAS POR PAGAR] EJECUTADO CORRECTAMENTE EN " + connection);
                    db.detach();
                    resolve(data)
                });
        });
    });
}
// fUNCION PARA OBTENER CARGO DELOS PROVEEDORES
const getProvidersChargesCxpSap = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            //console.log('db', connection,err);
            if (err) {
                const error = {
                    ok: false,
                    connection: connection,
                    msg: err
                }
                return reject(error)
            }
            db.query(
                `
                        SELECT
                            cp.docto_cp_id,
                            dcp.fecha,
                            cp.fecha_vencimiento,
                            cm.folio_prov,
                            p.nombre,
                            cm.folio,
                            case
                            WHEN i.nombre = 'TASA CERO' THEN 0
                            WHEN i.nombre <> 'TASA CERO' THEN  sum(im.compra_neta)
                            end  as total,
                            i.nombre as impuesto
                        FROM CARGOS_PROVEEDORES_JGB('13-SEP-2024', '13-SEP-2024', NULL)  cp
                        inner join doctos_cp dcp
                        on cp.docto_cp_id = dcp.docto_cp_id
                        inner join proveedores p
                        on p.proveedor_id = dcp.proveedor_id
                        inner join doctos_cm cm
                        on cm.folio_prov = dcp.folio and cm.proveedor_id = dcp.proveedor_id and cm.tipo_docto = 'C' AND cm.estatus = 'N'
                        inner join impuestos_doctos_cm_det im
                        on im.docto_cm_id = cm.docto_cm_id
                        left join impuestos i
                        on i.impuesto_id = im.impuesto_id
                        group by cp.docto_cp_id, cm.folio, dcp.fecha,  p.nombre, i.nombre, cp.fecha_vencimiento, cm.folio_prov
                    ` ,
                function (err, chargesDB) {
                    if (err) {
                        reject(err)
                    }
                    //console.log(chargesDB[0]);
                    let charges = chargesDB.map(charge => {
                        return {
                            docDate: charge.FECHA !== null ? charge.FECHA : '',
                            docDueDate: charge.FECHA_VENCIMIENTO !== null ? charge.FECHA_VENCIMIENTO : '',
                            cardCode: charge.FOLIO_PROV !== null ? charge.FOLIO_PROV.toString('latin1') : '',
                            cardName: charge.NOMBRE !== null ? charge.NOMBRE.toString('latin1') : '',
                            numAtCard: charge.FOLIO !== null ? charge.FOLIO.toString('latin1') : '',
                            lineTotal: charge.TOTAL,
                            taxcode: charge.IMPUESTO !== null ? charge.IMPUESTO.toString('latin1') : '',
                        }
                    })

                    //console.log('cargos',charges[0]);

                    let data = {
                        charges,
                        connection
                    }
                    console.log("[CUENTAS POR PAGAR] EJECUTADO CORRECTAMENTE EN " + connection);
                    db.detach();
                    resolve(data)
                });
        });
    });
}

const getProvidersChargesCxpHis = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            //console.log('db', connection,err);
            if (err) {
                const error = {
                    ok: false,
                    connection: connection,
                    msg: err
                }
                return reject(error)
            }
            db.query(
                `
                    SELECT
                        ALM.NOMBRE AS ALMACEN,
                        P.RFC_CURP AS RFC,
                        REPLACE(LEFT(B.FOLIO, 3), 0,'') AS SERIE,
                        B.FOLIO,
                        REPLACE(LEFT(B.FOLIO, 3), 0,'') || CAST(RIGHT(B.FOLIO, 6) AS INT) AS FOLIO_MS,
                        CLP.CLAVE_PROV,
                        P.NOMBRE AS PROVEEDOR,
                        CCP.NOMBRE AS COND_PAGO,
                        CM.FECHA AS FECHA_COMPRA,
                        A.FECHA_VENCIMIENTO,
                        COALESCE(IM_0.IMPUESTO, 0) AS TASA_CERO,
                        COALESCE(IM_16.IMPUESTO, 0) AS IVA_16,
                        COALESCE(IE_6.IMPUESTO, 0) AS IEPS_6,
                        COALESCE(IE_8.IMPUESTO, 0) AS IEPS_8,
                        COALESCE(IE_30.IMPUESTO, 0) AS IEPS_30,
                        CM.IMPORTE_NETO,
                        A.IMPORTE_CARGO AS IMPORTE,
                        A.SALDO_CARGO AS SALDO,
                        A.ATRASO
                    FROM XSP_CARGOS_PROVEEDORES(current_date , current_date, 'N') A
                    LEFT JOIN DOCTOS_CP B ON A.DOCTO_CP_ID = B.DOCTO_CP_ID
                    LEFT JOIN CONCEPTOS_CP C ON B.CONCEPTO_CP_ID = C.CONCEPTO_CP_ID
                    LEFT JOIN DOCTOS_CM CM ON B.proveedor_id = CM.proveedor_id AND B.folio = CM.folio_prov AND CM.tipo_docto = 'C' AND CM.estatus = 'N'
                    LEFT JOIN ALMACENES ALM ON CM.almacen_id = ALM.almacen_id
                    LEFT JOIN proveedores P on CM.proveedor_id = P.proveedor_id
                    LEFT JOIN (
                        SELECT P.proveedor_id, coalesce(CP1.clave_prov, CP2.clave_prov) AS clave_prov FROM PROVEEDORES P
                            LEFT JOIN claves_proveedores CP1 ON P.proveedor_id = CP1.proveedor_id AND CP1.rol_clave_prov_id = 49
                            LEFT JOIN claves_proveedores CP2 ON P.proveedor_id = CP2.proveedor_id AND CP2.rol_clave_prov_id = 50
                    ) CLP on P.proveedor_id = CLP.proveedor_id
                    LEFT JOIN condiciones_pago_cp CCP on CM.cond_pago_id = CCP.cond_pago_id
                    LEFT JOIN tipos_prov TP on TP.tipo_prov_id = P.tipo_prov_id
                    INNER JOIN IMPORTES_DOCTOS_CP ICP ON B.docto_cp_id = ICP.docto_cp_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_CP_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_CP_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'TASA CERO'
                    ) IM_0 ON ICP.impte_docto_CP_id = IM_0.impte_docto_CP_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_CP_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_CP_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IVA TASA 16%'
                    ) IM_16 ON ICP.impte_docto_CP_id = IM_16.impte_docto_CP_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_CP_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_CP_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IEPS 6%'
                    ) IE_6 ON ICP.impte_docto_CP_id = IE_6.impte_docto_CP_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_CP_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_CP_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IEPS 8%'
                    ) IE_8 ON ICP.impte_docto_CP_id = IE_8.impte_docto_CP_id
                    LEFT JOIN (
                        SELECT IM.impte_docto_CP_id, I.nombre, IM.pctje_impuesto, IM.impuesto FROM importes_doctos_CP_imptos IM
                        LEFT JOIN IMPUESTOS I ON IM.impuesto_id = I.impuesto_id
                        WHERE I.NOMBRE = 'IESP 30%'
                    ) IE_30 ON ICP.impte_docto_CP_id = IE_30.impte_docto_CP_id
                    ORDER BY CM.FECHA
                    ` ,
                function (err, chargesDB) {
                    if (err) {
                        reject(err)
                    }
                    //console.log(chargesDB[0]);
                    let charges = chargesDB.map(charge => {
                        return {
                            Almacen: charge.ALMACEN !== null ? charge.ALMACEN.toString('latin1') : '',
                            Rfc: charge.RFC !== null ? charge.RFC.toString('latin1') : '',
                            Serie: charge.SERIE !== null ? charge.SERIE.toString('latin1') : '',
                            Folio: charge.FOLIO !== null ? charge.FOLIO.toString('latin1') : '',
                            Folio_ms: charge.FOLIO_MS !== null ? charge.FOLIO_MS.toString('latin1') : '',
                            Clave_prov: charge.CLAVE_PROV !== null ? charge.CLAVE_PROV.toString('latin1') : '',
                            Proveedor: charge.PROVEEDOR !== null ? charge.PROVEEDOR.toString('latin1') : '',
                            Cond_pago: charge.COND_PAGO !== null ? charge.COND_PAGO.toString('latin1') : '',
                            Fecha_compra: charge.FECHA_COMPRA !== null ? charge.FECHA_COMPRA : '',
                            Fecha_vencimiento: charge.FECHA_VENCIMIENTO !== null ? charge.FECHA_VENCIMIENTO : '',
                            Tasa_cero: charge.TASA_CERO,
                            Iva_16: charge.IVA_16,
                            Ieps_6: charge.IEPS_6,
                            Ieps_8: charge.IEPS_8,
                            Ieps_30: charge.IEPS_30,
                            Importe_neto: charge.IMPORTE_NETO !== null ? charge.IMPORTE_NETO : '',
                            Importe: charge.IMPORTE !== null ? charge.IMPORTE : '',
                            Saldo: charge.SALDO !== null ? charge.SALDO : '',
                            Atraso: charge.ATRASO !== null ? charge.ATRASO : '',
                            
                            //numAtCard: charge.FOLIO !== null ? charge.FOLIO.toString('latin1') : '',
                            //docDate: charge.FECHA_COMPRA !== null ? charge.FECHA_COMPRA : '',
                            // proveedor_id : charge[8] !== null ? charge[8] : '',
                            //fecha_recepcion: charge.FECHA_RECEPCION !== null ? charge.FECHA_RECEPCION.toString('latin1') : '',
                            // tipo_provedor : charge[20] !== null ? charge[20].toString('latin1') : '',
                        }
                    })

                    //console.log('cargos',charges[0]);

                    let data = {
                        charges,
                        connection
                    }
                    console.log("[CUENTAS POR PAGAR] EJECUTADO CORRECTAMENTE EN " + connection);
                    db.detach();
                    resolve(data)
                });
        });
    });
}

const obtenerPagos = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            if (err) {                
                return reject(err)
            }
            db.query(
                `
                    SELECT
                        cc.folio as folio_cxc,
                        f.folio as folio_f,
                        clientes.nombre as cliente,
                        cc.fecha,
                        f.importe,
                        cp.nombre as cond_pago
                    FROM Doctos_cc cc
                    left join conceptos_cc c
                    on c.concepto_cc_id = cc.concepto_cc_id
                    left join clientes
                    on clientes.cliente_id = cc.cliente_id
                    left join CARGOS_ACREDITADOS_CC(cc.docto_cc_id) f
                    on f.docto_cc_id = cc.docto_cc_id
                    inner join
                        (
                        Select ve.folio, ve.cond_pago_id from doctos_ve  ve
                            where ve.fecha >= '01.01.2024'
                        )  ve
                    on ve.folio = f.folio
                    left join condiciones_pago cp
                    on cp.cond_pago_id = ve.cond_pago_id
                    where cc.fecha >= '01.01.2024'
                    and c.nombre in ('Pagos', 'Abonos')
                    and cc.estatus = 'N'
                    and cc.cancelado <> 'S'
                    ` ,
                function (err, pagosDB) {
                    if (err) {
                        console.log(err);
                        
                        reject(err)
                    }
                    let pagos = pagosDB.map(charge => {
                        return {
                            sucursal: connection,
                            folio_cxc: charge.FOLIO_CXC !== null ? charge.FOLIO_CXC.toString('latin1') : '',
                            folio_f: charge.FOLIO_F !== null ? charge.FOLIO_F.toString('latin1') : '',
                            cliente: charge.CLIENTE !== null ? charge.SALDO_CARGO : '',
                            fecha: charge.FECHA !== null ? formatDate.formatDateToString(charge.FECHA) : '',
                            importe: charge.IMPORTE !== null ? charge.IMPORTE : '',
                            cond_pago: charge.COND_PAGO !== null ? charge.COND_PAGO.toString('latin1') : '',
                        }
                    });
                    db.detach();
                    resolve(pagos)
                });
        });
    });
}

// Obtener la factura de Pv y Ve con estatus normal
const obtenerDoctosVe = (connection) => {
 
    return new Promise((resolve, reject) => {      
            firebird.attach(conections[connection], async function (err, db) {              

                if (err) {                                      
                    return reject(err);
                }
                db.query(
                    `
                        SELECT
                                A.DOCTO_PV_ID AS DOCTO_ID,
                                A.CLAVE_CLIENTE,
                                D.NOMBRE AS NOMBRE_CLIENTE,
                                A.FECHA,
                                trim(replace(substring(a.folio from 1 for 3), '0', ''))  || cast(cast(substring(a.folio from 4 for 9) as int) as varchar(50)) as FACTURA,
                                (A.IMPORTE_NETO + A.TOTAL_IMPUESTOS) AS CONTADO,                                
                                x.descuento,
                                A.dscto_importe as desGlobal,
                                x.base  as subtotal,
                                0 AS CREDITO,
                                'PV' AS MODULO,
                                coalesce(i0.venta_neta,0) +  coalesce(ie8.importe_impuesto,0) AS Vtas_0,
                                coalesce(i16.venta_neta,0) AS Vtas_16,
                                coalesce(IE8.venta_neta,0) as Vtas_8, coalesce(ie6.venta_neta,0) as Vtas_6, coalesce(ie30.venta_neta,0) as Vtas_30,
                                coalesce(i0.importe_impuesto,0) as Tasa_0,coalesce(i16.importe_impuesto,0) as Tasa_16,
                                coalesce(ie8.importe_impuesto,0) as Ieps_8, coalesce(ie6.importe_impuesto,0) as Ieps_6,
                                coalesce(ie30.importe_impuesto,0) as Ieps_30,
                                trim(replace(substring(a.folio from 1 for 3), '0', ''))  as serie,
                                A.estatus,
                                A.cfdi_certificado,
                                coalesce(A.fecha_hora_cancelacion,'01.01.1900') AS Fecha_Cancelacion,
                                D.sujeto_ieps
                        FROM DOCTOS_PV A
                        INNER JOIN CLIENTES D ON (A.CLIENTE_ID=D.CLIENTE_ID)
                        LEFT JOIN (
                                select ipd.docto_pv_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_PV  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre in('IVA 16%','IVA TASA 15','IVA TASA 16%')
                                group by ipd.docto_pv_id
                                ) i16 ON A.docto_pv_id=i16.docto_pv_id /* IVA 16% DE DOCUMENTOS */
                        LEFT JOIN (
                                select ipd.docto_pv_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_PV  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre in('IEPS 8%')
                                group by ipd.docto_pv_id
                                ) ie8 ON A.docto_pv_id=ie8.docto_pv_id /* IEPS 8% DE DOCUMENTOS */
                        LEFT JOIN (
                                select ipd.docto_pv_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_PV  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre IN ('IVA 0%','TASA CERO')
                                group by ipd.docto_pv_id
                                ) i0 ON A.docto_pv_id=i0.docto_pv_id /* IVA 0% DE DOCUMENTOS */
                        LEFT JOIN (
                                select ipd.docto_pv_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_PV  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre IN ('IESP 30%')
                                group by ipd.docto_pv_id
                                ) ie30 ON A.docto_pv_id=ie30.docto_pv_id   /* IESP 30% DE DOCUMENTOS */
                        LEFT JOIN  (
                                select ipd.docto_pv_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_PV  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre IN ('IEPS 6%')
                                group by ipd.docto_pv_id
                                ) ie6 ON A.docto_pv_id=ie6.docto_pv_id    /* IEPS 6% DE DOCUMENTOS */
                        LEFT JOIN (
                                select  pvd.docto_pv_id, SUM(pvd.precio_total_neto) as base, SUM(pvd.dscto_art) as descuento
                                FROM doctos_pv_det pvd
                                WHERE pvd.docto_pv_id = pvd.docto_pv_id
                                GROUP BY pvd.docto_pv_id
                            ) AS x on  a.docto_pv_id = x.docto_pv_id
                        WHERE A.TIPO_DOCTO='F' AND A.ESTATUS in('N','D','C')  AND A.FECHA  >= '01.01.2024'
                        UNION ALL
                        SELECT A.DOCTO_VE_ID AS DOCTO_ID,
                        A.CLAVE_CLIENTE,
                        D.NOMBRE AS NOMBRE_CLIENTE,
                        A.FECHA,
                        trim(replace(substring(a.folio from 1 for 3), '0', ''))  || cast(cast(substring(a.folio from 4 for 9) as int) as varchar(50)) as FACTURA,
                        CASE WHEN ((A.IMPORTE_NETO + A.FLETES + A.OTROS_CARGOS + A.TOTAL_IMPUESTOS) - (A.TOTAL_RETENCIONES)) = A.IMPORTE_COBRO THEN ((A.IMPORTE_NETO + A.FLETES + A.OTROS_CARGOS + A.TOTAL_IMPUESTOS) - (A.TOTAL_RETENCIONES)) ELSE 0 END AS CONTADO,
                        x.descuento, A.dscto_importe as desGlobal, x.base  as subtotal ,
                        CASE WHEN ((A.IMPORTE_NETO + A.FLETES + A.OTROS_CARGOS + A.TOTAL_IMPUESTOS) - (A.TOTAL_RETENCIONES)) <> A.IMPORTE_COBRO THEN ((A.IMPORTE_NETO + A.FLETES + A.OTROS_CARGOS + A.TOTAL_IMPUESTOS) - (A.TOTAL_RETENCIONES)) ELSE 0 END AS CREDITO,
                        'VE' AS MODULO, 
                        coalesce(i0.venta_neta,0) + coalesce(ie8.importe_impuesto,0) AS Vtas_0, coalesce(i16.venta_neta,0) AS Vtas_16 ,
                        coalesce(IE8.venta_neta,0) as Vtas_8, coalesce(ie6.venta_neta,0) as Vtas_6, coalesce(ie30.venta_neta,0) as Vtas_30,coalesce(i0.importe_impuesto,0) as Tasa_0,
                        coalesce(i16.importe_impuesto,0) as Tasa_16,coalesce(ie8.importe_impuesto,0) as Ieps_8,
                        coalesce(ie6.importe_impuesto,0) as Ieps_6, coalesce(ie30.importe_impuesto,0) as Ieps_30,
                        trim(replace(substring(a.folio from 1 for 3), '0', ''))  as serie,
                        A.estatus,
                        A.cfdi_certificado,
                        coalesce(A.fecha_hora_cancelacion,'01.01.1900') AS Fecha_Cancelacion,
                        D.sujeto_ieps
                        FROM DOCTOS_VE A
                        LEFT JOIN (
                                select  ipd.docto_ve_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_VE  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre in('IVA 16%','IVA TASA 15','IVA TASA 16%')
                                group by ipd.docto_ve_id
                                ) i16 ON A.docto_ve_id=i16.docto_ve_id /* IVA 16% DE DOCUMENTOS */
                        LEFT JOIN (
                                select  ipd.docto_ve_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_VE  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre in('IEPS 8%')
                                group by ipd.docto_ve_id
                                ) ie8 ON A.docto_ve_id=ie8.docto_ve_id  /* IEPS 8% DE DOCUMENTOS */
                        left join (
                                select  ipd.docto_ve_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_VE  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre in('IVA 0%','TASA CERO')
                                group by ipd.docto_ve_id
                                ) i0 ON A.docto_ve_id=i0.docto_ve_id   /* IVA 0% DE DOCUMENTOS */
                        left join (
                                select  ipd.docto_ve_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_VE  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre in('IESP 30%')
                                group by ipd.docto_ve_id
                                )  ie30 ON A.docto_ve_id=ie30.docto_ve_id  /* IESP 30% DE DOCUMENTOS */
                        left join (
                                select  ipd.docto_ve_id,sum(ipd.venta_neta) venta_neta,sum(ipd.importe_impuesto) importe_impuesto
                                from  impuestos_doctos_VE  ipd  inner join  impuestos i
                                ON ipd.impuesto_id=i.impuesto_id and i.nombre in('IEPS 6%')
                                group by ipd.docto_ve_id
                                )  ie6 ON A.docto_ve_id=ie6.docto_ve_id  /* IEPS 6% DE DOCUMENTOS */
                        LEFT JOIN
                            (
                            select  ved.docto_ve_id, SUM(ved.PRECIO_TOTAL_NETO) as base, SUM(ved.dscto_art) as descuento
                                FROM doctos_ve_det ved
                                WHERE ved.docto_ve_id = ved.docto_ve_id
                                GROUP BY ved.docto_ve_id
                            ) AS x
                        on  a.docto_ve_id = x.docto_ve_id
                        INNER JOIN CLIENTES D ON (A.CLIENTE_ID=D.CLIENTE_ID)
                        WHERE A.TIPO_DOCTO='F' AND A.ESTATUS in('N','D','C') AND A.FECHA  >= '01.01.2024'

                    ` ,
                    function (err, doctosVeDB) {
                        if (err) {
                            return reject(err)
                        }                    
                       //console.log(doctosVeDB);
                       
                        let doctosVe = doctosVeDB.map(docto => {
                            return {
                                doctoId : docto.DOCTO_ID,
                                clave_cliente : docto.CLAVE_CLIENTE,
                                nombre_cliente : docto.NOMBRE_CLIENTE,
                                fecha : formatDate.formatDateToString(docto.FECHA),
                                factura : docto.FACTURA !== null ? docto.FACTURA.toString('latin1') : '',
                                contado : docto.CONTADO,
                                base : docto.BASE,
                                descuento : docto.DESCUENTO,
                                desglobal : docto.DESGLOBAL,
                                subtotal : docto.SUBTOTAL,
                                modulo : docto.MODULO,
                                vtas_0 : docto.VTAS_0,
                                vtas_16 : docto.VTAS_16,
                                vtas_8 : docto.VTAS_8,
                                vtas_6 : docto.VTAS_6,
                                vtas_30 : docto.VTAS_30,
                                tasa_0 : docto.TASA_0,
                                tasa_16 : docto.TASA_16,
                                ieps_8 : docto.IEPS_8,
                                ieps_6 : docto.IEPS_6,
                                ieps_30 : docto.IEPS_39,
                                serie : docto.SERIE !== null ? docto.SERIE.toString('latin1') : '',
                                estatus : docto.ESTATUS !== null ? docto.ESTATUS.toString('latin1') : '',
                                cfdi_certificado : docto.CFDI_CERTIFICADO !== null ? docto.CFDI_CERTIFICADO.toString('latin1') : '',
                                fecha_cancelacion : formatDate.formatDateToString(docto.FECHA_CANCELACION),
                                sujeto_ieps: docto.SUJETO_IEPS !== null ? docto.SUJETO_IEPS.toString('latin1') : '',
                                sucursal : obtenerSucursalPorFolio(docto.SERIE)
                            }
                        })
                        db.detach();
                        resolve(doctosVe)
                    });
            });       
    });
}

const obtenerDoctosPagos = (connection, fecha, fechaFin) => {
    
    return new Promise((resolve, reject) => {

        firebird.attach(conections[connection], function (err, db) {
            if (err) {
               return reject(err)
            }
            db.query(
                `
                    SELECT FIRST 10 * FROM obtener_pagos('${fecha}', '${fechaFin}')
                ` ,
                function (err, pagosDB) {     
                    if (err) {
                        return reject(err)
                    }
                    if (pagosDB !== undefined) {
                        let pagos = pagosDB.map(charge => {
                            const factor = charge.IMPORTE / (charge.IMPORTE_NETO + charge.TASA_CERO + charge.IVA_16 + charge.IEPS_8 + charge.IEPS_6 + charge.IEPS_30);

                            return {
                                bd: connection,
                                folio: charge.FOLIO !== null ? charge.FOLIO.toString('latin1') : '',
                                folio_f: charge.FOLIO_F !== null ? charge.FOLIO_F.toString('latin1') : '',
                                nombre: charge.NOMBRE !== null ? charge.NOMBRE.toString('latin1') : '',
                                fecha: charge.FECHA_C  ,
                                importe_cargo: charge.IMPORTE ,
                                tasa_cero: charge.TASA_CERO ,
                                base_tasa_cero: charge.BASE_TASA_CERO ,
                                iva_16: dosDecimales(charge.IVA_16 * factor),
                                base_iva_16: dosDecimales(charge.BASE_IVA_16 * factor),
                                ieps_8: dosDecimales(charge.IEPS_8 * factor),
                                base_ieps_8: dosDecimales(charge.BASE_IEPS_8 * factor),
                                ieps_6: dosDecimales(charge.IEPS_6 * factor),
                                base_ieps_6: dosDecimales(charge.BASE_IEPS_6 * factor),
                                ieps_30: dosDecimales(charge.IEPS_30 * factor),
                                base_ieps_30: dosDecimales(charge.BASE_IEPS_30 * factor),
                                importe_neto: dosDecimales(charge.IMPORTE_NETO),
                                cfdi_certificado: charge.CFDI_CERTIFICADO !== null ? charge.CFDI_CERTIFICADO.toString('latin1') : '',
                                forma_cobro: charge.FORMA_COBRO !== null ? charge.FORMA_COBRO.toString('latin1') : '',
                                rfc: charge.RFC !== null ? charge.RFC.toString('latin1') : '',
                                uuid: charge.UUID !== null ? charge.UUID.toString('latin1') : '',
                                razon_social: charge.RAZON_SOCIAL !== null ? charge.RAZON_SOCIAL.toString('latin1') : '',
                                seleccionado : false,
                                cargado : false

                            }
                        });
                        db.detach();
                        resolve(pagos);
                    } else {
                        let pagos = [{
                            bd: conection,
                            folio: '',
                            nombre: '',
                            importe: '',
                            fecha: '',
                            cfdi_certificado: '',
                            forma_cobro: ''
                        }]
                        db.detach();
                        reject(pagos);
                    }



                });
        });

    });
}

// Obtener la factura de Pv y Ve con estatus normal
const obtenerDoctosVeDet = (connection) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            if (err) {                
                return reject(err)
            }
            db.query(
                `
                    SELECT
                    A.FECHA,
                    D.NOMBRE AS NOMBRE_CLIENTE,
                    trim(replace(substring(a.folio from 1 for 3), '0', ''))  || cast(cast(substring(a.folio from 4 for 9) as int) as varchar(50)) as FACTURA,
                    'PV' AS MODULO,
                    trim(replace(substring(a.folio from 1 for 3), '0', ''))  as serie,
                    A.estatus,
                    A.cfdi_certificado,
                    x.clave_articulo,
                    x.unidades,
                    x.base as subtotal
                    FROM DOCTOS_PV A
                    INNER JOIN CLIENTES D ON (A.CLIENTE_ID=D.CLIENTE_ID)
                    INNER JOIN (
                                SELECT pvd.docto_pv_id,ca.clave_articulo,pvd.unidades,pvd.precio_total_neto as base
                                FROM  doctos_pv_det pvd
                                INNER JOIN claves_articulos ca on pvd.articulo_id=ca.articulo_id and ca.rol_clave_art_id=17
                                ) AS x on  a.docto_pv_id = x.docto_pv_id
                    WHERE A.TIPO_DOCTO='F' AND A.ESTATUS in('N','D')  AND A.FECHA  >= '01.08.2024'   and  A.FECHA < '01.09.2024'
                    UNION ALL
                    SELECT A.FECHA,D.NOMBRE AS NOMBRE_CLIENTE,
                        trim(replace(substring(a.folio from 1 for 3), '0', ''))  || cast(cast(substring(a.folio from 4 for 9) as int) as varchar(50)) as FACTURA,
                        'VE' AS MODULO,
                        trim(replace(substring(a.folio from 1 for 3), '0', ''))  as serie,
                        A.estatus,
                        A.cfdi_certificado,
                        x.clave_articulo,
                        x.unidades,
                        x.base as subtotal
                    FROM DOCTOS_VE A
                    LEFT JOIN (
                            select  ved.docto_ve_id,ca.clave_articulo,ved.unidades,ved.PRECIO_TOTAL_NETO as base
                            FROM doctos_ve_det ved
                            inner join claves_articulos ca on ca.articulo_id=ved.articulo_id and ca.rol_clave_art_id=17
                            ) AS x
                    on  a.docto_ve_id = x.docto_ve_id
                    INNER JOIN CLIENTES D ON (A.CLIENTE_ID=D.CLIENTE_ID)
                    WHERE A.TIPO_DOCTO='F' AND A.ESTATUS in('N','D') AND A.FECHA  >= '01.08.2024' and  A.FECHA < '01.09.2024'
                    ` ,
                function (err, doctosVeDetDB) {
                    if (err) {
                       return reject(err)
                    }

                    let doctosVeDet = doctosVeDetDB.map(docto => {
                        return {
                            fecha: formatDate.formatDateToString(docto.FECHA),
                            nombre_cliente: docto.NOMBRE_CLIENTE,
                            factura: docto.FACTURA !== null ? docto.FACTURA.toString('latin1') : '',
                            modulo: docto.MODULO,
                            serie: docto.SERIE !== null ? docto.SERIE.toString('latin1') : '',
                            estatus: docto.ESTATUS !== null ? docto.ESTATUS.toString('latin1') : '',
                            cfdi_certificado: docto.CFDI_CERTIFICADO !== null ? docto.CFDI_CERTIFICADO.toString('latin1') : '',
                            clave_articulo: docto.CLAVE_ARTICULO !== null ? docto.CLAVE_ARTICULO : '',
                            unidades: docto.UNIDADES !== null ? docto.UNIDADES : 0.00,
                            sucursal: obtenerSucursalPorFolio(docto.SERIE)
                        }
                    })

                    db.detach();
                    resolve(doctosVeDet)
                });
        });
    });
}

const obtenerArticulosReq = (connection, folio) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            if (err) {                
                return reject(err)
            }
            db.query(
                `
                    select 
                        trim(replace(substring(er.folio from 1 for 3), '0', ''))  || cast(cast(substring(er.folio from 4 for 9) as int) as varchar(50)) as folio, 
                        a.nombre AS nombre_articulo, 
                        erd.solicitado, 
                        erd.clave_articulo as claveArticulo
                    from exp_requerimientos er
                    left join  exp_requerimientos_det erd
                    on erd.exp_req_id = er.exp_req_id
                    left join articulos a
                    on a.articulo_id = erd.articulo_id
                    where  trim(replace(substring(er.folio from 1 for 3), '0', ''))  || cast(cast(substring(er.folio from 4 for 9) as int) as varchar(50))
                    = '${folio}'
                ` ,
                function (err, arts ) {
                    if (err) {
                       return reject(err)
                    }

                    let articulos = arts.map(art => {
                        return {
                            folio: art.FOLIO !== null ? art.FOLIO.toString('latin1') : '',
                            nombreArticulo: art.NOMBRE_ARTICULO,
                            solicitado: art.SOLICITADO !== null ? art.SOLICITADO : 0,
                            claveArticulo : art.CLAVEARTICULO !== null ? art.CLAVEARTICULO : 0,

                        }
                    })

                    db.detach();
                    resolve(articulos)
                });
        });
    });
}

const obtenerRequerimiento = (connection, folio) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            if (err) {                
                return reject(err)
            }
            db.query(
                `
                    select
                        trim(replace(substring(er.folio from 1 for 3), '0', ''))  || cast(cast(substring(er.folio from 4 for 9) as int) as varchar(50)) as folio,
                        so.nombre as origen, sd.nombre as destino, er.fecha
                    from exp_requerimientos er
                    left join exp_sync_sucursales so
                    on so.sucursal_id = er.origen
                    left join exp_sync_sucursales sd
                    on sd.sucursal_id = er.destino
                    where  trim(replace(substring(er.folio from 1 for 3), '0', '')) || cast(cast(substring(er.folio from 4 for 9) as int) as varchar(50))
                    = '${folio}'
                ` ,
                function (err, arts ) {
                    if (err) {
                       return reject(err)
                    }
                    let articulos = arts.map(r => {
                        return {
                            folio : r.FOLIO !== null ? r.FOLIO.toString('latin1') : '',
                            origen : r.ORIGEN !== null ? r.ORIGEN.toString('latin1') : '',
                            destino : r.DESTINO !== null ? r.DESTINO.toString('latin1') : '',
                            fecha: r.FECHA 
                        }
                    })
                    db.detach();
                    resolve(articulos[0])
                });
        });
    });
}
const obtenerTraspaso = (connection, folio) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            if (err) {                
                return reject(err)
            }
            db.query(
                `
                    select
                        trim(replace(substring(et.folio from 1 for 3), '0', ''))  || cast(cast(substring(et.folio from 4 for 9) as int) as varchar(50)) as folio,
                        so.nombre as origen, sd.nombre as destino, et.fecha
                    from exp_traspasos et
                    left join exp_sync_sucursales so
                    on so.sucursal_id = et.origen
                    left join exp_sync_sucursales sd
                    on sd.sucursal_id = et.destino
                    where  trim(replace(substring(et.folio from 1 for 3), '0', '')) || cast(cast(substring(et.folio from 4 for 9) as int) as varchar(50))
                    = '${folio}'
                ` ,
                function (err, arts ) {
                    if (err) {
                       return reject(err)
                    }
                    let articulos = arts.map(r => {
                        return {
                            folio : r.FOLIO !== null ? r.FOLIO.toString('latin1') : '',
                            origen : r.ORIGEN !== null ? r.ORIGEN.toString('latin1') : '',
                            destino : r.DESTINO !== null ? r.DESTINO.toString('latin1') : '',
                            fecha: r.FECHA 
                        }
                    })
                    db.detach();
                    resolve(articulos[0])
                });
        });
    });
}


const obtenerArticulosTraspaso = (connection, folio) => {
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection], function (err, db) {
            if (err) {                
                return reject(err)
            }
            db.query(
                `
                select 
                    trim(replace(substring(et.folio from 1 for 3), '0', ''))  || cast(cast(substring(et.folio from 4 for 9) as int) as varchar(50)) as folio,
                    a.nombre AS nombre_articulo, 
                    etd.recibido,
                    etd.clave_articulo AS claveArticulo
                from exp_traspasos et
                left join  exp_traspasos_det etd
                on etd.exp_trasp_id = et.exp_trasp_id
                left join articulos a
                on a.articulo_id = etd.articulo_id
                where  trim(replace(substring(et.folio from 1 for 3), '0', ''))  || cast(cast(substring(et.folio from 4 for 9) as int) as varchar(50))
                    = '${folio}'
                ` ,
                function (err, arts ) {
                    if (err) {
                       return reject(err)
                    }
                    let articulos = arts.map(art => {
                        return {
                            folio: art.FOLIO !== null ? art.FOLIO.toString('latin1') : '',
                            nombreArticulo: art.NOMBRE_ARTICULO,
                            recibido: art.RECIBIDO !== null ? art.RECIBIDO : 0,
                            claveArticulo : art.CLAVEARTICULO !== null ? art.CLAVEARTICULO : 0,
                        }
                    })
                    db.detach();
                    resolve(articulos[0])
                });
        });
    });
}




module.exports = {
    getDataToPolicyTest,
    getDataToPolicyByDay,
    getCustomersBalances,
    getCustomersBalancesToday,
    getCmTotal,
    getLastFolioVe,
    createDoctoVe,
    insertDoctoVeDet,
    updateLastFolioP,
    getArticlesByFolioVe,
    getLastFolioCm,
    insertDoctoCm,
    updateLastFolioCm,
    insertDoctoCmDet,
    getProviders,
    getArticlesToHealer,
    getMarks,
    getStockByArticle,
    getArticleIdByCode,
    getCategoryIdByName,
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
    getSalesCalculateIeps,
    frkOrdenCompra,
    frkOrdenCompraDet,

    // Microsip - SAP
    getCustomersCharges,
    getCustomersToSap,
    getProvidersToSap,
    getProvidersChargesCxp,
    getProvidersChargesCxpSap,
    getProvidersChargesCxpHis,
    getCustomersBalances2,
    getCustomersBalancesHis,

    //Contabilidad
    obtenerPagos,
    obtenerDoctosVe,
    obtenerDoctosPagos,
    obtenerDoctosVeDet,
    // Mvtos
    obtenerArticulosReq,
    obtenerRequerimiento,
    obtenerTraspaso,
    obtenerArticulosTraspaso


}

