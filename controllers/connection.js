const { response, request } = require('express');
const mongoose = require('mongoose');
const DB_CNN = "mongodb://localhost:27017/jecorDB";

const mongoConnection = async(req = request, res = response) => {
    try {
        const conection =await mongoose.STATES[mongoose.connection.readyState]
        if (conection !== 'connected') {
            res.json({
                ok: false
            });
        }
        res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false
        });
    }
}

module.exports = {
    mongoConnection
}