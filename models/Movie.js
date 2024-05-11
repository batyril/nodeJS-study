import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: String,
  category: Number,
  year: Number,
  duration: String,
  director: String,
});

export const Movie = mongoose.model('movies', MovieSchema);
