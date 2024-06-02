const getUpdatedFields = (body = {}) => {
  const fieldsToUpdate = {};

  if (body.hasOwnProperty('title')) {
    fieldsToUpdate.title = body.title;
  }

  if (body.hasOwnProperty('category')) {
    fieldsToUpdate.category = body.category;
  }

  if (body.hasOwnProperty('year')) {
    fieldsToUpdate.year = body.year;
  }

  if (body.hasOwnProperty('duration')) {
    fieldsToUpdate.duration = body.duration;
  }

  if (body.hasOwnProperty('director')) {
    fieldsToUpdate.director = body.director;
  }

  return fieldsToUpdate;
};

export default getUpdatedFields;
