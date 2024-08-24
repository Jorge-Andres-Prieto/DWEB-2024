const express = require('express');

const crypto = require('node:crypto');

const movies = require('./movies.json');
const { validateMovie, validatePartialMovie } = require('./schemas/movies');

const app = express();
app.use(express.json());

app.disable('x-powered-by');

//Middlewares

// app.get('/', (req, res) => res.json({message: 'Aprendamos juntos'}));

app.get('/movies', (req, res) => {
    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({message: 'No existe esa película'});
})

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
        return res.status(422).json({error: JSON.parse(result.error.message)})
    }
    const newMovie = {
        id: crypto.randomUUID(),
        ...result
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body);
    
    if (!result.success) {
        return res.status(422).json({error: JSON.parse(result.error.message)})
    }

    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({message: 'No existe esa película'}); 
    }

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updatedMovie;

    return res.json(updatedMovie)

});

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({message: 'No existe esa película'}); 
    }

    movies.splice(movieIndex, 1);

    return res.json({ message: 'La borré papu'});
})

app.listen(1234, () => {
    console.log(`server listening on port http://localhost:1234`)
});