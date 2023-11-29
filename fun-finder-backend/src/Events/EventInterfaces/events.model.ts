import mongoose, { Schema, Document, model } from 'mongoose';

export const EventSchema = new mongoose.Schema({
  name: { type: String, require: true },
  location: { type: String, require: true },
  relatedHobbies: {
    type: [String], // Definicja, że relatedHobbies to tablica stringów
    default: [], // Domyślna pusta tablica (możesz dostosować do swoich potrzeb)
    require: true,
  },
});

export class Event {
  constructor(
    public name: string,
    public location: string,
    public relatedHobbies: string[],
  ) {}
}
export interface Event {
  name: string;
  location: string;
  relatedHobbies: string[];
}
