import { Module } from '@nestjs/common';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './EventInterfaces/events.model';
import { PlaceSchema } from './EventInterfaces/place.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Events', schema: EventSchema },
      { name: 'Api_Places', schema: PlaceSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
