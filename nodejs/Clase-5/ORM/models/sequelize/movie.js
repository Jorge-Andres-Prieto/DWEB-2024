import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js'; // Importa tu conexión a Sequelize

class Movie extends Model {}

Movie.init({
  id: {
    type: DataTypes.BINARY(16),
    allowNull: false,
    primaryKey: true,
    get() {
      const rawValue = this.getDataValue('id');
      return rawValue ? rawValue.toString('hex').match(/.{1,8}/g).join('-') : null;
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
  },
  rate: {
    type: DataTypes.FLOAT,
  }
}, {
  sequelize,
  modelName: 'Movie',
  tableName: 'movie',
  timestamps: false
});

export default Movie;
