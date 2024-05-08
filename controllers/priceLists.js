const {response, request} = require('express')
const PricesList = require('../models/pricesList');

const createPricesList = async (req, res) => {

    try {
        const pricesListDB = await PricesList.insertMany(req.body);
        return res.json({
            ok:true,
            pricesList: pricesListDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg: 'Error to create price  list , check with your system Administrator',
            error
        });
    }
}


const getPricesLists = async  (req, res) => {
    const date = req.params.date;
    const pricesListsDB = await PricesList.find({date: date})
        .populate('userAsssigned')
    try {
        return res.json({
            ok:true,
            pricesLists : pricesListsDB
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get prices lists , check with your system Administrator',
            error
        });
    }
}

const getPricesListsByOrder = async  (req, res) => {;
    const pricesListOrderId = req.params.pricesListOrderId;
    console.log(pricesListOrderId);
    const pricesListsDB = await PricesList.find({'order': pricesListOrderId, 'status': '2'})
        .populate('userAsssigned')
    try {
        return res.json({
            ok:true,
            pricesLists : pricesListsDB
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get prices lists , check with your system Administrator',
            error
        });
    }
}




const getPricesList = async  (req, res) => {
    const priceListId = req.params.pricesListId;
    const pricesListDB = await PricesList.findOne({_id: priceListId })
        .populate('userAsssigned')
    try {
        return res.json({
            ok:true,
            pricesList : pricesListDB
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get prices lists , check with your system Administrator',
            error
        });
    }
}
const updatePricesList = async  (req, res) => {
    const priceListId = req.params.pricesListId;
    const data =  {
        ...req.body
    }

    console.log(data);

    try {
        const pricesList = await PricesList.findOneAndUpdate({_id: priceListId}, data, {
            new: true
        });
        return res.json({
            ok:true,
            pricesList
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to update prices lists , check with your system Administrator',
            error
        });
    }
}

const getPricesListsByUserAndStatus = async  (req, res) => {
    const userId = req.params.userId;
    const status = req.params.status;
    const pricesListsDB = await PricesList.find({'userAsssigned': userId, status})
        .populate('userAsssigned')
    try {
        return res.json({
            ok:true,
            pricesLists : pricesListsDB
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Error to get prices lists , check with your system Administrator',
            error
        });
    }
}






module.exports = {
    createPricesList,
    getPricesLists,
    getPricesList,
    getPricesListsByUserAndStatus,
    getPricesListsByOrder,
    updatePricesList
}