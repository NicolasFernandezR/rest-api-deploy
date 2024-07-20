import express, { json } from 'express';
// import moviesJson from './movies.json' with {type: 'json'}; // forma de hacerlo experimental
import { moviesRouter } from './Routes/movies.js';
import { corsMiddleware } from './Middlewares/cors.js';

const app = express();

app.use(json()); // tratamiento de Json
app.disable('x-powered-by');

app.use(corsMiddleware());

app.use('/movies', moviesRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`escuchando del puerto http://localhost:${PORT}`);
});
