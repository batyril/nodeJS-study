import { Router } from 'express';
import { addCategory } from './addCategory.js';
import { getCategory } from './getCategory.js';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategory);

categoriesRouter.post('/:id', addCategory);

export default categoriesRouter;
