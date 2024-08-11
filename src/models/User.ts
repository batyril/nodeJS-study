import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  roles: string[];
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  username: { type: String },
  roles: { type: [String] },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
