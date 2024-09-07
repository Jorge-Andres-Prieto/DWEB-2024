import { col, fn } from "sequelize";
import Movie from "./movie.js";
import Genre from "./genre.js";

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
          const movies = await Movie.findAll({
            attributes: [
              [fn('BIN_TO_UUID', col('Movie.id')), 'id'], // Convierte el BINARY a UUID
              'title', 'year', 'director', 'duration', 'poster', 'rate'
            ],
            include: [{
              model: Genre,
              where: { name: genre.toLowerCase() }
            }]
          });
          return movies;
        }
    
        const movies = await Movie.findAll();
    
        return movies;
      }

    static async getById ({ id }) {
        
    }

    static async create ({ input }) {
        
    }

    static async delete ({ id }) {

    }

    static async update ({ id, input }) {
        
    }

}