import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/main';

export const connectDB = async () => {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};
