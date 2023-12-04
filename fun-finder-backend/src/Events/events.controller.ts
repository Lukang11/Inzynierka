import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import {
  GoogleApiQueryObject,
  GoogleApiQueryResponse,
} from './EventInterfaces/eventsInterfaces';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  getAllEvents(): any {
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
  ): any {
    //Bedzie typ ale nararzie nie dodaje
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
}
