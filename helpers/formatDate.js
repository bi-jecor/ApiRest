const formatDateToString = (date) => {
    const tranformDate = new Date(date)
    return `${ String(tranformDate.getDate()).length===1 ? '0' + String(tranformDate.getDate()) : tranformDate.getDate() }/${String(tranformDate.getMonth()).length===1 ? '0'+ String(tranformDate.getMonth() + 1) : tranformDate.getMonth() + 1 }/${tranformDate.getFullYear()}`
}

module.exports = {
    formatDateToString
}