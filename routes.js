const { Movie, Category } = require('./models');
const express = require('express');
const { app } = require('./server');

const ROUTS = {
  BASE: '/',
  MOVIES: '/movies',
  CATEGORIES: '/categories',
};

app.use(express.json());

app.get(ROUTS.BASE, (request, response) => {
  response.send('отдадим список фильмов ');
});

app.post(ROUTS.MOVIES, async (request, response) => {
  try {
    const { title, year, rating } = request.body;
    await Movie.create({ title, year, rating });
    return response.status(201).send('movies created');
  } catch (e) {
    return response.status(400).send(e.message);
  }
});

app.post(ROUTS.CATEGORIES, async (request, response) => {
  try {
    const { title } = request.body;
    await Category.create({ title });
    return response.status(201).send('categories created');
  } catch (e) {
    return response.status(400).send(e.message);
  }
});

app.put(ROUTS.MOVIES, (request, response) => {
  response.send('изменим фильм');
});

app.delete(ROUTS.MOVIES, (request, response) => {
  response.send('удалим фильм');
});
