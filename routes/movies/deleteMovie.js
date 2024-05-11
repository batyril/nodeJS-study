export const deleteMovie = async (request, response) => {
  try {
    response.send('удалим фильм');
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
