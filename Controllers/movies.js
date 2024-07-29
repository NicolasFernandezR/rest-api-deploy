import { MovieModel } from '../Models/Mysql/movie.js';
import { validateMovie, validatePartialMovie } from '../Schema/movie.js';
import { isArrayEmpty } from './utils.js';

export class movieController {
    static async getAll (req, res) {
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre });
        if (!isArrayEmpty(movies)) return res.json(movies);
        res.status(404).json({ mesagge: 'data is empty' });
    }

    static async getBiId (req, res) { // path-to-regexp
        const { id } = req.params;
        const movie = await MovieModel.getBiId({ id });
        if (!isArrayEmpty(movie)) return res.json(movie);
        res.status(404).json({ mesagge: 'movie not found' });
    }

    static async create (req, res) {
        const result = validateMovie(req.body);
        if (result.error) {
            return res.status(422).json({ error: JSON.parse(result.error.message) });
        };
        const newMovie = await MovieModel.create({ input: result });
        res.status(201).json(newMovie);
    }

    static async edit (req, res) { // path-to-regexp
        const { id } = req.params;
        const result = validatePartialMovie(req.body);
        if (!result.success) return res.status(422).json({ error: JSON.parse(result.error.message) });
        const updateMovie = await MovieModel.edit({ id, input: result.data });
        if (updateMovie) return res.json(updateMovie);
        return res.status(404).json({ message: 'Movie not found' });
    }

    static async delete (req, res) {
        const { id } = req.params;
        const deleteMovie = await MovieModel.delete({ id });
        if (deleteMovie) return res.json({ message: 'movie deleted' });
        return res.status(404).json({ message: 'Movie not found' });
    }
}
