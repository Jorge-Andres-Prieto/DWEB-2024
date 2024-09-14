import { DataTypes } from 'sequelize';
import { Genre } from './genre.js';
import { Movie } from './movie.js';

// Relación de muchos a muchos entre Movie y Genre
Movie.belongsToMany(Genre, { through: 'movie_genres', foreignKey: 'movie_id', type: DataTypes.BLOB(16) , timestamps: false });
Genre.belongsToMany(Movie, { through: 'movie_genres', foreignKey: 'genre_id', type: DataTypes.INTEGER , timestamps: false });

// Exportar los modelos para usarlos en otros archivos
export { Movie, Genre };
