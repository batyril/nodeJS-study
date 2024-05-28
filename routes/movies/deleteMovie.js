export const deleteMovie = async (request, response) => {
  try {
    response.send(`удалить фильм ${request.params.id}`);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
