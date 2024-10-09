const formatDateToString = (date) => {
    const tranformDate = new Date(date)
    return `${tranformDate.getDate()}/${tranformDate.getMonth() + 1}/${tranformDate.getFullYear()}`
}

module.exports = {
    formatDateToString
}