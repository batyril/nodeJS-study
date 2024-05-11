export const getMovies = async (request, response) => {
  try {
    response.send('отдадим список фильмов ');
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
