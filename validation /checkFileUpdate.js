const getUpdatedFields = (body = {}) => {
  const fieldsToUpdate = {};

  if (Object.prototype.hasOwnProperty.call(body, 'title')) {
    fieldsToUpdate.title = body.title;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'category')) {
    fieldsToUpdate.category = body.category;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'year')) {
    fieldsToUpdate.year = body.year;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'duration')) {
    fieldsToUpdate.duration = body.duration;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'director')) {
    fieldsToUpdate.director = body.director;
  }

  return fieldsToUpdate;
};

export default getUpdatedFields;
