import mongoose from 'mongoose';

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDate: { type: String, required: true },
});

export const Director = mongoose.model('director', DirectorSchema);
