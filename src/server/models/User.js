module.exports = (sequelize, type) => {
    return (sequelize.define('user', {
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
            type: type.INTEGER
        },
        Gender: {
            type: type.STRING
        },
    }))
}
