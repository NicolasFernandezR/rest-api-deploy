import { Router } from 'express';

import { movieController } from '../Controllers/movies.js';
// import moviesJson from './movies.json' with {type: 'json'}; // forma de hacerlo experimental

export const moviesRouter = Router();

moviesRouter.get('/', movieController.getAll);
moviesRouter.post('/', movieController.create);

moviesRouter.get('/:id', movieController.getBiId);
moviesRouter.patch('/:id', movieController.edit);
moviesRouter.delete('/:id', movieController.delete);
