import mongoose from 'mongoose';

const CategoriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export const Category = mongoose.model('categories', CategoriesSchema);
