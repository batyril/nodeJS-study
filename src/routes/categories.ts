import { Router } from 'express';
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/categories/index.js';
import checkIds from '../middlewares/checkIds.js';
import { findCategoryByTitle } from '../services/category.js';
import { categoryChain, categoryFiltersChain } from '../validators/index.js';
import checkValidationErrors from '../middlewares/checkValidationErrors.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkRoles from '../middlewares/checkRoles.js';

const categoriesRouter = Router();

categoriesRouter.get(
  '/',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  categoryFiltersChain(),
  checkValidationErrors(),
  getCategories
);

categoriesRouter.post(
  '/',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  categoryChain().custom(async (value) => {
    const category = await findCategoryByTitle(value);
    if (category) {
      throw new Error('category already in use');
    }
  }),
  checkValidationErrors(),
  addCategory
);

categoriesRouter.put(
  '/:id',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  checkIds(['id']),
  categoryChain(),
  checkValidationErrors(),
  updateCategory
);

categoriesRouter.delete(
  '/:id',
  checkAuth(),
  checkRoles(['ADMIN', 'MODERATOR']),
  checkIds(['id']),
  deleteCategory
);

export default categoriesRouter;
