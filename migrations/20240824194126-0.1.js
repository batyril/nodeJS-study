export const up = async (db, client) => {
  const collection = db.collection('movies');
  const movies = await collection.find({}).toArray();

  const updatedMovies = movies.map((movie) => {
    movie.description = movie.title;
    return movie;
  });

  for (const movie of updatedMovies) {
    await collection.updateOne({ _id: movie._id }, { $set: movie });
  }
};

export const down = async (db, client) => {
  const collection = db.collection('movies');
  const movies = await collection.find({}).toArray();

  for (const movie of movies) {
    await collection.updateOne(
      { _id: movie._id },
      { $unset: { description: '' } }
    );
  }
};
