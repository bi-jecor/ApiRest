const formart = {};

formart.Or = ( key, data ) => {
    return { 
        $or : [...data.map( i => {
            return JSON.parse(`{ "${ key }": "${ i }" }`);
        })]
    }
    // $or: [ 
    //         { departament: ObjectId('619c38f4b2fd54e79bd2dc5f') }, 
    //         { departament: ObjectId('619c3903b2fd54e79bd2dc65') }
    // ]
}

module.exports = formart;