import * as mongoose from 'mongoose';

export interface EventChat extends mongoose.Document {
    _id: string;
    participants: string[];
    last_message: string;
    name: string;
    created_at: Date;
}

export const EventChatSchema = new mongoose.Schema({
    _id: {
     type: String,
     default: mongoose.Types.ObjectId,
     },
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

export const EventChatModel = mongoose.model<EventChat>('EventChat', EventChatSchema);
