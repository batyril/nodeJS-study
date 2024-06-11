import { Router } from 'express';
import { addCategory } from './addCategory.js';
import { getCategories } from './getCategories.js';
import { deleteCategory } from './deleteCategory.js';
import { updateCategory } from './updateCategory.js';
import { getCategory } from './getCategory.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

categoriesRouter.get('/:id', getCategory);

categoriesRouter.post('/', addCategory);

categoriesRouter.put('/:id', updateCategory);

categoriesRouter.delete('/:id', deleteCategory);

export default categoriesRouter;
