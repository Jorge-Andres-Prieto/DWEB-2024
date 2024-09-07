import { Model, DataTypes } from "sequelize";
import Movie from "./movie.js";
import sequelize from "./sequelize.js";

class Genre extends Model {}

Genre.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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