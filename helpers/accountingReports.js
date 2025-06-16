var firebird = require('node-firebird');
const conections =  require('../database/connections');
const formatDate = require('../helpers/formatDate');


const getProvidersCharges = (connection, date) => {
    console.log(connection);
    return new Promise((resolve, reject) => {
        firebird.attach(conections[connection] , function(err, db) {
            console.log('err1',err);
            db.execute(
            ` 
            SELECT dcp.proveedor_id, prov.nombre, condiciones_pago_CP.nombre, dcp.fecha , dcp.folio, cprov.fecha_vencimiento, cprov.atraso, cprov.importe_cargo, cprov.saldo_cargo, claves_proveedores.clave_prov
            FROM CARGOS_PROVEEDORES_JGB('${date}', '${date}', '') cprov
            LEFT JOIN DOCTOS_CP  dcp
            ON   cprov.docto_cp_id = dcp.docto_cp_id
            LEFT JOIN proveedores prov
            ON  dcp.proveedor_id = prov.proveedor_id
            left JOIN condiciones_pago_cp
            ON dcp.cond_pago_id = condiciones_pago_cp.cond_pago_id
            left join claves_proveedores
            on prov.proveedor_id = claves_proveedores.proveedor_id and claves_proveedores.rol_clave_prov_id = 49
            where claves_proveedores.clave_prov is not null
            order by prov.nombre,  cprov.fecha_vencimiento asc
            `,
                function(err, data) {
                    if(err){
                        console.log('err',err);
                    }
                    console.log('DATA',data);
                    let catalogo = []
                    if(data){
                        data = data.map(element => {
                            return {
                                provId : element[0],
                                proveedor : element[1],
                                cond_cargo : element[2] !== null ? element[2].toString('latin1') : 'Null' ,
                                fecha : formatDate.formatDateToString(element[3] ),
                                folio : element[4] !== null ? element[4].toString('latin1') : 'Null',
                                fecha_vencimiento : formatDate.formatDateToString(element[5] ),
                                atraso : element[6],
                                importe : element[7],
                                saldo : element[8],
                                sucursal : connection,
                                concepto : 'Compra'
                            }
                        });
                        // IMPORTANT: close the connection
                        data = {
                            charges : data,
                            connection
                        }
                        db.detach();
                        resolve(data);
                        // return res.json({
                        //     data
                        // })
                    }
            });
        });
    });
}


module.exports = { 
    getProvidersCharges
}
