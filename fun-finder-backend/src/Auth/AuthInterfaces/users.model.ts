import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  fname: string;
  lname: string;
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
});
