//для всех юзеров добавьте поле favotites (и в модели его не забудьте),
// пусть значение по умолчанию будет пустым массивом
export const up = async (db, client) => {
  const collection = db.collection('users');
  const movies = await collection.find({}).toArray();

  for (const movie of movies) {
    if (!movie.hasOwnProperty('favorites') || movie.favorites.length === 0) {
      movie.favotites = [];
      await collection.updateOne(
        { _id: movie._id },
        { $set: { favorites: [] } }
      );
    }
  }
};

export const down = async (db, client) => {
  const collection = db.collection('users');
  const users = await collection.find({}).toArray();

  for (const user of users) {
    await collection.updateOne(
      { _id: user._id },
      { $unset: { favorites: '' } }
    );
  }
};
