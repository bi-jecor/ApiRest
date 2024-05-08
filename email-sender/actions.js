const { Workbook } = require('exceljs');
const ACTIONS = {}

ACTIONS.GET_HEADERS = ( data ) => {
    const keys = Object.keys( data[0] );
    return keys.map( i => {
        return JSON.parse(`{ "header": "${ i }", "key": "${ i }" }`);
    })
}

ACTIONS.CREATE_EXCEL = async ( data ) => {
    const workbook_aux = new Workbook();
    const worksheet = workbook_aux.addWorksheet('Debtors');
    
    worksheet.columns = ACTIONS.GET_HEADERS( data );
    data.forEach((e) => { worksheet.addRow(e); });
    return await workbook_aux.xlsx.writeBuffer();
}

module.exports = ACTIONS;