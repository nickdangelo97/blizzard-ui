const uuid = require('uuid/v4')

module.exports = (sequelize, type) => {
    return (sequelize.define('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: type.UUID,
            defaultValue: uuid()
        },
        active: {
            type: type.BOOLEAN
        },
        Loyalty: {
            type: type.STRING
        }, 
        Year_of_Birth: {
            type: type.INTEGER
        },
        U: {
            type: type.INTEGER
        },
        Name: {
            type: type.STRING
        },
        Email: {
            type: type.STRING
        },
        Password: {
            type: type.STRING
        },
        Address: {
            type:type.STRING
        },
        City: {
            type: type.STRING
        },
        ZipORPostal: {
            type: type.STRING
        },
        ProvinceORState: {
            type: type.STRING
        },
        Country : {
            type: type.STRING
        },
        Phone: {
            type: type.STRING
        },
        Gender: {
            type: type.STRING
        },
    }))
}
