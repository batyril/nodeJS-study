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
import checkAuth from '../middlewares/checkAuth.js';
import checkRoles from '../middlewares/checkRoles.js';

const directorRouter = Router();

directorRouter.get(
  '/:id',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  checkIds(['id']),
  getDirector
);

directorRouter.post(
  '/',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  directorChain(),
  checkValidationErrors(),
  addDirector
);

directorRouter.put(
  '/:id',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  checkIds(['id']),
  directorChain(),
  checkValidationErrors(),
  updateDirector
);

directorRouter.delete('/:id', checkIds(['id']), deleteDirector);

export default directorRouter;
