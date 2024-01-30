import mongoose, { Schema, Document, model } from 'mongoose';

export interface GeoLocation {
  latitude: string;
  longitude: string;
}

export const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  geoLocation: { type: Schema.Types.Mixed, required: false }, // Use Mixed type for custom types
  eventStart: { type: Date, required: true },
  eventEnd: { type: Date, required: false },
  eventDescription: { type: String },
  eventParticipantsEmail: { type: [String] },
  maxEventParticipants: { type: Number, required: true },
  relatedHobbies: {
    type: [String],
    default: [],
    required: true,
  },
  eventPhoto: { type: String, required: true },
});

export class Events {
  constructor(
    public name: string,
    public location: string,
    public relatedHobbies: string[],
    public geoLocation: GeoLocation,
    public eventStart: Date,
    public eventEnd: Date,
    public eventDescription: string,
    public eventParticipantsEmail: string[],
    public maxEventParticipants: number,
    public eventPhoto: string,
  ) {}
}

export interface Events {
  eventId: string;
  name: string;
  location: string;
  geoLocation: GeoLocation;
  eventStart: Date;
  eventEnd: Date;
  eventDescription: string;
  eventParticipants: string[];
  relatedHobbies: string[];
  eventPhoto: string;
}
