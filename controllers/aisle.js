const AisleOrder = require('../models/aisle');
const fs = require('fs')


const createAisle =  async (req, res) => {
    try {
        const data = new AisleOrder ({
            ...req.body
        })
    
        const aisleDB = await data.save();
        return res.json({
            ok:true,
            aisleDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            error
        });
    }
}

const getAisleOrders = async (req, res) => {
    const warehouse = req.params.warehouse;
    try {
        const aisleOrders = await AisleOrder.find({'warehouse': warehouse,  status : {"$ne" : 'c' }})
                .limit(30)
                .sort({date: -1})
        return res.json({
            ok:true,
            aisleOrders
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        });
    }
}

const getAisleOrdersByUser = async (req, res) => {
    const user = req.params.user;
    const branch = req.params.branch;
    try {
        const aisleOrders = await AisleOrder.find({user : user, warehouse : branch })
                .limit(10)
                .sort({date: -1})
        return res.json({
            ok:true,
            aisleOrders
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        });
    }
}

const getAisleOrdersDate = async (req, res) => {
    try {
        const aisleOrders = await AisleOrder.find({});
        return res.json({
            ok:true,
            aisleOrders
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error
        });
    }
}
const getAisleOrdersToDelete = async (req, res) => {
    const date1 = req.params.year;
    const date2 = Number(date1) - 172800000;
    try {
        const aisleOrders = await AisleOrder.find({'fecha': {"$lt" : new Date(Number(date2)) }} );
        return res.json({
            ok:true,
            aisleOrders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            error
        });
    }
}

const getAisleOrder = async (req, res) => {
    const aisleOrderId = req.params.aisleOrderId;
    try {
        const aisleOrder = await AisleOrder.findOne({_id: aisleOrderId});
        return res.json({
            ok:true,
            aisleOrder
        });

    } catch (error) {
        return res.status(500).json({
            ok:false
        });
    }
}

const getAisleOrdersReport = async (req, res) => {
    const data = [];
    try {
        const aisleOrders = await AisleOrder.find();
        await aisleOrders.forEach(element => {
            element.listaProductos.forEach(producto => {
                console.log(producto);
            })

        });
        fs.writeFile('Reporte', data, (err) => {
            console.log(err);
            if(err) throw err;
            return res.json({
                ok:true,
                aisleOrders
            });
        })
            

    } catch (error) {
        return res.status(500).json({
            ok:false
        });
    }
}

const updateAisleOrder = async (req, res) => {
    const aisleOrderId = req.params.aisleOrderId;
    data =  new AisleOrder({
        ...req.body
    })
    
    try {
        const aisleOrder = await AisleOrder.findOneAndUpdate({_id: aisleOrderId}, data, {
            new: true
        });

        return res.json({
            ok:true,
            aisleOrder
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false
        });
    }
}

const deleteAisleOrder = async( req, res) => {
    const aisleOrderId = req.params.aisleOrderId;
    try {
        const aisleOrder = await AisleOrder.findOneAndDelete({_id: aisleOrderId});

        return res.json({
            ok:true,
            aisleOrder
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false
        });
    }
}

module.exports = {
    createAisle,
    getAisleOrders,
    getAisleOrdersByUser,
    getAisleOrdersDate,
    getAisleOrder,
    getAisleOrdersReport,
    updateAisleOrder,
    deleteAisleOrder,
    getAisleOrdersToDelete
}