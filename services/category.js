import { Category } from '../models/Category.js';
// TODO: вынести в отдельные файлы

export const findCategories = async () => {
  return Category.find();
};

export const createCategory = async ({ title }) => {
  if (title) {
    return Category.create({ title });
  }
  throw new Error('Нет полей для обновления');
};

export const findByIdAndDelete = async (id) => {
  return Category.findByIdAndDelete(id, {
    new: true,
  });
};

export const findCategory = async (id) => {
  const category = await Category.findById(id);
  if (category) {
    return category;
  }
  return 'Категория с таким id не найдена';
};

export const updateCategoryById = async (id, body) => {
  const title = body.title;
  if (title) {
    return Category.findByIdAndUpdate(id, { title }, { new: true });
  } else {
    throw new Error('Нет полей для обновления');
  }
};
