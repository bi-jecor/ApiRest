const { response } = require('express');
const Inventory = require('../models/inventory');

const createInventory = async (req, res) => {
    
    const body = req.body;
    const data = new Inventory({
        ...body
    });

    try {
        const inventoryDB = await data.save();
        return res.json({
            ok: true,
            inventory: inventoryDB
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to create inventory'
        })
    }
    
}

const getInventories= async (req, res) => {
    try {
        const inventoriesDB = await Inventory.find();
        return res.json({
            ok: true,
            inventories: inventoriesDB
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get inventoriesDB'
        })
    }
}

const getInventoriesByWarehouseAndUser = async (req, res) => {
    const warehouse = req.params.warehouse
    const userId = req.params.user

    try {
        const inventoriesDB = await Inventory.find({'warehouse': warehouse, 'elaborated': userId});
        return res.json({
            ok: true,
            inventories: inventoriesDB
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get inventoriesDB'
        })
    }
}
const getInventoriesByWarehouse = async (req, res) => {
    const warehouse = req.params.warehouse
    const userId = req.params.user

    try {
        const inventoriesDB = await Inventory.find({'warehouse': warehouse})
        .populate('elaborated', 'user')
        return res.json({


            ok: true,
            inventories: inventoriesDB
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get inventoriesDB'
        })
    }
}

const getInventoriesByStatus = async (req, res) => {
    const status = req.params.status

    try {
        const inventoriesDB = await Inventory.find({'status': status});
        return res.json({
            ok: true,
            inventories: inventoriesDB
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'error to get inventoriesDB'
        })
    }
}

const getInventory = async (req, res) => {
    const inventoryId = req.params.inventoryId
    try {
        const inventoryDB = await Inventory.findOne({_id: inventoryId});
        return res.json({
            ok: true,
            inventory: inventoryDB
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error to get inventory'
        })
    } 
}

const updateInventory = async (req, res) => {
    const inventoryId = req.params.inventoryId
    data = {
        ...req.body
    }
    try {
        const inventoryDB = await Inventory.findOneAndUpdate({_id: inventoryId}, data, {new: true});
        return res.json({
            ok: true,
            inventory: inventoryDB
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'error to get inventory'
        })
    } 
}



module.exports = {
    createInventory, 
    getInventory,
    getInventories,
    getInventoriesByWarehouseAndUser,
    getInventoriesByWarehouse,
    getInventoriesByStatus,
    updateInventory
}