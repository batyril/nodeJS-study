import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  category: {
    type: mongoose.ObjectId,
    ref: 'categories',
  },
  year: Number,
  duration: String,
  director: String,
});

export const Movie = mongoose.model('movies', MovieSchema);
