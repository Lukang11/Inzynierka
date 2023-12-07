// events.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  GoogleApiPlacesResponse,
  GoogleApiQueryObject,
  GoogleApiQueryResponse,
} from './EventInterfaces/eventsInterfaces';
import axios from 'axios';
import { Place } from './EventInterfaces/place.model';
import { CreatePlaceDto } from './EventInterfaces/create-place.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Events') private readonly eventsModel: Model<Event>,
    @InjectModel('Api_Places') private readonly placeModel: Model<Place>,
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
  ///Prrzykładowy obiekt który przyjmmuje ta funkcja
  // {
  //   "includedTypes": ["restaurant"],
  //   "maxResultCount": 10,
  //   "locationRestriction": {
  //     "circle": {
  //       "center": {
  //         "latitude": 37.7937,
  //         "longitude": -122.3965},
  //       "radius": 500.0
  //     }
  //   }
  // }

  async createOfResourceInMongoDbOnlyIfDoesntExist(
    createPlaceDto: CreatePlaceDto,
  ): Promise<Place> {
    const { displayName, formattedAddress } = createPlaceDto;

    const doesPlaceAlreadyExist = await this.placeModel
      .findOne({
        'displayName.text': displayName.text,
        'displayName.languageCode': displayName.languageCode,
        formattedAddress: formattedAddress,
      })
      .exec();

    const createdPlace = new this.placeModel(createPlaceDto);
    return !!doesPlaceAlreadyExist ? null : createdPlace.save();
  }

  async getEventsByLocationFromGoogleApi(
    queryObject: GoogleApiQueryObject,
  ): Promise<GoogleApiQueryResponse> | null {
    const placesUrl = 'https://places.googleapis.com/v1/places:searchNearby';
    const headers = {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': `${process.env.API_KEY}`,
      'X-Goog-FieldMask':
        'places.displayName,places.formattedAddress,places.types,places.websiteUri,places.iconMaskBaseUri,places.rating',
    };
    let response: GoogleApiQueryResponse | null = null;
    await axios
      .post(placesUrl, queryObject, { headers })
      .then((res) => {
        response = res.data;
        console.log(response);
        response.places.map((value) => {
          this.createOfResourceInMongoDbOnlyIfDoesntExist(value);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return response;
  }
  async getAllPlaces() {
    return await this.placeModel.find().exec();
  }
}
