// events.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Events') private readonly eventsModel: Model<Event>,
  ) {}

  async insertEvent(name: string, location: string, relatedHobbies: string[]) {
    const newEvent = new this.eventsModel({
      name,
      location,
      relatedHobbies,
    });
    const result = await newEvent.save();
    console.log('Incoming POST request with this body :\n');
    console.log(result);
  }
  async getAllEvents() {
    try {
      const allEvents = await this.eventsModel.find().exec();
      console.log(allEvents);
      return allEvents;
    } catch (error) {
      console.error('Error fetching all events:', error);
      throw error;
    }
  }
  async getEventsByLocation(desiredLocation: string) {
    try {
      const events = await this.eventsModel
        .find({ location: desiredLocation })
        .exec();
      return events;
    } catch (error) {
      console.error('Error fetching events by location:', error);
      throw error;
    }
  }
}
