import * as mongoose from 'mongoose';

export interface EventBattlerRooms extends mongoose.Document {
  description: string;
  participants: number;
  location: string;
  date: Date
}

export const EventBattlerRoomsSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  participants: {
    type: Number,
    required: true,
  },
  location: {
    type : String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<EventBattlerRooms>('Event_Battler_Rooms', EventBattlerRoomsSchema);
