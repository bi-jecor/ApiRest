const obtenerDias = (txt = '') => {
    if(txt === 'CONTADO' || txt === 'CONTADO (3)' || txt === 'CONTADO1' || txt === 'Contado'){
        return txt
    } else {

    }
    return txt.substring(8,txt.length)
}

module.exports = {
    obtenerDias
}