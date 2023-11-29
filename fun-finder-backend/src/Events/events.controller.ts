import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get()
  getAllEvents(): any {
    return this.eventService.getAllEvents();
  }

  @Get('/loc')
  getEventByLocation(@Body() object: { location: string }) {
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
}
