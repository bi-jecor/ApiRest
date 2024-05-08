function TOTAL( data ){
    let result = 0;
    data.map( i => result += i.PRECIO_TOTAL_NETO )
    return result;
}

const CLEAR_DATA_BUFFER = ( data, latin1 = [] ) => {
    return data.map(i => {
        let res = {};
        const regex = /'/ig;
        for ( x in i ) {
            try {
                // res[x] = i[x].toString('utf16le');
                // res[x] = i[x].toString('latin1');
                if( latin1.includes( x ) ){
                    res[x] = i[x].toString('latin1');
                } else {
                    res[x] = i[x].toString();
                }
                
            } catch {
                res[x] = null;
            }
        }
        return res;
    })
}

const GET_HELPDESK_ID = ( id = '000000001' ) => {
    if( typeof id !== "string" ){  id = id.toString(); }
    let start = id.substring( 0, 4 );
    let end = id.substring( id.length - 4 );
    return `${ start }${ end }`
}

// const CLEAR_FOLIOS_BUFFER = (data) => {
//     return data.map( i => {
//         return {
//             ...i,
//             FOLIOS: i.FOLIOS !== null ? i.FOLIOS.toString() : null
//         }
//     })
// }

module.exports = {
    TOTAL,
    CLEAR_DATA_BUFFER,
    GET_HELPDESK_ID,
    // CLEAR_FOLIOS_BUFFER
}   