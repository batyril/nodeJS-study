export const getCategory = async (request, response) => {
  try {
    response.send('отдадим список категорий ');
  } catch (e) {
    return response.status(500).send(e.message);
  }
};
