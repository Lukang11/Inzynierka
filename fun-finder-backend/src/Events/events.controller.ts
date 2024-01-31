import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import {
  GoogleApiQueryObject,
  GoogleApiQueryResponse,
} from './EventInterfaces/eventsInterfaces';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEvents } from 'src/Auth/AuthInterfaces/users.model';
import { PlacesTags } from './EventInterfaces/place_tags.model';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @Get('/loc')
  getEventByLocationFromDataBase(@Body() object: { location: string }) {
    const location = object.location.toLowerCase();
    return this.eventService.getEventsByLocation(location);
  }

  @Post('/add')
  addEvents(
    @Body()
    fullObject: {
      name: string;
      location: string;
      geoLocation?: Geolocation;
      eventStart: Date;
      eventEnd: Date;
      eventDescription?: string;
      eventParticipants?: string[];
      relatedHobbies: string[];
    },
  ) {
    return this.eventService.insertEvent(fullObject);
    console.log(fullObject);
  }
  @Post('/find-places-by-localization')
  findPlaceByLocalizationGoogleApi(
    @Body() queryObject: GoogleApiQueryObject,
  ): any {
    try {
      console.log(
        'Wysłałem płatny request uwaga!!!!!!!!!!!!! trzeba odkomentować przed pokazywaniem events.controller.ts/ =>   findPlaceByLocalizationGoogleApi',
      );
     // const result =
      //this.eventService.getEventsByLocationFromGoogleApi(queryObject);
     // return result;
    } catch (error) {
      console.error('Error processing request:', error);
      throw new HttpException('Invalid data format', HttpStatus.BAD_REQUEST);
    }

  }

  @Post('/test')
  testFunction(@Body() object: any) {
    this.eventService.createOfResourceInMongoDbOnlyIfDoesntExist(object);
  }
  @Get('/all')
  getAllPlaces() {
    return this.eventService.getAllPlaces();
  }
  @Get('/event/:email')
  getUsersEvents(@Param('email') email: string) {
    return this.eventService.getUsersEvents(email);
  }
  @Get('/add-event/:id')
  addUsersEvents(
    @Param('id') user_id: string,
    @Body() user_events: UserEvents,
  ) {
    return this.eventService.addUsersEvent(user_id, user_events);
  }
  @Get('/hobbies/:email')
  getUsersHobbies(@Param('email') email: string) {
    return this.eventService.getUsersHobbies(email);
  }
  @Post('/hobbies/add/:email')
  addUsersHobbies(@Param('email') email: string, @Body() object) {
    return this.eventService.addUsersHobbies(email, object.hobbies);
  }
  @Get('/places/top-rating')
  getTopRatingPlaces() {
    return this.eventService.fetchTopRatingPlaces();
  }
  @Get('/by-id/:id')
  getEventById(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }
  @Get('/places_types')
  getAllTypesForPlaces() {
    return this.eventService.getAllTypesForPlaces();
  }
  @Post('/places_types_add')
  addTypesForPlaces(@Body() Body: PlacesTags) {
    return this.eventService.addTypesForPlaces(Body);
  }
  @Get('/places_types_tag')
  getPlacesTagByName(@Body() Body: { name: string }) {
    return this.eventService.getTypeDataByName(Body);
  }
  @Post('/add/user')
  addUsersToEvent(@Body() body: { eventId: string; userEmail: string }) {
    return this.eventService.addUserToEvent(body);
  }
}
