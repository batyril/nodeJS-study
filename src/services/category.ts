import { Category, ICategories } from '../models/Category.js';

export const findCategories = async (): Promise<ICategories[] | null> => {
  return Category.find();
};

export const createCategory = async ({ title }: ICategories) => {
  return Category.create({ title });
};

export const findByIdAndDelete = async (id: string) => {
  return Category.findByIdAndDelete(id, {
    new: true,
  });
};

export const findCategory = async (id: string): Promise<ICategories | null> => {
  return Category.findById(id);
};

export const updateCategoryById = async (
  id: string,
  { title }: ICategories
): Promise<ICategories | null> => {
  return Category.findByIdAndUpdate(id, { title }, { new: true });
};
