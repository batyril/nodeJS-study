import { Router } from 'express';
import { getDirector } from './getDirector.js';
import { addDirector } from './addDirector.js';
import { deleteDirector } from './deleteDirector.js';
import { updateDirector } from './updateDirector.js';

const directorRouter = Router();

directorRouter.get('/:id', getDirector);

directorRouter.post('/', addDirector);

directorRouter.put('/:id', updateDirector);

directorRouter.delete('/:id', deleteDirector);

export default directorRouter;
