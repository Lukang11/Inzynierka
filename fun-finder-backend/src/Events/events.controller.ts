import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

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
