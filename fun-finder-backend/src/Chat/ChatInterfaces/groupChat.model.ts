import * as mongoose from 'mongoose';

export interface GroupChat extends mongoose.Document {
  participants: string[];
  last_message: string;
  name: string;
  created_at: Date;
}

export const GroupChatSchema = new mongoose.Schema({
  participants: {
    type: [String],
    required: true,
  },
  last_message: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

export const GroupChatModel = mongoose.model<GroupChat>('GroupChat', GroupChatSchema);

