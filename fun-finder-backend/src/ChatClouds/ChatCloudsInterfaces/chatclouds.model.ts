import * as mongoose from 'mongoose';

export interface PrivateChat extends mongoose.Document {
  participants: string[];
  created_at: Date;
  last_message: string;
}

export const PrivateChatSchema = new mongoose.Schema({
  participants: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_message: {
    type: String,
    default: '',
  },
});

export const PrivateChatModel = mongoose.model<PrivateChat>('PrivateChat', PrivateChatSchema);
