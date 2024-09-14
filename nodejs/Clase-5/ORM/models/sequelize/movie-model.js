import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Movie, Genre } from './index.js'

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const foundGenre = await Genre.findOne({
        where: {
          name: {
            [Op.like]: genre.toLowerCase() // Usamos LIKE para una búsqueda insensible a mayúsculas en MySQL
          }
        }
      });

      if (!foundGenre) return [];
  
      const movies = await Movie.findAll({
        include: {
          model: Genre,
          where: { id: foundGenre.id },
          through: { attributes: [] } 
        }
      });
  
      return movies.map(movie => ({
        ...movie.toJSON(),
        id: movie.id.toString('hex').match(/.{1,8}/g).join('-')  // Convertimos el buffer a UUID
      }));
    }

    const movies = await Movie.findAll();
    return movies.map(movie => ({
      ...movie.toJSON(),
      id: movie.id.toString('hex').match(/.{1,8}/g).join('-')  // Convertimos el buffer a UUID
    }));
  }

  static async getById({ id }) {
    console.log('UUID received:', id);
  
    // Convertimos el UUID recibido a binario
    const convertedId = Buffer.from(id.replace(/-/g, ''), 'hex');
    console.log('Converted to Buffer:', convertedId);
  
    // Realizamos la búsqueda en la base de datos usando el ID en formato binario
    const movie = await Movie.findByPk(convertedId, {
      include: {
        model: Genre,
        through: { attributes: [] }
      }
    });
  
    if (!movie) {
      console.log('Movie not found with ID:', convertedId);
      return null;
    }
  
    // Convertimos el buffer de id a UUID antes de devolver el resultado
    const movieJSON = movie.toJSON();
    movieJSON.id = bufferToUUID(movie.id);  // Convertimos el buffer a UUID antes de devolverlo
  
    console.log('Movie found:', movieJSON);
    return movieJSON;
  }
  

  static async create({ input }) {
    const { genre: genreInput, ...movieData } = input;
    const newMovie = await Movie.create(movieData);

    const movieIdBuffer = newMovie.id;
    console.log('Movie ID (Buffer):', movieIdBuffer);
    console.log('Movie ID Length:', movieIdBuffer.length, 'bytes');

    if (genreInput) {
      const genres = await Genre.findAll({
        where: {
          name: {
            [Op.or]: genreInput.map(g => ({ [Op.like]: g.toLowerCase() })) // Comparación insensible a mayúsculas
          }
        }
      });
      for (const genre of genres) {
        await newMovie.addGenre(genre);  // Usar el método adecuado para asociar géneros sin alterar movie_id
      }
    }

    return newMovie;
  }

  static async delete({ id }) {
    const movie = await Movie.findByPk(id);
    if (!movie) return false;
    await movie.destroy();
    return true;
  }

  static async update({ id, input }) {
    const movie = await Movie.findByPk(id);
    if (!movie) return null;
    await movie.update(input);
    return movie;
  }
}
