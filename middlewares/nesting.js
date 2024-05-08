const merge = ( obj, exp ) => {
    let str = '';
    var keys = exp.split(',');
    keys.forEach( k => {
        str += obj[k] + " ";
    });
    return str;
}

const noNesting = ( data, values, exp ) => {
    var nesting = values.split(',');
    var obj = {};

    data = data.map( i => {
        nesting.map( x => {
            if( i[x] !== undefined ){
                obj[x] = merge( i[x], exp );
            }
        })
        return {
            ...i._doc,
            ...obj
        }
    })

    return data;
}

module.exports = { 
    noNesting
}