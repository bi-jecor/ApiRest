const { get_connection } = require('../database/sqlserver.connections');
const { DATE_TO_SAVE, SLEEP } = require('../middlewares/time');
const ASYNC = require('../middlewares/async');
const PROCEDURES = require('../database/firebird.procedures');
let stockLastUpdate = null;
const mssql = require('mssql');
const firebirdQuerys = require('../helpers/firebirdQuerys');
const { GET_CONNECTION } = require('../database/firebird.connections');


const _get = async (req, res) => {
    try {
        const con = await get_connection();
        const result = await con.query(`EXEC OP.XSPFORECAST ''`);

        res.json({
            ok: true,
            result: result.recordset
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

/*Metodo para consultar el inventario,Folios orden compra y costo de productos de proveedor */
const _get_forecast_by_supplier = async (req, res) => {
    try {
        const provId = req.body.id;
        /*Consulta el costo, inventario, y folios de orden de compra de proveedor */
        let stocks = await PROCEDURES.update_microsip_table(provId);
        
        stocks = stocks.map(stock => {
            return {
                CLAVE_ARTICULO: stock.CLAVE_ARTICULO.toString('latin1'),
                EXISTENCIA: stock.EXISTENCIA,
                COSTO_ULTIMA_COMPRA: stock.COSTO_ULTIMA_COMPRA,
                ARTICULO_ID: stock.ARTICULO_ID,
                UNIDADES: stock.UNIDADES === null ? 0.00 : stock.UNIDADES,
                FOLIOS: stock.FOLIOS === null ? "" : stock.FOLIOS.toString('latin1')
            }
        })  
        const con = await get_connection();
        /*Borra el contenido de la tabla de microsip del proveedor consultado */
        await con.query(`delete em from op.Microsip em inner join cat.Articulo a on em.CLAVE_ARTICULO=a.CLAVE_ARTICULO
                         inner join frk.ProveedorArt pa on a.ARTICULO_ID=pa.ArticuloId where pa.ProveedorId= ${provId}`);

        /*Logica de insercción en bulk */
        const pool = await get_connection();
        const table = new mssql.Table('op.Microsip');
        table.create = true;
        table.columns.add('CLAVE_ARTICULO', mssql.VarChar(64), { nullable: true });
        table.columns.add('EXISTENCIA', mssql.Decimal(16, 4), { nullable: true });
        table.columns.add('PRECIO_ULTIMA_COMPRA', mssql.Decimal(16, 4), { nullable: true });
        table.columns.add('CEDIS_ARTICULO_ID', mssql.Int, { nullable: true });
        table.columns.add('UNIDADES', mssql.Decimal(16, 4), { nullable: true });
        table.columns.add('FOLIOS', mssql.VarChar(3000), { nullable: true });
       
        stocks.forEach(stock => {
            table.rows.add(
                stock.CLAVE_ARTICULO,
                stock.EXISTENCIA,
                stock.COSTO_ULTIMA_COMPRA,
                stock.ARTICULO_ID,
                stock.UNIDADES,
                stock.FOLIOS
            );
        });

        const request = new mssql.Request();
        const result = await request.bulk(table);

        return res.json({
            ok: true,
            msg: 'Detalle de forecast guardado correctamente',
            rowsAffected: result.rowsAffected
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

/*Método para actualizar la relación de artículo proveedor */
const _getActProveedorArticulo = async (req, res) => {
    try {
        const provId = req.body.id;
        console.log(provId);
        const con = await get_connection();
        /* Consulta los articulos del proveedor */
        let artsProv = await con.query(`select ProveedorId as proveedorId,CLAVE_ARTICULO as claveArticulo from frk.ProveedorArt pa 
                                         inner join cat.Articulo a on pa.ArticuloId=a.ARTICULO_ID
                                         where pa.ProveedorId = ${provId}`);

        /* Borrar relación proveedor articulo forecas */
        let br = await PROCEDURES.borraProvArt(provId);

        /* Inserta l arealacion de proveedor articulo del sistema Forecast */
        await PROCEDURES.instertaRelacionProvArt(artsProv.recordset);

        /*Insercción correcta */
        return res.json({
            ok: true,
            msg: 'Tabla  de preedor articulo actualizada'
        })

    } catch (error) {
        console.log('Err ins', error);
        return res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}


const _create_purchase_order = async (req, res) => {
    try {
        const supplier = req.body.suppliers;
        const data = req.body.data;
        const user = req.body.user;
        const con = await get_connection();

        const folio = await PROCEDURES.insert_doctos_dc(user, supplier, data);

        const update_query = await PROCEDURES.update_microsip_table();
        if (update_query != null) {
            await con.query(`DELETE FROM OP.MICROSIP`);
            await con.query(update_query);
        }

        await con.query(`INSERT INTO OP.BITACORAFORECAST ( FECHA, FOLIO, ARTICULOS, PROVEEDORID, USUARIO ) VALUES ( '${DATE_TO_SAVE(null, "DATETIME")}', '${folio}', ${data.length}, ${supplier.PROVEEDORID}, '${user}' )`);
        console.log(`INSERT INTO OP.BITACORAFORECAST ( FECHA, FOLIO, ARTICULOS, PROVEEDORID, USUARIO ) VALUES ( '${DATE_TO_SAVE(null, "DATETIME")}', '${folio}', ${data.length}, ${supplier.PROVEEDORID}, '${user}' )`)
        const result = await con.query(`EXEC OP.XSPFORECAST '${supplier.PROVEEDORID}'`);

        res.json({
            ok: true,
            result: result.recordset,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _update_forecast_config = async (req, res) => {
    try {
        const data = req.body;

        const con = await get_connection();
        await con.query(`UPDATE OP.FORECAST SET EXCLUIR_FECHA = ${data.EXCLUIR_FECHA}, EX_FECHA_FIN = '${data.EX_FECHA_FIN}', EX_FECHA_INI = '${data.EX_FECHA_INI}' WHERE SEMANA = ${data.SEMANA} AND ANIO = ${data.ANIO}`);

        const result = await con.query(`SELECT TOP 2 * FROM OP.FORECAST WHERE ANIO >= 2023 ORDER BY SEMANA DESC`);

        res.json({
            ok: true,
            result: result.recordset,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _update_provedores_config = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const con = await get_connection();

        const isConfiYet = await con.query(`SELECT * FROM CAT.PROVEEDORCONFIG WHERE PROVEEDORID = ${id}`);
        if (isConfiYet.recordset.length != 0) {
            await con.query(`UPDATE CAT.PROVEEDORCONFIG SET FRECABASTO = ${data.FRECABASTO}, TIEMPOENTREGA = ${data.TIEMPOENTREGA}, STOCKSEGURIDAD = ${data.STOCKSEGURIDAD}, LSE = ${data.LSE} WHERE PROVEEDORID = ${id}`);
        } else {
            await con.query(`INSERT INTO CAT.PROVEEDORCONFIG ( PROVEEDORID, FRECABASTO, TIEMPOENTREGA, STOCKSEGURIDAD, LSE ) VALUES ( ${id}, ${data.FRECABASTO}, ${data.TIEMPOENTREGA}, ${data.STOCKSEGURIDAD}, ${data.LSE} )`);
        }

        const result = await con.query(`SELECT PC.PROVEEDORID AS _id, PC.PROVEEDORID, P.NOMBRE AS PROVEEDOR, PC.FRECABASTO, PC.TIEMPOENTREGA, PC.STOCKSEGURIDAD, PC.LSE FROM CAT.PROVEEDORCONFIG PC JOIN CAT.PROVEEDOR P ON P.PROVEEDORID = PC.PROVEEDORID WHERE PC.PROVEEDORID = ${id}`);

        res.json({
            ok: true,
            result: result.recordset[0],
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _update_supplier_articles = async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body.data;
        const con = await get_connection();

        if (data.length > 0) {
            var queries = `INSERT INTO CAT.PROVEEDORART `;
            data.forEach(function (item, index) {
                queries += `SELECT ${id}, ${item.ARTICULO_ID} `
                if (index !== data.length - 1) {
                    queries += 'UNION ALL '
                }
            });
            await con.query(queries);
            // await ASYNC.FOR_EACH( data, async ( item ) => {
            //     console.log( `INSERT INTO CAT.PROVEEDORART SELECT ${ id }, ${ item.ARTICULO_ID }` );
            //     await con.query( `INSERT INTO CAT.PROVEEDORART SELECT ${ id }, ${ item.ARTICULO_ID }` );
            // });
        }

        const result = await con.query(`EXEC OP.XSPFORECAST '${id}'`);

        res.json({
            ok: true,
            result: result.recordset,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _update_visual_min = async (req, res) => {
    try {
        const data = req.body.data;
        const con = await get_connection();

        if (data.length > 0) {
            // DELETE THE ARTICULES TO UPDATE IN ARTMINVIASUAL TO INSERT
            const id_array = data.map(i => { return i.ARTICULO_ID })
            await con.query(`DELETE FROM CAT.ARTMINVISUAL WHERE ARTICULO_ID IN ( ${id_array.toString()} )`)

            // MAKING A QUERY TO INSERT THE NEW VALUES OF VISUAL MIN
            var queries = `INSERT INTO CAT.ARTMINVISUAL `;
            data.forEach(function (item, index) {
                queries += `SELECT ${item.ARTICULO_ID}, ${item.MINIMO_VISUAL} `
                if (index !== data.length - 1) {
                    queries += 'UNION ALL '
                }
            });
            await con.query(queries);
        }

        const result = await con.query(`SELECT A.ARTICULO_ID, A.NOMBRE, ISNULL( MI.MIN_VISUAL, 0 ) AS MINIMO_VISUAL FROM CAT.ARTICULO A LEFT JOIN CAT.ARTMINVISUAL MI ON MI.ARTICULO_ID = A.ARTICULO_ID  WHERE  A.ESTATUS = 'A'`);

        res.json({
            ok: true,
            result: result.recordset
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _update_supplier_imported = async (req, res) => {
    try {
        const data = req.body.data;
        const con = await get_connection();

        if (data.length > 0) {
            await con.query(`UPDATE CAT.PROVEEDOR SET CATEGORIA = '${data[0].CATEGORIA}' WHERE NOMBRE = '${data[0].NOMBRE}'`);
        }

        const result = await con.query('EXEC [op].[xspForecastGetProveedoresCompletos]');
        res.json({
            ok: true,
            result: result.recordset
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _delete_article_supplier = async (req, res) => {
    try {
        const id = req.body._id;
        const data = req.body.data;
        const con = await get_connection();

        await con.query(`DELETE FROM CAT.PROVEEDORART WHERE PROVEEDOR_ID = ${id} AND ARTICULO_ID = ${data} `);
        const result = await con.query(`EXEC OP.XSPFORECAST '${id}'`);

        res.json({
            ok: true,
            result: result.recordset,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

const _filter = async (req, res) => {
    try {
        const query = req.body.query;
        console.log(query);
        const con = await get_connection();
        const result = await con.query(query);

        res.json({
            ok: true,
            result: result.recordset,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}
const frkOrdenCompra = (req, res = response) => {
    const conection = req.params.conection;
    console.log('head', req.body);
    try {
        firebirdQuerys.frkOrdenCompra('AC', req.body).then(resp => {
            console.log('encabezado guardado');
            return res.json({
                ok: true,
                ...resp
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const frkOrdenCompraDet = (req, res = response) => {
    const conection = req.params.conection;
    console.log('det', req.body);
    try {
        firebirdQuerys.frkOrdenCompraDet('AC', req.body).then(resp => {
            return res.json({
                ok: true,
                ...resp
            });
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    _get,
    _get_forecast_by_supplier,
    _create_purchase_order,
    _update_provedores_config,
    _update_forecast_config,
    _update_supplier_articles,
    _update_visual_min,
    _update_supplier_imported,
    _delete_article_supplier,
    _filter,
    frkOrdenCompra,
    frkOrdenCompraDet,
    _getActProveedorArticulo /*Declara método para  actualizr tabla proveedor artículo */
}