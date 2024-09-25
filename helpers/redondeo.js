// ******* Esta funcion redondea a dos decimales ***** ///
const dosDecimales = (valor) => {
    const digitos = String(valor).split('.')
    return Number(`${digitos[0]}.${String(digitos[1] || '00').substring(0,2)}`)
}

module.exports = {
    dosDecimales
}