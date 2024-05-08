ASYNC = {}

ASYNC.FOR_EACH = async ( array, callback ) => {
    for (let index = 0; index < array.length; index++ ) {
        await callback( array[ index ], index, array );
    }
}

ASYNC.WAIT = ( ms ) => new Promise( r => setTimeout(r, ms) );

module.exports = ASYNC;