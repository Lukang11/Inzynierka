import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
});

export class User {
    constructor(
      public email: string,
      public password: string,
      public fname: string,
      public lname: string,
    ) {}
  }

export interface User{
  email: string;
  password: string;
  fname: string;
  lname: string;
}