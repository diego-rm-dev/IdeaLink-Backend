const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Idea = sequelize.define('Idea', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  metadata: { type: DataTypes.JSON }
}, { timestamps: true });

Idea.belongsTo(User, { foreignKey: 'userId', as: 'creator' });
User.hasMany(Idea, { foreignKey: 'userId', as: 'ideas' });

module.exports = Idea;
