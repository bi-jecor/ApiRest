const { response } = require('express');
const Pvsale = require('../models/pv_sale');
const { login } = require('./auth');

const sale = async (req, res) => {
    try {
        const pvSale = new Pvsale({
            ...req.body
        });

        console.log(pvSale);
    
        const saleDB = await pvSale.save();
    
        return res.status(200).json({
            ok:true,
            saleDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error to create Sale, check with your system Administrator'
        });
    }
}

const getSalesByMissing = async (req, res) => {
    try {
        const date = req.query.date;
        const salesDB = await Pvsale.find({sale: false , date: date});
        return res.status(200).json({
            ok: true,
            salesDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error to get sales, check with your system Administrator'
        });
    }
}

const getSaleByUser = async (req, res) => {
    const user = req.params.user;
    const store = req.params.store;
    // const date = `${String(new Date().getMonth()).length === 1 ?  '0'+ (new Date().getMonth() + 1) : new Date().getMonth() + 1} ${new Date().getDate() }, ${new Date().getFullYear()}`;
    const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length === 1 ?  '0'+ (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date().getDate()}`;
    console.log(date, new Date(`${date} 00:00:00`));
    try {
        const salesDB = await Pvsale.find( {userMicrosip : user, warehouse : store, date : {$gt: new Date(`${date} 00:00:00`) } }) ;
        console.log(salesDB);
        return res.status(200).json({
            ok: true,
            sales :salesDB
        })
    } catch (error) {
        console.log(error);
    }
}

const getSalesByDate = async (req, res) => {
    const date = req.query.date;
    try {
        const salesDB = await Pvsale.find( { date : {$lt: (new Date("05 05, 2023 00:00:00")) }  }) ;
        console.log(salesDB);
        return res.status(200).json({
            ok: true,
            sales : salesDB
        })
    } catch (error) {
        console.log(error);
    }
}


const getSaleByUserAndDate = async (req, res) => {
    const user = req.params.user;
    const store = req.params.store;
    let date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length === 1 ?  '0'+ (new Date().getMonth() + 1) : new Date().getMonth() + 1}-${new Date().getDate()}`;
    // console.log('DATE',date);

    try {
        const salesDB = await Pvsale.find( {userMicrosip : user, warehouse : store, date : {$gt: new Date(`${date} 00:00:00`) } }) ;
        let salesTemp = [];
        let sales = [];
        salesDB.forEach(element => {
            salesTemp = [...salesTemp, ...element.detail]
        });
        // console.log('SALESTEMP',salesTemp);
        salesTemp.forEach(art => {
            console.log(art);
            const exist = sales.find(item => item.name === art.name)
            if (exist) {
                const index = sales.findIndex(item => item.name === exist.name);
                console.log(index);
                sales[index].unities += art.unities
                sales[index].total += art.total
            } else {
                sales.push(art)
            }
        });
        return res.status(200).json({
            ok: true,
            sales
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    sale,
    getSaleByUser,
    getSalesByDate,
    getSaleByUserAndDate,
    getSalesByMissing
}