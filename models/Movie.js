import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: mongoose.ObjectId,
    ref: 'categories',
    required: true,
  },
  year: { type: Number, required: true },
  duration: { type: Number, required: true },
  director: {
    type: mongoose.ObjectId,
    ref: 'director',
    required: true,
  },
  comments: [
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
});

export const Movie = mongoose.model('movies', MovieSchema);
