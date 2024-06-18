import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categories/index.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:id', getCategory);

categoriesRouter.post('/', addCategory);

categoriesRouter.put('/:id', updateCategory);

categoriesRouter.delete('/:id', deleteCategory);

export default categoriesRouter;
