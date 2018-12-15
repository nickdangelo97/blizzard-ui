module.exports = (sequelize, type) => {
    return (sequelize.define('user', {
        loyalty: {
            type: type.INTEGER
        }, 
        yob: {
            type: type.INTEGER
        },
        u: {
            type: type.INTEGER
        },
        name: {
            type: type.STRING
        },
        email: {
            type: type.STRING
        },
        password: {
            type: type.STRING
        },
        address: {
            type:type.STRING
        },
        city: {
            type: type.STRING
        },
        zip: {
            type: type.STRING
        },
        province: {
            type: type.STRING
        },
        country : {
            type: type.STRING
        },
        phone: {
            type: type.INTEGER
        },
        gender: {
            type: type.STRING
        }
    }))
}
