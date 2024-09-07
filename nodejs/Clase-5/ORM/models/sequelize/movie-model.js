import Movie from './movie.js';
import Genre from './genre.js';

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const movies = await Movie.findAll({
        include: [{
          model: Genre,
          where: { name: genre.toLowerCase() }
        }]
      });
      return movies;
    }

    return await Movie.findAll();
  }

  static async getById({ id }) {
    const movie = await Movie.findByPk(id, {
      include: [Genre],
    });
    return movie || null;
  }

  static async create({ input }) {
    const { genre: genreInput, ...movieData } = input;
    const newMovie = await Movie.create(movieData);

    if (genreInput) {
      const genres = await Genre.findAll({
        where: { name: genreInput.map(g => g.toLowerCase()) }
      });
      await newMovie.setGenres(genres);
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
