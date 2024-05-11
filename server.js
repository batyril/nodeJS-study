import { connectDB } from './db/mongoose.js';
import express from 'express';
import { addRoutes } from './routes/index.js';

export const app = express();
const port = 3000;

export const appStart = async () => {
  try {
    await connectDB();

    app.use(express.json());

    addRoutes(app);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.error('app error', e.message);
  }
};

appStart();
