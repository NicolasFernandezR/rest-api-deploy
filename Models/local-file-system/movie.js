import { readJson } from '../utils.js';
import { randomUUID } from 'node:crypto';

const moviesJson = readJson(('./movies.json'));

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            return moviesJson.filter(movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()));
        };
        return moviesJson;
    };

    static async getBiId ({ id }) {
        const movie = moviesJson.find(movie => movie.id === id);
        if (movie) return movie;
    };

    static async create ({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input
        };
        moviesJson.push(newMovie);
        return newMovie;
    }

    static async edit ({ id, input }) {
        const movieIndex = moviesJson.findIndex(movie => movie.id === id);
        if (movieIndex === -1) return false;
        const updateMovie = {
            ...moviesJson[movieIndex],
            ...input
        };
        moviesJson[movieIndex] = updateMovie;
        return true;
    }

    static async delete ({ id }) {
        const movieIndex = moviesJson.findIndex(movie => movie.id === id);
        if (movieIndex === -1) return false;
        moviesJson.splice(movieIndex, 1);
        return true;
    }
}
