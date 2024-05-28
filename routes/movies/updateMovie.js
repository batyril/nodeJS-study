export const updateMovie = async (request, response) => {
  try {
    response.send(`изменили фильм ${request.params.id}`);
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
