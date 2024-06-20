import { Router } from 'express';
import {
  addDirector,
  deleteDirector,
  getDirector,
  updateDirector,
} from '../controllers/director/index.js';
import verifyRequiredFields from '../middlewares/verifyRequiredFields.js';
import checkIds from '../middlewares/checkIds.js';

const directorRouter = Router();

directorRouter.get('/:id', checkIds(['id']), getDirector);

directorRouter.post(
  '/',
  verifyRequiredFields(['birthDate', 'name']),
  addDirector
);

directorRouter.put(
  '/:id',
  checkIds(['id']),
  verifyRequiredFields(['birthDate', 'name']),
  updateDirector
);

directorRouter.delete('/:id', checkIds(['id']), deleteDirector);

export default directorRouter;
