import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize.js';
import { v4 as uuidv4 } from 'uuid';

export class Movie extends Model {}

Movie.init({
  id: {
    type: DataTypes.BLOB(16),
    primaryKey: true,
    
    set(value) {
      // Si es una cadena (UUID), lo convertimos a binario
      if (typeof value === 'string') {
        const binaryValue = Buffer.from(value.replace(/-/g, ''), 'hex');
        this.setDataValue('id', binaryValue);  // Almacenamos como binario
      } else if (Buffer.isBuffer(value)) {
        this.setDataValue('id', value);  // Si ya es un buffer, lo asignamos directamente
      } else {
        throw new Error('Invalid UUID format');
      }
    }
  },
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  director: DataTypes.STRING,
  duration: DataTypes.INTEGER,
  poster: DataTypes.STRING,
  rate: DataTypes.FLOAT
}, {
  sequelize,
  modelName: 'Movie',
  tableName: 'movie',
  timestamps: false,
  hooks: {
    beforeCreate: (movie) => {
      if (!movie.id) {
        const generatedUuid = uuidv4();
        movie.id = generatedUuid;  // El setter manejará la conversión a binario
      }
    }
  }
});
