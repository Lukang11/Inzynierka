import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DisplayName {
  @Prop({ type: String, required: true })
  text: string;

  @Prop({ type: String, required: false })
  languageCode: string;
}

@Schema()
export class Place extends Document {
  @Prop({ type: [String], required: true })
  types: string[];

  @Prop({ type: String, required: true })
  formattedAddress: string;

  @Prop({ type: String, required: false })
  websiteUri: string;

  @Prop({ type: DisplayName, required: true })
  displayName: DisplayName;

  @Prop({ type: String, required: false })
  iconMaskBaseUri: string;
}

export const PlaceSchema = SchemaFactory.createForClass(Place);
