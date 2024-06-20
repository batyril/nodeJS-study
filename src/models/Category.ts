import mongoose, { Document, Schema } from 'mongoose';

export interface ICategories extends Document {
  title: string;
}

const CategoriesSchema = new Schema<ICategories>({
  title: { type: String, required: true },
});

export const Category = mongoose.model<ICategories>(
  'Category',
  CategoriesSchema
);
