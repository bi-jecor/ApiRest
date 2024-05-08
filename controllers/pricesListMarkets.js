const { response, request } = require('express')
const PricesListMarkets = require('../models/pricesListMarkets');

const createPricesListMarket = async (req = request, res = response) => {
    console.log(req.body);
    try {
        const pricesListMarketDB = await PricesListMarkets({ ...req.body }).save();
        return res.json({
            ok: true,
            market : pricesListMarketDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

const getPricesListMarkets = async (req = request, res = response) => {
    try {
       const markets = await PricesListMarkets.find(); 
       return res.json({
        ok: true,
        markets
       });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your system Administrator'
        });
    }
}

module.exports = {
    getPricesListMarkets,
    createPricesListMarket
}
