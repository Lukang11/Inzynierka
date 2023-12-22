import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import {
  GoogleApiQueryObject,
  GoogleApiQueryResponse,
} from './EventInterfaces/eventsInterfaces';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserEvents } from 'src/Auth/AuthInterfaces/users.model';

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
      relatedHobbies: string[];
    },
  ) {
    this.eventService.insertEvent(
      fullObject.name,
      fullObject.location,
      fullObject.relatedHobbies,
    );
  }
  @Post('/find-places-by-localization')
  findPlaceByLocalizationGoogleApi(
    @Body() queryObject: GoogleApiQueryObject,
  ): Promise<GoogleApiQueryResponse> {
    try {
      console.log(queryObject);
      const result =
        this.eventService.getEventsByLocationFromGoogleApi(queryObject);
      return result;
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
    console.log(user_events);
    return this.eventService.addUsersEvent(user_id, user_events);
  }
  @Get('/hobbies/:email')
  getUsersHobbies(@Param('email') email: string) {
    return this.eventService.getUsersHobbies(email);
  }
  @Post('/hobbies/add/:email')
  addUsersHobbies(@Param('email') email: string, @Body() object) {
    console.log(object.hobbies);
    return this.eventService.addUsersHobbies(email, object.hobbies);
  }
}
