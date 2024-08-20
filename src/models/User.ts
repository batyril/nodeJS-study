import mongoose, { Document, Schema } from 'mongoose';
import { TRoleVariants } from './Role.js';

export interface IUser extends Document {
  email: string;
  username: string;
  roles: TRoleVariants;
  password?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  username: { type: String },
  roles: { type: [String], ref: 'Role' },
  password: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
