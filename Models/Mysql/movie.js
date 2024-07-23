import { pool } from './connection.js';

export class MovieModel {
    static async getAll ({ genre }) {
        const result = await pool.query('SELECT * FROM movie;');
        return result.rows;
    };

    static async getBiId ({ id }) {

    };

    static async create ({ input }) {

    }

    static async edit ({ id, input }) {

    }

    static async delete ({ id }) {

    }
}
