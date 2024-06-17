import { Director } from '../models/Director.js';
// TODO: вынести в отдельные файлы
// TODO: проверки должны быть на уровне мангуста

export const findDirector = async (id) => {
  const director = await Director.findById(id);
  if (!director) {
    throw new Error('Режиссер с таким id не найден');
  }
  return director;
};

export const createDirector = async ({ name, birthDate }) => {
  return Director.create({ name, birthDate });
};

export const findByIdAndDeleteDirector = async (id) => {
  return Director.findByIdAndDelete(id, {
    new: true,
  });
};

export const updateDirectorById = async (id, body) => {
  const fieldsToUpdate = {};

  if (Object.prototype.hasOwnProperty.call(body, 'name')) {
    fieldsToUpdate.name = body.name;
  }

  if (Object.prototype.hasOwnProperty.call(body, 'birthDate')) {
    fieldsToUpdate.birthDate = body.birthDate;
  }
  if (body.name || body.birthDate) {
    return Director.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
  } else {
    throw new Error('Нет полей для обновления');
  }
};
