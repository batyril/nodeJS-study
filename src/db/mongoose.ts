import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoConnection = process.env.MONGO_CONNECTION;
  if (!mongoConnection) {
    throw new Error('MONGO_CONNECTION is not defined in environment variables');
  }
  try {
    await mongoose.connect(mongoConnection);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};
