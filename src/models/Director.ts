import mongoose, { Document, Schema } from 'mongoose';

export interface IDirector extends Document {
  name: string;
  birthDate: string;
}

const DirectorSchema = new Schema<IDirector>({
  name: {
    type: String,
    required: true,
  },
  birthDate: { type: String, required: true },
});

export const Director = mongoose.model<IDirector>('Director', DirectorSchema);
