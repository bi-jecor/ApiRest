const obtenerDias = (txt = '') => {
    if(txt === 'CONTADO' || txt === 'CONTADO (3)' || txt === 'CONTADO1' || txt === 'Contado'){
        return '0'
    } else {

    }
    return txt.substring(8,10).replace(' ','')
}

module.exports = {
    obtenerDias
}