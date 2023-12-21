import mongoose, { Schema, model, Document } from 'mongoose';

export interface Message extends mongoose.Document {
  conversation_id: string;
  sender_id: string;
  text: string;
  date: Date;
}

export const MessageSchema = new mongoose.Schema(
{   
    conversation_id: {
    type: String,
    required: true,
 },
    sender_id: {
    type: String,
    required: true,
 },
    text: {
    type: String,
    required: true,
 },
    date: {
    type: Date,
    default: '1999-12-31T23:00:00.000Z',
 },
  },
  { timestamps: true }
);

export default model<Message>('Messages', MessageSchema);
