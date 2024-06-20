import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categories/index.js';
import verifyRequiredFields from '../middlewares/verifyRequiredFields.js';
import checkIds from '../middlewares/checkIds.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:id', checkIds(['id']), getCategory);

categoriesRouter.post('/', verifyRequiredFields(['title']), addCategory);

categoriesRouter.put(
  '/:id',
  checkIds(['id']),
  verifyRequiredFields(['title']),
  updateCategory
);

categoriesRouter.delete('/:id', checkIds(['id']), deleteCategory);

export default categoriesRouter;
