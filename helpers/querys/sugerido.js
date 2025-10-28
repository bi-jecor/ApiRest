/**
 * Módulo para operaciones de requerimientos en la base de datos Firebird.
 * Incluye la función para guardar un requerimiento completo (encabezado y detalles) en una sola transacción.
 **/

const firebird = require('node-firebird');
const conections = require('../../database/connections');


/**
 * Guarda un requerimiento completo en la base de datos.
 * Inserta el encabezado y todos los artículos (detalles) en una sola transacción.
 * Si ocurre un error en cualquier inserción, se realiza rollback y no se guarda nada.
 */

function jsonToSqlValues(obj) {
    // Convierte un objeto JSON a una cadena de valores SQL
    // Maneja valores nulos y cadenas de texto adecuadamente
    const r = Object.values(obj)
        .map(val => 
            val === null ? 'NULL' : 
            typeof val === 'string' ? `'${val.replace(/'/g, "''")}'` : 
            val
        )
        .join(', ');
        return r;
}

const guardarRequerimientoCompleto = async (encabezado, articulos = [], conexion ) => {
    let folio = '';
    console.log('articulos', encabezado, articulos);
    return new Promise((resolve, reject) => {
        // Conexión a la base de datos Firebird
        firebird.attach(conections[conexion], async (err, db) => {
            if (err) return reject(new Error('Error connecting to the database'));
            // Inicia una transacción
            db.transaction(firebird.ISOLATION_READ_COMMITTED, async (err, transaction) => {
                if (err) {
                    db.detach();
                    return reject(new Error('Error starting transaction'));
                }
                try {
                    // Inserta el encabezado
                    // const queryEncabezado = `SELECT * FROM XSP_INSERTAR_REQ_SUG (${Object.keys(encabezado).join(', ')}) VALUES (${jsonToSqlValues(encabezado)});`;
                    const queryEncabezado = `SELECT * FROM XSP_INSERTAR_REQ_SUG (${jsonToSqlValues(encabezado)});`;
                    const docto_id = await new Promise( (res, rej) => {
                        transaction.query(queryEncabezado, (err, result) => {
                            if (err) return rej(err);
                            // Asigna el ID del documento insertado al encabezado
                            folio = result[0].FOLIO;
                            res(result[0].DOCTO_ID);
                            // console.log('Encabezado insertado',result, );
                            // err ? rej(err) : res()
                        })
                    });
                    console.log('Encabezado insertado con ID:', docto_id);
                    // Inserta cada artículo (detalle)
                    for (const articulo of articulos) {
                        const queryDetalle = `EXECUTE PROCEDURE XSP_INSERTAR_ART_DET_SUGERIDO(${docto_id}, ${jsonToSqlValues(articulo)});`;
                        // const queryDetalle = `INSERT INTO EXP_REQUERIMIENTOS_DET (${Object.keys(articulo).join(', ')}) VALUES (${jsonToSqlValues(articulo)});`;
                        await new Promise((res, rej) =>
                            transaction.query(queryDetalle, (err) => {
                                err ? rej(err) : res()
                            })
                        );
                    }
                    transaction.commit(  () => {
                        db.detach();
                        resolve({folio: folio});
                    });
                } catch (error) {
                    // Si ocurre un error, realiza rollback
                    console.error('Error during transaction:', error);
                    transaction.rollback(() => db.detach());
                    reject(new Error('Error en la transacción: ' + error.message));
                }
            });
        });
    });
};




module.exports = {
    guardarRequerimientoCompleto
};
