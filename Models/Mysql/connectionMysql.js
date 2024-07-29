import mysql from 'mysql2/promise';

const config = {
    user: 'root', // Tu nombre de usuario de PostgreSQL
    host: '127.0.0.1', // El host donde está tu base de datos
    database: 'moviesdb', // El nombre de la base de datos
    password: 'admin', // Tu contraseña de PostgreSQL
    port: 3306 // El puerto por defecto de PostgreSQL
};

export const connection = await mysql.createConnection(config);
