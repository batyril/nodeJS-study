import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categories/index.js';
import checkIds from '../middlewares/checkIds.js';
import { findCategoryByTitle } from '../services/category.js';
import { categoryChain } from '../validators/index.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:id', checkIds(['id']), getCategory);

categoriesRouter.post(
  '/',
  categoryChain().custom(async (value) => {
    const category = await findCategoryByTitle(value);
    if (category) {
      throw new Error('category already in use');
    }
  }),
  addCategory
);

categoriesRouter.put('/:id', checkIds(['id']), categoryChain(), updateCategory);

categoriesRouter.delete('/:id', checkIds(['id']), deleteCategory);

export default categoriesRouter;
