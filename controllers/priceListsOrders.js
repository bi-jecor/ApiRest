const {response, request} = require('express')
const PricesListOrder = require('../models/pricesListOrder');

const createPricesListOrder = async (req, res) => {
    const data = new PricesListOrder ({
        ...req.body
    });
    try {
        const pricesListOrderDB = await data.save();
        return res.status(200).json({
            ok:true,
            pricesListOrder: pricesListOrderDB
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to create PricesListOrder'
        })
    }
}

    const getPricesListOrders = async(req, res) => {
        
        try {
            const pricesListOrdersDB = await PricesListOrder.find();
            return res.json({
                ok:true,
                pricesListsOrder : pricesListOrdersDB
            });
        } catch (error) {
            return res.status(500).json({
                ok:false,
                msg: 'Error to get prices lists , check with your system Administrator',
                error
            });
        }
    }

    const getPricesListOrder = async(req, res) => {
        const pricesListOrderId = req.params.pricesListOrderId;
        try {
            const pricesListOrderDB = await PricesListOrder.findOne({_id: pricesListOrderId});

            return res.json({
                ok:true,
                pricesListsOrder : pricesListOrderDB
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg: 'Error to get prices lists , check with your system Administrator',
                error
            });
        }
    }

    const updatePricesListOrder = async (req, res) => {
        const pricesListOrderId = req.params.pricesListOrderId;
        const data =  {
            ...req.body
        }
    
        console.log(data);
    
    
        try {
            const pricesListOrder = await PricesListOrder.findOneAndUpdate({_id: pricesListOrderId}, data, {
                new: true
            });

            return res.json({
                ok:true,
                pricesListOrder
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok:false,
                msg: 'Error to update prices lists order, check with your system Administrator',
                error
            });

        }
    }





module.exports = {
    createPricesListOrder,
    getPricesListOrders,
    getPricesListOrder,
    updatePricesListOrder

}