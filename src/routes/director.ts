import { Router } from 'express';
import {
  addDirector,
  deleteDirector,
  getDirector,
  updateDirector,
} from '../controllers/director/index.js';
import checkIds from '../middlewares/checkIds.js';
import { directorChain } from '../validators/index.js';
import checkValidationErrors from '../middlewares/checkValidationErrors.js';

const directorRouter = Router();

directorRouter.get('/:id', checkIds(['id']), getDirector);

directorRouter.post('/', directorChain(), checkValidationErrors(), addDirector);

directorRouter.put(
  '/:id',
  checkIds(['id']),
  directorChain(),
  checkValidationErrors(),
  updateDirector
);

directorRouter.delete('/:id', checkIds(['id']), deleteDirector);

export default directorRouter;
