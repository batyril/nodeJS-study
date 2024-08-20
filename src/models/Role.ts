import mongoose, { Document, Schema } from 'mongoose';

export type TRoleVariants = Array<'ADMIN' | 'USER' | 'MODERATOR'>;

export interface IRole extends Document {
  name: 'ADMIN' | 'USER' | 'MODERATOR';
}

const RoleSchema = new Schema<IRole>({
  name: { type: String, unique: true, default: 'USER' },
});

export const Role = mongoose.model<IRole>('Role', RoleSchema);
