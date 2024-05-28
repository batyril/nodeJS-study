import { connectDB } from './db/mongoose.js';
import express from 'express';
import cors from 'cors';
import moviesRouter from './routes/movies/index.js';
import categoriesRouter from './routes/categories/index.js';

export const server = express();
const port = 3000;

const allowedOrigins = [''];

export const appStart = async () => {
  try {
    await connectDB();

    server.use(
      cors({
        origin: allowedOrigins,
      })
    );

    server.use(express.json());

    server.use('/movies', moviesRouter);

    server.use('/categories', categoriesRouter);

    server.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.error('app error', e.message);
  }
};

appStart();
