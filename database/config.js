const mongoose = require('mongoose');
const DB_CNN = "mongodb://localhost:27017/jecorDB";
// const DB_CNN = process.env.DB_CNN;

const dbConnection = async() => {
    try {
        await mongoose.connect(DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }

}

module.exports = {
    dbConnection
}