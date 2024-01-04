import mongoose, { Schema, Document } from 'mongoose';

export interface PlacesTags extends Document {
  name: string;
  data: string[];
}
export const PlacesTagsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: { type: [String], required: true },
});
export const PlacesTagsModel = mongoose.model<PlacesTags>(
  'api_places_tags',
  PlacesTagsSchema,
);
