import { Category } from '../models/Category.js';

export const findCategories = async () => {
  return Category.find();
};

export const createCategory = async ({ title }) => {
  // TODO: добавить валидацию для значений
  return Category.create({ title });
};
