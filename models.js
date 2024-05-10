const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  category: Number,
  year: Number,
  duration: String,
  director: String,
});

const CategoriesSchema = new mongoose.Schema({
  title: String,
});

const Category = mongoose.model('categories', CategoriesSchema);

const Movie = mongoose.model('movies', MovieSchema);

module.exports = {
  Category,
  Movie,
};
