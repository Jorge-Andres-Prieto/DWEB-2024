import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

class Movie extends Model {}

Movie.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    director: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: false
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