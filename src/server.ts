import { connectDB } from './db/mongoose.js';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/movies.js';
import categoriesRouter from './routes/categories.js';
import directorRouter from './routes/director.js';

export const server = express();
const port = process.env.PORT;

const allowedOrigins = [''];
export const appStart = async () => {
  try {
    await connectDB();

    server.use(
      cors({
        origin: allowedOrigins,
      })
    );

    // TODO: проверка на не валидный json
    server.use(express.json());

    server.use('/movies', moviesRouter);

    server.use('/categories', categoriesRouter);

    server.use('/directors', directorRouter);

    server.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else if (typeof e === 'string') {
      console.log(e);
    }
  }
};

appStart();
