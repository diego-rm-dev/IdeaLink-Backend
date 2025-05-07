const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      // Opcional: si necesitas charset utf8mb4
      charset: 'utf8mb4',
    }
  });
  module.exports = sequelize;
