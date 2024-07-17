const express = require('express');
const moviesJson = require('./movies.json');
const crypto = require('node:crypto');
const { validateMovie, validatePartialMovie } = require('./Schema/movie');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:3000'
        ];

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    }
}));
app.use(express.json()); // tratamiento de Json
app.disable('x-powered-by');

app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { genre } = req.query;
    if (genre) {
        const filtermovies = moviesJson.filter(movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()));
        return res.json(filtermovies);
    };
    res.json(moviesJson);
});
// GET

app.get('/movies/:id', (req, res) => { // path-to-regexp
    const { id } = req.params;
    const movie = moviesJson.find(movie => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({ mesagge: 'movie not found' });
});

// POST

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (result.error) {
        console.log('entro');
        return res.status(422).json({ error: JSON.parse(result.error.message) });
    };

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };
    moviesJson.push(newMovie);
    res.status(201).json(newMovie);
});

// PATCH

app.patch('/movies/:id', (req, res) => { // path-to-regexp
    const { id } = req.params;
    const result = validatePartialMovie(req.body);
    if (!result.success) return res.status(422).json({ error: JSON.parse(result.error.message) });
    const movieIndex = moviesJson.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return res.status(404).json({ massage: 'Movie not found' });

    const updateMovie = {
        ...moviesJson[movieIndex],
        ...result.data
    };

    moviesJson[movieIndex] = updateMovie;

    res.json(updateMovie);
});

// delete

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = moviesJson.findIndex(movie => movie.id === id);
    if (movieIndex === -1) return res.status(404).json({ massage: 'Movie not found' });
    moviesJson.splice(movieIndex, 1);
    return res.json({ massage: 'movie deleted' });
});
// dar las opciones de put pach y delete a servidores externos

// app.options('/movies/:id', (req, res) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.send(200);
// });
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`escuchando del puerto http://localhost:${PORT}`);
});
