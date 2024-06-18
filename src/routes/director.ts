import { Router } from 'express';
import {
  addDirector,
  deleteDirector,
  getDirector,
  updateDirector,
} from '../controllers/director/index.js';

const directorRouter = Router();

directorRouter.get('/:id', getDirector);

directorRouter.post('/', addDirector);

directorRouter.put('/:id', updateDirector);

directorRouter.delete('/:id', deleteDirector);

export default directorRouter;
