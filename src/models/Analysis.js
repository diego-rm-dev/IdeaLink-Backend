const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Idea = require('./Idea');
const User = require('./User');

const Analysis = sequelize.define('Analysis', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  analysis: { type: DataTypes.JSON, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false }  // e.g. 'quality', 'detailed', 'investor'
}, { timestamps: true });

Analysis.belongsTo(Idea, { foreignKey: 'ideaId', as: 'idea' });
Idea.hasMany(Analysis, { foreignKey: 'ideaId', as: 'analyses' });

Analysis.belongsTo(User, { foreignKey: 'userId', as: 'analyst' });
User.hasMany(Analysis, { foreignKey: 'userId', as: 'analyses' });

module.exports = Analysis;
