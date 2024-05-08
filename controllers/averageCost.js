const controller = {}
const processor = require('../processors/averageCost');

controller._get = async (req, res) => {
    
    const result = await processor._get_costos_diff();
    if( result !== null ){
        res.json({
            ok: true,
            result: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

controller._post = async (req, res) => {
    const OLD = req.body.data.OLD;
    const CURRENT = req.body.data.CURRENT;

    await processor._remove_from_costos_diff( CURRENT.FOLIO, OLD.FOLIO, CURRENT.CLAVE_ARTICULO );
    await processor._actions( OLD, OLD.ACTION );
    await processor._actions( CURRENT, CURRENT.ACTION );
    const result = await processor._get_costos_diff();

    if( result !== null ){
        res.json({
            ok: true,
            result: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

controller._filter = async ( req, res ) => {   
    
    const query = req.body.query;
    const result = await processor._filter( query );
    if( result !== null ){
        res.json({
            ok: true,
            result: result.recordset,
        });
    } else {
        res.status(500).json({
            ok: false,
            msg: 'Consulte con su administrador de sistema'
        });
    }
}

module.exports = controller;