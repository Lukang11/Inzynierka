import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password?: string;
  fname: string;
  lname: string;
  hobbies: UserHobbies[];
  hobbiesName: UserHobbies[];
  events: UserEvents[];
  description: string;
  score: number;
  avatar: string;
}

export const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  hobbies: { type: [String], required: true },
  hobbiesName: { type: [String], required: true },
  events: { type: [Object] },
  description: { type: String, default: "Jeszcze nie ustawiono opisu." },
  score: { type: Number, default: 0 },
  avatar: { type: String, default: "https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" }
});

export interface UserEvents {
  event_id: string,
  event_name: string;
  event_description: string;
  event_time_start: string;
  event_time_end: string;
  event_location: string;
  event_photo: string;
}
export interface UserHobbies {
  hobbie_id: string;
  hobbie_value: string;
}