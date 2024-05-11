import mongoose from 'mongoose';

const CategoriesSchema = new mongoose.Schema({
  title: String,
});

export const Category = mongoose.model('categories', CategoriesSchema);
