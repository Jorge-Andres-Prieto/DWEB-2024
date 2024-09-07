import { DataTypes, Model } from 'sequelize';
import sequelize from './sequelize.js';
import Movie from './movie.js';

class Genre extends Model {}

Genre.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Genre',
  tableName: 'genre',
  timestamps: false
});

Movie.belongsToMany(Genre, { through: 'movie_genres', foreignKey: 'movie_id', timestamps: false });
Genre.belongsToMany(Movie, { through: 'movie_genres', foreignKey: 'genre_id', timestamps: false });

export default Genre;
