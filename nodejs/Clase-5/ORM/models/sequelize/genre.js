import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';

export class Genre extends Model {}

Genre.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Genre',
  tableName: 'genre',
  timestamps: false
});

