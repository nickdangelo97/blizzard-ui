module.exports = (sequelize, type) => {
    return (sequelize.define('deals', {
        title: {
            type: type.STRING
        }, 
        details: {
            type: type.STRING
        },
        subDetails: {
            type: type.STRING
        },
    }))
}
