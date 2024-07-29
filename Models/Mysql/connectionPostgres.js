import pg from 'pg';

// Configura la conexión con tu base de datos
export const pool = new pg.Pool({
    user: 'postgres', // Tu nombre de usuario de PostgreSQL
    host: 'localhost', // El host donde está tu base de datos
    database: 'moviesdb', // El nombre de la base de datos
    password: 'admin', // Tu contraseña de PostgreSQL
    port: 5432 // El puerto por defecto de PostgreSQL
});
