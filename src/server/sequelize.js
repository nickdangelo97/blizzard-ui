const Sequelize = require('sequelize')
const UserModel = require('./models/User')
const DealsModel = require('./models/Deals')


const sequelize = new Sequelize('blizzardcrm', 'nick2', '6197', {
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const User = UserModel(sequelize, Sequelize)
  const Deals = DealsModel(sequelize, Sequelize)

  sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })


module.exports = {
  User,
  Deals 
}