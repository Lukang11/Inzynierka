import * as mongoose from 'mongoose';

export interface EventChat extends mongoose.Document {
    participants: string[];
    last_message: string;
    name: string;
    avatar: string;
    created_at: Date;
    event_id: string;
}

export const EventChatSchema = new mongoose.Schema({
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
     avatar:{
     type: String,
     default: '',
     },
     created_at: {
     type: Date,
     default: Date.now,
    },
     event_id: {
     type: String,
     default: ''
    }
});

export const EventChatModel = mongoose.model<EventChat>('EventChat', EventChatSchema);

