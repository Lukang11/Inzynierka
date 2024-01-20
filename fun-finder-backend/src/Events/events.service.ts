// events.service.ts
import { Injectable, forwardRef, Inject } from '@nestjs/common';
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
import {
  User,
  UserEvents,
  UserHobbies,
} from 'src/Auth/AuthInterfaces/users.model';
import { Events } from './EventInterfaces/events.model';
import { PlacesTags } from './EventInterfaces/place_tags.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel('Events') private readonly eventsModel: Model<Events>,
    @InjectModel('Api_Places') private readonly placeModel: Model<Place>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('api_places_tags')
    private readonly apiPlacesTags: Model<PlacesTags>,
  ) {}

  async insertEvent(fullObject) {
    console.log(fullObject);
    const newEvent = new this.eventsModel({
      name: fullObject.name,
      location: fullObject.location,
      eventStart: fullObject.eventStart,
      eventEnd: fullObject.eventEnd,
      eventDescription: fullObject.eventDescription,
      eventParticipants: fullObject.eventParticipants,
      relatedHobbies: fullObject.relatedHobbies,
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
  async getUsersEvents(email: string) {
    const user = await this.userModel.findOne({ email: email });
    const events = user.events;
    console.log(user);
    return events;
  }
  async getUsersHobbies(email: string) {
    const user = await this.userModel.findOne({ email: email });

    const user_hobbies = user.hobbies;
    return user_hobbies;
  }
  async addUsersEvents(user_id: string, user_hobbies: UserHobbies) {
    const user = await this.userModel.findOne({ _id: user_id });

    const user_events = user.events;
    return user_events;
  }
  async addUsersHobbies(
    usr_email: string,
    user_hobbies: string[],
  ): Promise<any> {
    try {
      const user = await this.userModel.updateOne(
        { email: usr_email },
        { $push: { hobbies: user_hobbies } },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
  async addUsersEvent(user_id: string, user_event: UserEvents): Promise<any> {
    try {
      const user = await this.userModel.updateOne(
        { _id: user_id },
        { $push: { events: user_event } },
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
  async fetchTopRatingPlaces() {
    const rating_places = await this.placeModel
      .find({ rating: { $gt: 4.5, $lt: 5 } })
      .exec();
    return rating_places;
  }
  async getAllTypesForPlaces() {
    return await this.apiPlacesTags.find().exec();
  }
  async getEventById(event_id) {
    return await this.eventsModel.findById({ _id: event_id });
  }
  async addTypesForPlaces(placeTag: PlacesTags) {
    return await this.apiPlacesTags.create(placeTag);
  }
  async getTypeDataByName(tag_name: { name: string }) {
    try {
      console.log(tag_name.name);
      return await this.apiPlacesTags.findOne({ name: tag_name.name }).exec();
    } catch (error) {
      console.log(error);
    }
  }
  async addUserToEvent(eventId: string,email: string) {
    try {
      const event = await this.eventsModel.findById(eventId).exec();

      if(!event){
        throw new Error("could not find event")
      }
      const userExists = event.eventParticipants.some(participant => participant === email)
      if(userExists) {
        throw new Error("user arleady in event")
      }
      event.eventParticipants.push(email)
      console.log('dodaje uzytkownika')
      await event.save();
    }
    catch(error){
      console.log(error);
    }
  }
}
