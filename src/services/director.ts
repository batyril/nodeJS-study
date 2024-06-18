import { Director, IDirector } from '../models/Director.js';
// TODO: проверки должны быть на уровне мангуста

export const findDirector = async (id: string): Promise<IDirector | null> => {
  return Director.findById(id);
};

export const createDirector = async ({ name, birthDate }: IDirector) => {
  return Director.create({ name, birthDate });
};

export const findByIdAndDeleteDirector = async (
  id: string
): Promise<IDirector | null> => {
  return Director.findByIdAndDelete(id, {
    new: true,
  });
};

export const updateDirectorById = async (
  id: string,
  fieldsToUpdate: Partial<IDirector>
): Promise<IDirector | null> => {
  return Director.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
};
