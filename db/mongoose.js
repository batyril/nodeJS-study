import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
