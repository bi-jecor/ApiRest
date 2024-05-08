const { get_connection } = require('../database/sqlserver.connections');

const db = "SVRJECORBI"
const processor = {}

processor._get_costos_diff = async () => {
    try {
        const con = await get_connection();
        return await con.query( `
            SELECT * 
            FROM ${ db }.OP.DoctosDiffCosto`
        )
    } catch (error) {
        console.log(error);
        return null;
    }
}

processor._remove_from_costos_diff = async ( FOLIO, A_FOLIO, CLAVE_ARTICULO ) => {
    try{
        const con = await get_connection();
        await con.query(`
            DELETE FROM ${ db }.OP.DoctosDiffCosto
            WHERE FOLIO = '${ FOLIO }' AND A_FOLIO = '${ A_FOLIO }' AND CLAVE_ARTICULO = '${ CLAVE_ARTICULO }'
        `)
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

processor._update_doctos_cm_co = async ( data ) => {
    try {
        const con = await get_connection();

        const CLAVE_ARTICULO = data.CLAVE_ARTICULO;
        const FOLIO = data.FOLIO;
        const PRECIO_UNITARIO = data.PRECIO_UNITARIO;
        const PRECIO_UNITARIO_M = data.PRECIO_UNITARIO_M;
        const UNIDADES = data.UNIDADES;
        const UNIDADES_M = data.UNIDADES_M;
        const PRECIO_TOTAL_NETO_M = data.PRECIO_TOTAL_NETO_M;
        const TYPE = data.TYPE;
        const PRECIO = data.OTRO_PRECIO;

        // UPDATE IN DoctosCM_CO
        await con.query(`
        UPDATE ${ db }.OP.DoctosCM_CO
        SET PRECIO_UNITARIO = ${ PRECIO_UNITARIO_M }, UNIDADES = ${ UNIDADES_M }, PRECIO_TOTAL_NETO = ${ PRECIO_TOTAL_NETO_M }
        WHERE FOLIO = '${ FOLIO }' AND CLAVE_ARTICULO = '${ CLAVE_ARTICULO }' AND UNIDADES = ${ UNIDADES } AND PRECIO_UNITARIO = ${ PRECIO_UNITARIO }
        `)

        // UPDATE IN CostosDiff 
        if( TYPE === 'CURRENT' ){
            const margin = ( ( ( PRECIO_UNITARIO_M / PRECIO ) * 100 ) - 100 ).toFixed( 2 )
            await con.query(`
            UPDATE ${ db }.OP.DoctosDiffCosto
            SET A_PRECIO_UNITARIO = ${ PRECIO_UNITARIO_M }, A_UNIDADES = ${ UNIDADES_M }, A_PRECIO_TOTAL_NETO = ${ PRECIO_TOTAL_NETO_M }, MARGEN = ${ margin }
            WHERE A_FOLIO = '${ FOLIO }' AND A_PRECIO_UNITARIO = ${ PRECIO_UNITARIO } AND CLAVE_ARTICULO = '${ CLAVE_ARTICULO }' 
            `)
        }

        if( TYPE === 'OLD' ){
            const margin = ( ( ( PRECIO / PRECIO_UNITARIO_M ) * 100 ) - 100 ).toFixed( 2 )
            await con.query(`
            UPDATE ${ db }.OP.DoctosDiffCosto
            SET PRECIO_UNITARIO = ${ PRECIO_UNITARIO_M }, UNIDADES = ${ UNIDADES_M }, PRECIO_TOTAL_NETO = ${ PRECIO_TOTAL_NETO_M }, MARGEN = ${ margin }
            WHERE FOLIO = '${ FOLIO }'  AND PRECIO_UNITARIO = ${ PRECIO_UNITARIO } AND CLAVE_ARTICULO = '${ CLAVE_ARTICULO }'
            `)    
        }

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

processor._delete_doctos_cm_co = async ( data ) => {
    try {
        const con = await get_connection();
        
        const FOLIO = data.FOLIO;
        const CLAVE_ARTICULO = data.CLAVE_ARTICULO;
        const UNIDADES = data.UNIDADES;
        const PRECIO_UNITARIO = data.PRECIO_UNITARIO;

        await con.query(`
            DELETE FROM ${ db }.OP.DoctosCM_CO
            WHERE FOLIO = '${ FOLIO }' AND CLAVE_ARTICULO = '${ CLAVE_ARTICULO }' AND UNIDADES = ${ UNIDADES } AND PRECIO_UNITARIO = ${ PRECIO_UNITARIO }
        `);
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

processor._actions = async ( data, type ) => {
    try{
        if( type === "VALID" ){ 
            console.log( `[ AVERAGE COST ] VALID ${ data.FOLIO } FROM DOCTOS CM CO` );
            // await processor._delete_doctos_cm_co( CURRENT.FOLIO, OLD.FOLIO, CURRENT.CLAVE_ARTICULO );
        }
    
        if( type === "UPDATE" ){
            console.log( `[ AVERAGE COST ] UPDATE ${ data.FOLIO } FROM DOCTOS CM CO` );
            await processor._update_doctos_cm_co( data );
        }
    
        if( type === "DELETE" ){ 
            console.log( `[ AVERAGE COST ] DELETE ${ data.FOLIO } FROM DOCTOS CM CO` );
            await processor._delete_doctos_cm_co( data );
        }
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

processor._filter = async ( data ) => {
    try {
        const con = await get_connection();
        return await con.query( data );
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = processor;