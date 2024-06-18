import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IComment {
  name: string;
  comment: string;
}

export interface IMovie extends Document {
  title: string;
  category: ObjectId;
  year: number;
  duration: number;
  director: ObjectId;
  comments: mongoose.Types.DocumentArray<IComment>;
}

const CommentSchema = new Schema<IComment>({
  name: { type: String, required: true },
  comment: { type: String, required: true },
});

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  year: { type: Number, required: true },
  duration: { type: Number, required: true },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'director',
    required: true,
  },
  comments: [CommentSchema],
});

export const Movie = mongoose.model<IMovie>('movies', MovieSchema);
