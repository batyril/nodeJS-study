import { Category, ICategories } from '../models/Category.js';

export const findCategories = async (
  filters: Partial<ICategories>,
  sortField: string,
  sortOrder: 'asc' | 'desc'
): Promise<ICategories[] | null> => {
  const query = Category.find();

  if (filters.id) {
    query.where('_id', filters.id);
  }

  if (filters.title) {
    query.where('_id', filters.title);
  }

  if (sortField) {
    const sort = { [sortField]: sortOrder };
    query.sort(sort);
  }
  return query.exec();
};

export const createCategory = async ({ title }: ICategories) => {
  return Category.create({ title });
};

export const findByIdAndDelete = async (id: string) => {
  return Category.findByIdAndDelete(id, {
    new: true,
  });
};

export const findCategoryById = async (
  id: string
): Promise<ICategories | null> => {
  return Category.findById(id);
};

export const findCategoryByTitle = async (
  title: string
): Promise<ICategories | null> => {
  return Category.findOne({ title });
};

export const updateCategoryById = async (
  id: string,
  { title }: ICategories
): Promise<ICategories | null> => {
  return Category.findByIdAndUpdate(id, { title }, { new: true });
};
