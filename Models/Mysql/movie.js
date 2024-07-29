// import { pool } from './connectionPostgres.js';
import { connection } from './connectionMysql.js';

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            const lowerGenre = genre.toLowerCase();
            const result = await connection.query(
                `SELECT BIN_TO_UUID(movie.id) id, title, year, director, duration, poster, rate, genre.name as genre FROM movie 
                INNER JOIN movie_genres 
                ON movie.id = movie_genres.movie_id 
                INNER JOIN genre 
                ON movie_genres.genre_id = genre.id 
                WHERE LOWER(genre.name) = ?`,
                [lowerGenre]);
            return result[0];
        } else {
            const result = await connection.query(
                `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
                FROM movie`
            );
            return result[0];
        }
    };

    static async getBiId ({ id }) {
        if (id) {
            const result = await connection.query(
                `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
                FROM movie 
                WHERE BIN_TO_UUID(id) = ?`,
                [id]);
            return result[0];
        } else {
            return null;
        }
    };

    static async create ({ input }) {
        const {
            title,
            year,
            director,
            duration,
            rate,
            poster
        } = input.data;
        const [uuidResult] = await connection.query('SELECT UUID() uuid');
        const [{ uuid }] = uuidResult;

        try {
            await connection.query(
                `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`, [uuid, title, year, director, duration, poster, rate]);
        } catch (err) {
            throw new Error('error creating movie', err);
        }

        const newMovie = await connection.query(`SELECT BIN_TO_UUID(id) id, title, year, duration, poster, rate 
            FROM movie 
            WHERE BIN_TO_UUID(id) = ?`,
        [uuid]);
        return newMovie[0];
    }

    static async edit ({ id, input }) {
        const movie = await connection.query(
            `SELECT BIN_TO_UUID(id) id, title, year, duration, poster, rate 
                FROM movie 
                WHERE BIN_TO_UUID(id) = ?`,
            [id]);
        const aux = movie[0][0];
        const objEdit = {
            ...aux,
            ...input
        };
        console.log(objEdit);
        const {
            title,
            year,
            director,
            duration,
            rate,
            poster
        } = objEdit;
        console.log(title, year, director, duration, rate, poster, id);
        await connection.query(`
                UPDATE movie
                SET title = ?,
                year = ?,
                director = ?,
                duration = ?,
                rate = ?,
                poster = ?
                WHERE BIN_TO_UUID(id) = ?
                `, [title, year, director, duration, rate, poster, id]);
    }

    static async delete ({ id }) {

    }
}
